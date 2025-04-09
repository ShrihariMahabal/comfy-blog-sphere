
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "@/lib/api";
import { Post } from "@/types";
import PostCard from "@/components/PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { Notebook, BookOpen } from "lucide-react";

const HomePage = () => {
  const { toast } = useToast();
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });

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
    <div className="animate-fade-in space-y-12">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&h=400&q=80" 
          alt="Blog Hero" 
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-6">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-center drop-shadow-md">
            BlogSphere
          </h1>
          <p className="text-lg md:text-xl max-w-md text-center drop-shadow-md">
            Discover stories, ideas, and inspiration from around the world
          </p>
        </div>
      </div>
      
      {/* Recent Posts Section */}
      <div>
        <div className="flex items-center justify-center gap-3 mb-8">
          <BookOpen size={24} className="text-primary" />
          <h2 className="font-serif text-3xl font-bold text-center">
            Recent Posts
          </h2>
        </div>
        
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
          <div className="text-center py-12 bg-gradient-to-r from-secondary/30 to-secondary/10 rounded-xl">
            <h3 className="text-2xl font-serif mb-2 text-primary">No posts found</h3>
            <p className="text-muted-foreground">Be the first to create a post!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
