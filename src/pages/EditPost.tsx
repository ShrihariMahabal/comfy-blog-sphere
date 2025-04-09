
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostById, updatePost } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { PenLine, Save, ArrowLeft } from "lucide-react";

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id!),
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load post. It may have been deleted or does not exist.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || "",
        content: post.content || "",
        author: post.author || "",
      });
    }
  }, [post]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;
    
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Validation Error",
        description: "Title and content are required",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      await updatePost(id, {
        ...formData,
        author: formData.author.trim() || "Anonymous",
      });
      
      toast({
        title: "Success",
        description: "Post has been updated",
      });
      
      navigate(`/posts/${id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post. Please try again later.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <Link to={`/posts/${id}`} className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft size={16} className="mr-1" />
        Back to post
      </Link>

      {/* Header with illustration */}
      <div className="mb-8 pb-8 border-b">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-1/3">
            <img 
              src="https://illustrations.popsy.co/amber/designer.svg" 
              alt="Edit Post" 
              className="w-40 h-auto mx-auto md:w-full"
            />
          </div>
          <div className="md:w-2/3 text-center md:text-left">
            <h1 className="font-serif text-4xl font-bold mb-3">Edit Post</h1>
            <p className="text-muted-foreground">
              Refine and improve your story. Make it shine!
            </p>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base flex items-center gap-2">
              <PenLine size={16} className="text-primary" />
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title"
              required
              className="text-lg border-primary/20 focus-visible:ring-primary/30"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="author" className="text-base">Author</Label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Anonymous"
              className="border-primary/20 focus-visible:ring-primary/30"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content" className="text-base">Content</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog post here..."
              required
              rows={12}
              className="min-h-[300px] border-primary/20 focus-visible:ring-primary/30"
            />
          </div>
          
          <div className="flex justify-end gap-4 pt-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate(`/posts/${id}`)}
              className="border-primary/20 hover:border-primary/40"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 gap-2"
            >
              {isSubmitting ? "Saving..." : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditPost;
