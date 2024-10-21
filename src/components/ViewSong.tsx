import { AddContext } from "@/screens/AddHimnoScreen";
import { useContext } from "react";

const ViewSong = () => {
  const { state, updateState } = useContext(AddContext);
  return (
    <div className="bg-cyan-100">
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  )
}

export default ViewSong