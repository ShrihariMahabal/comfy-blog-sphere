
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PenLine, BookMarked } from "lucide-react";

const Navbar = () => {
  return (
    <header className="border-b bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
        >
          <BookMarked size={24} className="text-primary group-hover:rotate-6 transition-all duration-300" />
          <span className="font-serif text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            BlogSphere
          </span>
        </Link>
        <Link to="/create">
          <Button 
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 flex items-center gap-1 group hover:scale-105 transition-all shadow-md"
          >
            <PenLine size={16} className="group-hover:rotate-6 transition-transform" />
            <span>New Post</span>
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
