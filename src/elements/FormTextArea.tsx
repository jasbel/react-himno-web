import React, { ChangeEventHandler } from "react";
import Label from "./Label";
import ControlForm from "./ControlForm";

interface Props {
  label: string;
  handleChange: ChangeEventHandler<HTMLTextAreaElement>;
}

const FormTextArea = ({ label, handleChange }: Props) => {
  const change = (e: any) => {
    console.log({e})
    handleChange(e)
  }
  return (
    <ControlForm label={label}>
      <textarea
        style={{ padding: 3, paddingLeft: 8, border: "1px solid black", borderRadius: 8, width: "100%" }}
        title={label}
        aria-multiline={true}
        onChange={change}
        onInput={change}
        rows={4}
      />
    </ControlForm>
  );
};

export default FormTextArea;
