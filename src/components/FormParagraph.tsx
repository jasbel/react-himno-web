import { ChangeEvent, ChangeEventHandler, SetStateAction, useState } from "react";
import Button from "../elements/Button";
import FormTextArea from "../elements/FormTextArea";

const FormParagraph = ({label, handleChange}) => {
  const [p1, setP1] = useState("");

  const change: ChangeEventHandler<HTMLTextAreaElement> = (value) => {
    const currentValue = (value.target as HTMLTextAreaElement).value
    setP1(currentValue);
    handleChange(currentValue)
  };

  return (
    <div className="bg-cyan-100">
      <FormTextArea label={label} handleChange={change} />
      <pre>{JSON.stringify(p1, null, 2)}</pre>
    </div>
  );
};

export default FormParagraph;
