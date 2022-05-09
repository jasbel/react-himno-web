import React from 'react'

interface Props {
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button = ({title, onClick}: Props) => {
  return (
    <button className="rounded-full bg-blue-700 hover:bg-blue-900 text-rose-100 hover:text-white p-2 py-0" onClick={onClick}>
      {title}
    </button>
  )
}

export default Button