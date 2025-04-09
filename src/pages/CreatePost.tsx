
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PenLine, Send, ArrowLeft } from "lucide-react";

const CreatePost = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      const newPost = await createPost({
        ...formData,
        author: formData.author.trim() || "Anonymous",
      });
      
      toast({
        title: "Success",
        description: "Post has been created",
      });
      
      navigate(`/posts/${newPost._id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again later.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Header with illustration */}
      <div className="mb-8 pb-8 border-b relative">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-0 left-0 flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back
        </button>
        
        <div className="pt-8 flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-1/3">
            <img 
              src="https://illustrations.popsy.co/amber/writing.svg" 
              alt="Create Post" 
              className="w-40 h-auto mx-auto md:w-full"
            />
          </div>
          <div className="md:w-2/3 text-center md:text-left">
            <h1 className="font-serif text-4xl font-bold mb-3">Create New Post</h1>
            <p className="text-muted-foreground">
              Share your thoughts, ideas, and stories with the world. 
              Be creative and inspiring!
            </p>
          </div>
        </div>
      </div>
      
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
            onClick={() => navigate("/")}
            className="border-primary/20 hover:border-primary/40"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 gap-2"
          >
            {isSubmitting ? "Creating..." : (
              <>
                <Send size={16} />
                Create Post
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
