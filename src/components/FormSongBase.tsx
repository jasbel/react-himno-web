import { useContext } from "react";
import CustomInput from "../elements/CustomInput";
import { AddContext } from "@/state/AddContext";
import { TNote } from "@/types/types";

const FormSongBase = () => {
  const { state, updateState } = useContext(AddContext);
  const onChange = (val: string, type: string) => {
    console.log({val})
    if(type === 'title') updateState({title: val})
    if(type === 'description') updateState({title: val})
    if(type === 'nro-song') updateState({code: val})
    if(type === 'note-musical') updateState({musicalNote: val as TNote})
  };

  return (
    <div className="p-2 border">
      <CustomInput id="title" label="Titulo" onInput={(val) => onChange(val, "title")} value={state.title} />
      <CustomInput id="note-musical" label="Nota Musical" onInput={(val) => onChange(val, "note-musical")} value={state.musicalNote} />
      <CustomInput id="nro-song" label="Numero de Albanza" onInput={(val) => onChange(val, "nro-song")} value={state.code}/>
    </div>
  );
};

export default FormSongBase;
