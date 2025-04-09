
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Link to="/" className="font-serif text-xl font-bold">
            BlogSphere
          </Link>
          <p className="text-sm text-muted-foreground mt-1">
            A modern blogging platform
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <Link to="/" className="text-sm hover:text-primary">
            Home
          </Link>
          <Link to="/create" className="text-sm hover:text-primary">
            Create Post
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
