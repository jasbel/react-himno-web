import React from 'react'
import Label from './Label'

interface Props {
  label: string;
  text: string;
}

const FormTextArea = ({label, text}: Props) => {
  return (
    <div>
      <Label text={label} />
      <textarea title={label}>{text}</textarea>
    </div>
  )
}

export default FormTextArea