import { AddContext } from "@/state/AddContext";
import { useContext } from "react";
import WrapItemHimno from "./himno/WrapItemHimno";

const ViewSong = () => {
  const { state, updateState } = useContext(AddContext);
  return (
    <div className="bg-cyan-100" style={{ color: 'red' }}>
      <WrapItemHimno
        chorus={state.chorus}
        paragraphs={state.paragraphs}
      />
      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
    </div>
  )
}

export default ViewSong