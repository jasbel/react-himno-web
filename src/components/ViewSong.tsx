import { AddContext } from "@src/screens/AddHimnoScreen";
import { useContext } from "react";

const ViewSong = () => {
  const { state, updateState } = useContext(AddContext);
  return (
    <div className="bg-cyan-100" style={{color: 'red'}}>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  )
}

export default ViewSong