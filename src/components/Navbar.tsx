
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";

const Navbar = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="font-serif text-2xl font-bold">
          BlogSphere
        </Link>
        <Link to="/create">
          <Button className="flex items-center gap-1">
            <PenLine size={16} />
            <span>New Post</span>
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
