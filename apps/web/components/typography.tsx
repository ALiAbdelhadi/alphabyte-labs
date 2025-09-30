import { PropsWithChildren } from "react"

export function Typography({ children }: PropsWithChildren) {
  return (
    <div className="typography transition-all w-full max-w-none min-h-[60vh] flex-grow">
      {children}
    </div>
  )
}