
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";

const Navbar = () => {
  return (
    <header className="border-b bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="font-serif text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
        >
          BlogSphere
        </Link>
        <Link to="/create">
          <Button className="flex items-center gap-1 group hover:scale-105 transition-transform">
            <PenLine size={16} className="group-hover:rotate-6 transition-transform" />
            <span>New Post</span>
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
