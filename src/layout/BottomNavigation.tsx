import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ERoutes } from "@/utils/enum";
import { SettingContext } from "@/state/SettingContext";
import { SongNewContext } from "@/state/SongNewContext";
import { findFav } from "@/lib/storage";
import { useAuth } from "@/state/AuthContext";
import { TypeStar } from "@/components/ButtonStar";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { decrementFontSize, incrementFontSize } = useContext(SettingContext);
  const { addToFav, rmToFav } = useContext(SongNewContext);
  const { user } = useAuth();

  // Detectamos si estamos en una vista de canción de manera más robusta
  const isSongView = location.pathname.includes(`/${ERoutes.item}`) ||
                       location.pathname.includes(`/${ERoutes.itemQuechua}`) ||
                       location.pathname.includes("/edit-himno");

  const toggleFavorite = (star: TypeStar) => {
    const songId = location.state?.himno?.id;
    if (!songId) return;

    if (star === "star") {
      addToFav(songId);
    } else {
      if (window.confirm("¿Está de acuerdo en borrar...?")) {
        rmToFav(songId);
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate(ERoutes.principal);
  };

  const songId = location.state?.himno?.id;
  const isFavorite = songId ? !!findFav(songId) : false;

  if (!isSongView) {
    return (
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-border/50 z-[100] safe-area-inset-bottom shadow-xl">
        <div className="flex items-center justify-around h-16">
          <button
            onClick={() => navigate(ERoutes.principal)}
            className="flex flex-col items-center justify-center w-full h-full text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-primary hover:bg-accent/50 dark:hover:bg-accent/50 transition-all p-2 rounded-lg"
          >
            <span className="text-2xl mb-1">🏠</span>
            <span className="text-xs font-medium">Inicio</span>
          </button>

          <button
            onClick={() => navigate(ERoutes.himnos)}
            className="flex flex-col items-center justify-center w-full h-full text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-primary hover:bg-accent/50 dark:hover:bg-accent/50 transition-all p-2 rounded-lg"
          >
            <span className="text-2xl mb-1">📖</span>
            <span className="text-xs font-medium">Himnario</span>
          </button>

          <button
            onClick={() => navigate(ERoutes.homeQuechua)}
            className="flex flex-col items-center justify-center w-full h-full text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-primary hover:bg-accent/50 dark:hover:bg-accent/50 transition-all p-2 rounded-lg"
          >
            <span className="text-2xl mb-1">🏔️</span>
            <span className="text-xs font-medium">Quechua</span>
          </button>

          {user && (
            <button
              onClick={() => navigate(ERoutes.addHimno)}
              className="flex flex-col items-center justify-center w-full h-full text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-primary hover:bg-accent/50 dark:hover:bg-accent/50 transition-all p-2 rounded-lg"
            >
              <span className="text-2xl mb-1">➕</span>
              <span className="text-xs font-medium">Nuevo</span>
            </button>
          )}
        </div>
      </nav>
    );
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-border/50 z-[100] safe-area-inset-bottom shadow-xl">
      <div className="flex items-center justify-around h-16 px-2">
        <button
          onClick={handleGoBack}
          className="flex flex-col items-center justify-center w-full h-full text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-primary hover:bg-accent/50 dark:hover:bg-accent/50 transition-all p-2 rounded-lg"
          aria-label="Volver atrás"
        >
          <span className="text-2xl mb-1">←</span>
          <span className="text-xs font-medium">Atrás</span>
        </button>

        <button
          onClick={handleGoHome}
          className="flex flex-col items-center justify-center w-full h-full text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-primary hover:bg-accent/50 dark:hover:bg-accent/50 transition-all p-2 rounded-lg"
          aria-label="Ir al inicio"
        >
          <span className="text-2xl mb-1">🏠</span>
          <span className="text-xs font-medium">Inicio</span>
        </button>

        <div className="flex items-center gap-1 px-2">
          <button
            onClick={decrementFontSize}
            className="flex items-center justify-center w-12 h-12 bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 rounded-full transition-all text-gray-900 dark:text-gray-100 font-bold text-lg active:scale-95"
            aria-label="Reducir tamaño de fuente"
            data-testid="btn-decrement"
          >
            -T
          </button>
          <button
            onClick={incrementFontSize}
            className="flex items-center justify-center w-12 h-12 bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 rounded-full transition-all text-gray-900 dark:text-gray-100 font-bold text-lg active:scale-95"
            aria-label="Aumentar tamaño de fuente"
            data-testid="btn-increment"
          >
            +T
          </button>
        </div>

        <button
          onClick={() => toggleFavorite(isFavorite ? "unstar" : "star")}
          className={`flex flex-col items-center justify-center w-full h-full hover:bg-accent/50 dark:hover:bg-accent/50 transition-all p-2 rounded-lg ${isFavorite ? 'text-yellow-500 dark:text-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-500' : 'text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-primary'}`}
          aria-label="Favorito"
        >
          <span className="text-2xl mb-1">{isFavorite ? "⭐" : "☆"}</span>
          <span className="text-xs font-medium">{isFavorite ? "Favorito" : "Agregar"}</span>
        </button>

        {user && (
          <button
            onClick={() => {
              const songId = location.state?.himno?.id;
              if (songId) {
                navigate(`/edit-himno/${songId}`);
              }
            }}
            className="flex flex-col items-center justify-center w-full h-full text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-primary hover:bg-accent/50 dark:hover:bg-accent/50 transition-all p-2 rounded-lg"
            aria-label="Editar himno"
          >
            <span className="text-2xl mb-1">✏️</span>
            <span className="text-xs font-medium">Editar</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default BottomNavigation;
