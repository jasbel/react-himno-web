import { AddContext } from "@/state/AddContext";
import { useContext } from "react";
import WrapItemHimno from "./himno/WrapItemHimno";

const ViewSong = ({isSmall}: {isSmall?: boolean}) => {
  const { state, updateState } = useContext(AddContext);
  return (
    <div className="p-1 border" style={{ color: 'red' }}>
      <p style={{fontSize: 12}}>{state.title}</p>
      <p style={{fontSize: 12}}>Nota: {state.musicalNote}</p>
      <p style={{fontSize: 12}}>Nro: {state.code}</p>
      <WrapItemHimno
        chorus={state.chorus}
        paragraphs={state.paragraphs}
        isSmall={true}
      />
    </div>
  )
}

export default ViewSong