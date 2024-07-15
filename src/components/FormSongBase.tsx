import CustomInput from "../elements/CustomInput";

const FormSongBase = () => {
  const onChange = (val: string, type: string) => {};

  return (
    <div className="bg-rose-100">
      <CustomInput id="title" label="Titulo" onInput={(val) => onChange(val, "title")} />
      <CustomInput id="description" label="Descripcion" onInput={(val) => onChange(val, "description")} />
      <CustomInput id="note-musical" label="Nota Musical" onInput={(val) => onChange(val, "note-musical")} />
      <CustomInput id="nro-song" label="Numero de Albanza" onInput={(val) => onChange(val, "nro-song")} />
    </div>
  );
};

export default FormSongBase;
