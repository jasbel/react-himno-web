import React from "react";

interface Props {
  id: string;
  label: string;
}

const CustomInput = ({ id, label }: Props) => {
  return (
    <div style={{display: 'flex', gap: 4, marginBottom: 8, textAlign: 'start'}} id={id}>
      <label style={{paddingRight: 8, minWidth: 150}}>{label}</label>
      <input style={{border: '1px solid black', borderRadius: 8}} placeholder=" " />
    </div>
  );
};

export default CustomInput;
