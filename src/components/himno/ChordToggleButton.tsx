import { FC } from "react";

interface Props {
  showChords: boolean;
  onToggle: () => void;
}

const ChordToggleButton: FC<Props> = ({ showChords, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="ml-2 px-3 py-1 bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 rounded-full transition-all text-gray-900 dark:text-gray-100 text-sm font-medium flex items-center gap-1"
      aria-label={showChords ? "Ocultar acordes" : "Mostrar acordes"}
      title={showChords ? "Ocultar acordes" : "Mostrar acordes"}
    >
      <span className="text-lg">🎸</span>
      <span>{showChords ? "Ocultar" : "Mostrar"}</span>
    </button>
  );
};

export default ChordToggleButton;
