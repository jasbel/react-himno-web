import { FC } from "react";

interface Props {
  onRefresh: () => void;
  loading: boolean;
}

const HimnoHeaderRefresh: FC<Props> = ({ onRefresh, loading }) => {
  return (
    <button
      onClick={onRefresh}
      disabled={loading}
      className="ml-2 px-3 py-1 bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 rounded-full transition-all text-gray-900 dark:text-gray-100 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
      aria-label="Recargar himno"
      title="Recargar desde archivo JSON"
    >
      {loading ? (
        <>
          <span className="animate-spin">⟳</span>
          <span>Cargando...</span>
        </>
      ) : (
        <>
          <span>↻</span>
          <span>Recargar</span>
        </>
      )}
    </button>
  );
};

export default HimnoHeaderRefresh;
