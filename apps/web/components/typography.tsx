import { PropsWithChildren } from "react"

export function Typography({ children }: PropsWithChildren) {
  return <div className="typography transition-all">{children}</div>
}
