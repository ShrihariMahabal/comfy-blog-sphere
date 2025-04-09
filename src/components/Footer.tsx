
import { Link } from "react-router-dom";
import { BookMarked, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-gradient-to-r from-primary/5 to-primary/10 py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <div className="text-center md:text-left">
          <Link 
            to="/" 
            className="flex items-center gap-2 justify-center md:justify-start group"
          >
            <BookMarked size={24} className="text-primary group-hover:rotate-6 transition-all duration-300" />
            <span className="font-serif text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              BlogSphere
            </span>
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
          <div className="flex items-center justify-center gap-4 mt-4 md:mt-0 md:ml-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Github size={18} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
