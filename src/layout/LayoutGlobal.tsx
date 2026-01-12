
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const LayoutGlobal = ({children}: Props) => {
  return (
    <div className="bg-neutral-50 px-4">
      <div className="">
        {children}
      </div>
    </div>
  )
}

export default LayoutGlobal