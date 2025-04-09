
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "@/lib/api";
import { Post } from "@/types";
import PostCard from "@/components/PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

const HomePage = () => {
  const { toast } = useToast();
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });

  // Move the error toast into useEffect to prevent render loop
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load posts. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <div className="animate-fade-in">
      <h1 className="font-serif text-4xl font-bold mb-8">Recent Posts</h1>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ))}
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: Post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-2xl font-serif mb-2">No posts found</h3>
          <p className="text-muted-foreground">Be the first to create a post!</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
