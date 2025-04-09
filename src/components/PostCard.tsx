
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Post } from "@/types";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  // Create a shortened preview of the content
  const contentPreview = post.content.length > 150 
    ? post.content.substring(0, 150) + "..." 
    : post.content;

  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <Link to={`/posts/${post._id}`} className="flex-grow">
        <CardHeader>
          <CardTitle className="font-serif line-clamp-2">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{contentPreview}</p>
        </CardContent>
      </Link>
      <CardFooter className="text-sm text-muted-foreground border-t pt-4">
        By {post.author || "Anonymous"}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
