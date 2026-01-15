import logo from "../assets/images/logoHome.png";
import imgChurch from "../assets/images/church.png";
import { Link } from "react-router-dom";
import { ERoutes } from "@/utils/enum";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
  
interface Props {
  admin: boolean
}

const HimnoHomeScreen = ({admin}: Props) => {
  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-160px)] py-8 space-y-12">
      {/* Brand Section */}
      <div className="flex flex-col items-center text-center space-y-6 w-full max-w-2xl">
        <img 
          src={logo} 
          alt="Himnos IBB Logo" 
          className="w-48 sm:w-64 md:w-80 h-auto drop-shadow-xl animate-in fade-in zoom-in duration-700" 
        />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
          Himnario Digital
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl max-w-md mx-auto">
          Accede a todos los himnos y coros de nuestra iglesia en un solo lugar.
        </p>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl px-4">
        <Link to={ERoutes.himnos} className="group">
          <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 bg-card/50 backdrop-blur">
            <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
              <div className="text-primary text-4xl mb-2">📖</div>
              <h3 className="text-xl font-bold uppercase tracking-wider group-hover:text-primary transition-colors">Himnos</h3>
            </CardContent>
          </Card>
        </Link>

        <Link to={ERoutes.homeQuechua} className="group">
          <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-secondary/50 bg-card/50 backdrop-blur">
            <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
              <div className="text-secondary text-4xl mb-2">🏔️</div>
              <h3 className="text-xl font-bold uppercase tracking-wider group-hover:text-secondary transition-colors">Quechua</h3>
            </CardContent>
          </Card>
        </Link>

        {admin && (
          <Link to={ERoutes.homeList} className="group">
            <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary bg-card/50 backdrop-blur">
              <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
                <div className="text-primary text-4xl mb-2">📋</div>
                <h3 className="text-xl font-bold uppercase tracking-wider group-hover:text-primary transition-colors">Listado</h3>
              </CardContent>
            </Card>
          </Link>
        )}

        <a 
          href="https://6822c3930e3cddbf77471418--heroic-praline-747316.netlify.app/himno-ibb.apk" 
          download 
          className="group"
        >
          <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-muted-foreground/30 bg-muted/20 backdrop-blur">
            <CardContent className="p-6 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="text-3xl mb-1">📱</div>
              <h3 className="text-lg font-semibold uppercase tracking-tight opacity-80 group-hover:opacity-100 transition-opacity">Descargar APK</h3>
            </CardContent>
          </Card>
        </a>
      </div>

      {/* Decorative Section */}
      <div className="flex flex-col items-center space-y-8 w-full">
        <img 
          src={imgChurch} 
          alt="Church Illustration" 
          className="w-24 sm:w-32 md:w-40 h-auto opacity-80" 
        />
        
        <div className="text-center space-y-2 pb-8">
          <p className="font-bold text-xl text-primary/80">Version 1.2.0</p>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            Soporte: <a href="https://asbel.dev" className="text-primary hover:underline font-semibold">asbel.dev</a> | Kairos
          </p>
        </div>
      </div>
    </div>
  );
};

export default HimnoHomeScreen;
