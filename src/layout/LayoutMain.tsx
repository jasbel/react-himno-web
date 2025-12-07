import { PropsWithChildren } from "react"

const LayoutMain = ({children}: PropsWithChildren) => {
  return (
    <div className="rounded-sm overflow-hidden mb-3">
      {children}
    </div>
  )
}

export default LayoutMain