import { ReactNode } from "react"

const ContainerWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="lg:border-r lg:border-l border-border mr-auto ml-auto w-full max-w-[1400px] border-dashed h-full transition-all">
      {children}
    </div>
  )
}

export default ContainerWrapper
