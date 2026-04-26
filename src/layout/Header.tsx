import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ERoutes } from "@/utils/enum";

const Header = () => {
  return (
    <header className="hidden md:sticky md:top-0 md:z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link to={ERoutes.principal} className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl text-primary sm:text-2xl">
              Himnos IBB
            </span>
          </Link>
        </div>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link to={ERoutes.himnos}>
            <Button variant="ghost" size="sm" className="text-sm">
              Himnario
            </Button>
          </Link>
          <Link to={ERoutes.addHimno}>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-xs sm:text-sm">
              Nuevo Himno
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
