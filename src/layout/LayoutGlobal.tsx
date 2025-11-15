
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const LayoutGlobal = ({children}: Props) => {
  return (
    <div className="AppGlobal">
      <div className="AppGlobalContent">
        {children}
      </div>
    </div>
  )
}

export default LayoutGlobal