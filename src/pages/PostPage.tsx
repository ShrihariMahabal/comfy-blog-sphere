
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
import { Edit, Trash2, ArrowLeft } from "lucide-react";

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id!),
  });

  // Move the error toast into useEffect to prevent render loop
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

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <Link to="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft size={16} className="mr-1" />
        Back to all posts
      </Link>

      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : post ? (
        <>
          <div className="mb-6 flex justify-between items-start">
            <div>
              <h1 className="font-serif text-4xl font-bold mb-2">{post.title}</h1>
              <p className="text-muted-foreground">By {post.author || "Anonymous"}</p>
            </div>
            
            <div className="flex gap-2">
              <Link to={`/edit/${post._id}`}>
                <Button variant="outline" size="icon">
                  <Edit size={18} />
                </Button>
              </Link>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="icon">
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
          
          <div className="prose prose-slate max-w-none">
            {post.content.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-2xl font-serif mb-2">Post not found</h3>
          <p className="text-muted-foreground mb-4">The post you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/">Go to Homepage</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostPage;
