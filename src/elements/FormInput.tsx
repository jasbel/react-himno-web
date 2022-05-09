import React from 'react'
import Input from './Input'
import Label from './Label'

interface Props {
  label: string;
  value: string | number;
  placeholder?: string;
}

const FormInput = ({label, value, placeholder}: Props) => {
  return (
    <div>
      <Label text={label} />
      <Input value={value} ph={placeholder} />
    </div>
  )
}

export default FormInput