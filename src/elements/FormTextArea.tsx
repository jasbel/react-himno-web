import React, { ChangeEventHandler } from "react";
import Label from "./Label";
import ControlForm from "./ControlForm";

interface Props {
  label: string;
  handleChange: ChangeEventHandler<HTMLTextAreaElement>;
}

const FormTextArea = ({ label, handleChange }: Props) => {
  return (
    <ControlForm label={label}>
      <textarea
        style={{ padding: 3, paddingLeft: 8, border: "1px solid black", borderRadius: 8, width: "100%" }}
        title={label}
        aria-multiline={true}
        onChange={handleChange}
        rows={8}
      />
    </ControlForm>
  );
};

export default FormTextArea;
