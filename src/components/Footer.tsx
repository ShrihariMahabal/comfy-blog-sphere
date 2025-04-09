
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-secondary/10 py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <div className="text-center md:text-left">
          <Link 
            to="/" 
            className="font-serif text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
          >
            BlogSphere
          </Link>
          <p className="text-sm text-muted-foreground mt-2">
            Crafting stories, one post at a time
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <Link 
            to="/" 
            className="text-sm text-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/create" 
            className="text-sm text-foreground hover:text-primary transition-colors"
          >
            Create Post
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
