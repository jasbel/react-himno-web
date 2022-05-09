import CustomInput from "../elements/CustomInput"
import FormInput from "../elements/FormInput"
import GroupButtons from "./GroupButtons"

const FormMain = () => {
  return (
    <div className="bg-rose-100">
      {/* <FormInput label="Titulo" value={''} /> */}
      <CustomInput id="title" label="Titulo" />
      <CustomInput id="description" label="Descripcion" />
      <CustomInput id="note-musical" label="Nota Musical" />
      <CustomInput id="nro-song" label="Numero de Albanza" />
    </div>
  )
}

export default FormMain