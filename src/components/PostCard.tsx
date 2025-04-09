
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Post } from "@/types";
import { Calendar, User } from "lucide-react";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  // Create a shortened preview of the content
  const contentPreview = post.content.length > 150 
    ? post.content.substring(0, 150) + "..." 
    : post.content;

  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-lg hover:scale-[1.02] group">
      <Link to={`/posts/${post._id}`} className="flex-grow">
        <CardHeader>
          <CardTitle className="font-serif line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3">{contentPreview}</p>
        </CardContent>
      </Link>
      <CardFooter className="text-sm text-muted-foreground border-t pt-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <User size={16} className="text-primary/70" />
          {post.author || "Anonymous"}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground/70">
          <Calendar size={16} />
          {new Date().toLocaleDateString()}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
