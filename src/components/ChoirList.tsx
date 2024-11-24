import { ChangeEvent, useContext } from "react";
import { AddContext } from "@/state/AddContext";
import { uuid } from "@/res/helpers";
import { ID } from "@/types/types";

const ChoirList = () => {
  const { state, updateState } = useContext(AddContext);

  const changeChoir = (e: ChangeEvent<HTMLTextAreaElement>, id: ID) => {
    const choir = e.target.value;
    const chorus = state.chorus.map(c => {
      if (c.id === id) return ({...c, choir});
      return c;
    })
    updateState({chorus})
  }

  return (
    <div className="border p-2" style={{ minHeight: 200 }}>
      <div>
        <button className="btn btn-primary" onClick={() => updateState({...state, chorus: [...state.chorus, {choir: '', id: uuid()}]})}>Agregar</button>
      </div>
      {state.chorus.map(c => {
        return (
          <div key={c.id} onClick={() => console.log(c.id)}>
            <textarea className="border px-1" rows={4} onChange={e => changeChoir(e, c.id)} >{c.choir}</textarea>
          </div>
        )
      })}
    </div>
  );
};

export default ChoirList;
