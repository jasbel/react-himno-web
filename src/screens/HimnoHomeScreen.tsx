import logo from "../assets/images/logoHome.png";
import imgChurch from "../assets/images/church.png";
import { Link } from "react-router-dom";
import { ERoutes } from "@/utils/enum";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SyncButton } from "@/components/SyncButton";
  
interface Props {
  admin: boolean
}

const HimnoHomeScreen = ({admin}: Props) => {
  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-180px)] md:min-h-[calc(100vh-140px)] py-4 sm:py-6 md:py-8 space-y-6 sm:space-y-8 md:space-y-12">
      {/* Brand Section */}
      <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 md:space-y-6 w-full max-w-2xl px-4">
        <img
          src={logo}
          alt="Himnos IBB Logo"
          className="w-24 sm:w-32 md:w-48 lg:w-64 h-auto drop-shadow-xl animate-in fade-in zoom-in duration-700"
        />
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-primary">
          Himnario Digital
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-md mx-auto px-4">
          Accede a todos los himnos y coros de nuestra iglesia en un solo lugar.
        </p>

        {/* Sync Button */}
        <div className="w-full max-w-xs px-2">
          <SyncButton />
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 w-full max-w-4xl px-4 sm:px-6">
        <Link to={ERoutes.himnos} className="group">
          <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 bg-card/50 backdrop-blur">
            <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center space-y-2 sm:space-y-3 md:space-y-4">
              <div className="text-primary text-2xl sm:text-3xl md:text-4xl">📖</div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-wider group-hover:text-primary transition-colors">Himnos</h3>
            </CardContent>
          </Card>
        </Link>

        <Link to={ERoutes.homeQuechua} className="group">
          <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-secondary/50 bg-card/50 backdrop-blur">
            <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center space-y-2 sm:space-y-3 md:space-y-4">
              <div className="text-secondary text-2xl sm:text-3xl md:text-4xl">🏔️</div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-wider group-hover:text-secondary transition-colors">Quechua</h3>
            </CardContent>
          </Card>
        </Link>

        {admin && (
          <Link to={ERoutes.homeList} className="group">
            <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary bg-card/50 backdrop-blur">
              <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center space-y-2 sm:space-y-3 md:space-y-4">
                <div className="text-primary text-2xl sm:text-3xl md:text-4xl">📋</div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-wider group-hover:text-primary transition-colors">Listado</h3>
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
            <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center space-y-2 sm:space-y-3 md:space-y-4 text-center">
              <div className="text-xl sm:text-2xl md:text-3xl">📱</div>
              <h3 className="text-xs sm:text-sm md:text-lg font-semibold uppercase tracking-tight opacity-80 group-hover:opacity-100 transition-opacity">Descargar APK</h3>
            </CardContent>
          </Card>
        </a>
      </div>

      {/* Decorative Section */}
      <div className="flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-8 w-full px-4">
        <img
          src={imgChurch}
          alt="Church Illustration"
          className="w-16 sm:w-20 md:w-24 lg:w-32 h-auto opacity-80"
        />

        <div className="text-center space-y-1 sm:space-y-2 pb-4 sm:pb-6 md:pb-8">
          <p className="font-bold text-base sm:text-lg md:text-xl text-primary/80">Version 1.2.0</p>
          <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground flex items-center justify-center gap-1 flex-wrap">
            Soporte: <a href="https://asbel.dev" className="text-primary hover:underline font-semibold">asbel.dev</a> | Kairos
          </p>
        </div>
      </div>
    </div>
  );
};

export default HimnoHomeScreen;
