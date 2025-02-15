
type servicesLinksProps = {
   title: string;
   description: string;
   href: string
}

type LinkItems = {
   title: string;
   href: string
}

type CodeViewProps = {
   children?: React.ReactNode
   className?: string
   raw?: string
   language?: string
}


type ComponentPreviewProps = {
   children?: React.ReactNode
   code: string
   language?: string
   showPreview?: boolean
   className?: string
   id?: string
}

type search = {
   title: string
   href: string
   snippet?: string
   description?: string
   relevance?: number
}
type PathWithItems = {
   heading?: string
   title?: string
   href: string
   noLink?: boolean
   items?: Paths[]
}

type PathSpacer = {
   spacer: boolean
}

type TocProps = {
   tocs: { href: string; level: number; text: string }[]
}