import { PropsWithChildren } from "react"
import { cn } from "@/lib/utils"

interface LayoutMainProps extends PropsWithChildren {
  className?: string
}

const LayoutMain = ({children, className}: LayoutMainProps) => {
  return (
    <div className={cn("rounded-sm overflow-hidden mb-3 bg-card shadow-sm", className)}>
      {children}
    </div>
  )
}

export default LayoutMain