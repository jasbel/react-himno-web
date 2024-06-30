import CustomInput from "../elements/CustomInput"

const FormSongBase = () => {
  return (
    <div className="bg-rose-100">
      <CustomInput id="title" label="Titulo" />
      <CustomInput id="description" label="Descripcion" />
      <CustomInput id="note-musical" label="Nota Musical" />
      <CustomInput id="nro-song" label="Numero de Albanza" />
    </div>
  )
}

export default FormSongBase