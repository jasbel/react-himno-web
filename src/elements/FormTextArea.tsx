import React, { ChangeEventHandler } from "react";
import Label from "./Label";

interface Props {
  label: string;
  handleChange: ChangeEventHandler<HTMLTextAreaElement>;
}

const FormTextArea = ({ label, handleChange }: Props) => {
  return (
    <div style={{ padding: 5, marginBottom: 8, textAlign: "start" }}>
      <label style={{}}>
        <small>{label}</small>
      </label>

      <textarea
        style={{ padding: 3, paddingLeft: 8, border: "1px solid black", borderRadius: 8, width: "100%" }}
        title={label}
        aria-multiline={true}
        onChange={handleChange}
        rows={8}
      />
    </div>
  );
};

export default FormTextArea;
