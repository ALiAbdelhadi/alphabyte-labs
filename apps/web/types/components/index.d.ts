import { ReactNode } from "react"

// Timeline props component
type TimeLineProps = {
  title: string
  content: ReactNode
}
// Link props component
type LinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & {
  href: string
  children?: ReactNode
  className?: string
  target?: string
  isExternal?: boolean
}
// Note Props Component
type NoteProps = PropsWithChildren & {
  title?: string
  type?: "note" | "danger" | "warning" | "success"
}
// code block wrapper props
type CodeBlockWrapperProps = {
  expandButtonTitle?
  className?: string
  children: ReactNode
}
// steps component props
type StepItemProps = {
  title?: string
  children?: ReactNode
  className?: string
}
// steps component props
type StepProps = {
  children: ReactNode
  className?: string
}
