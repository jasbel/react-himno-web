import { ChangeEventHandler, useState } from "react";
import FormTextArea from "../elements/FormTextArea";

interface Props {
  value: string;
  label: string;
  handleChange: (v: string) => void;
}

const FormParagraph = ({label, handleChange, value}: Props) => {
  const [p1, setP1] = useState("");

  const change: ChangeEventHandler<HTMLTextAreaElement> = (value) => {
    const currentValue = (value.target as HTMLTextAreaElement).value
    setP1(currentValue);
    handleChange(currentValue);
  };

  return (
    <div>
      <FormTextArea label={label} handleChange={change} value={value} />
    </div>
  );
};

export default FormParagraph;
