import { ChangeEventHandler, useState } from "react";
import FormTextArea from "../elements/FormTextArea";

interface Props {
  label: string;
  handleChange: (v: string) => void;
}

const FormParagraph = ({label, handleChange}: Props) => {
  const [p1, setP1] = useState("");

  const change: ChangeEventHandler<HTMLTextAreaElement> = (value) => {
    const currentValue = (value.target as HTMLTextAreaElement).value
    setP1(currentValue);
    handleChange(currentValue)
  };

  return (
    <div>
      <FormTextArea label={label} handleChange={change} />
      <pre>{JSON.stringify(p1, null, 2)}</pre>
    </div>
  );
};

export default FormParagraph;
