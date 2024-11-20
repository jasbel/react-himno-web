import { useContext } from "react";
import { AddContext } from "@/state/AddContext";

const ChoirList = () => {
  const { state, updateState } = useContext(AddContext);

  return (
    <div className="border p-2" style={{ minHeight: 200 }}>
      {state.chorus.map(c => {
        return (
          <div onClick={() => console.log(c.id)}>
            <p>{c.choir}</p>
          </div>
        )
      })}
    </div>
  );
};

export default ChoirList;
