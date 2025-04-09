import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getPostById, deletePost } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2, ArrowLeft, Calendar, User, BookOpen } from "lucide-react";

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      setIsDeleting(true);
      await deletePost(id);
      toast({
        title: "Success",
        description: "Post has been deleted",
      });
      navigate("/");
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const blogImage = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop";

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Link to="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft size={16} className="mr-1" />
        Back to all posts
      </Link>

      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : post ? (
        <>
          <div className="mb-6 space-y-4">
            <div className="flex justify-between items-start gap-4">
              <h1 className="font-serif text-4xl font-bold">{post.title}</h1>
              
              <div className="flex gap-2 shrink-0">
                <Link to={`/edit/${post._id}`}>
                  <Button variant="outline" size="icon" className="border-primary/20 hover:border-primary/40">
                    <Edit size={18} />
                  </Button>
                </Link>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon" className="border-primary/20 hover:border-primary/40">
                      <Trash2 size={18} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the post.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleDelete} 
                        disabled={isDeleting}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground border-b pb-4">
              <div className="flex items-center gap-1">
                <User size={16} className="text-primary/70" />
                <span>{post.author || "Anonymous"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} className="text-primary/70" />
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden mb-8">
            <img 
              src={blogImage} 
              alt="Notebook with coffee" 
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>

          <div className="prose prose-slate max-w-none">
            {post.content.split('\n').map((paragraph, i) => (
              paragraph ? (
                <p key={i} className="mb-4">{paragraph}</p>
              ) : <br key={i} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-secondary/10 rounded-xl">
          <BookOpen size={48} className="mx-auto text-primary/50 mb-4" />
          <h3 className="text-2xl font-serif mb-2">Post not found</h3>
          <p className="text-muted-foreground mb-6">The post you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/">Go to Homepage</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostPage;
