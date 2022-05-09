import React from 'react'

interface Props {
  value: string | number;
  ph?: string;
}

const Input = ({ph, value}: Props) => {
  return (
    <input placeholder={ph} value={value}/>
  )
}

export default Input