import { LinkItems } from "@/types"

export const navItems: LinkItems[] = [
  { title: "Docs", href: "/docs/introduction" },
  { title: "Components", href: "/docs/components" },
  { title: "Blocks", href: "/ui-blocks" },
  { title: "Themes", href: "/themes" },
  { title: "Colors", href: "/colors" },
  { title: "Community", href: "/community" },
]
export const ContributorsComponents = [
  {
    id: "1",
    name: "Ali Abdelhadi",
    email: "ali.abdelhadi@example.com",
    href: "https://github.com/aliabdelhadi",
    role: "core" as const,
    imageUrl: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "2",
    name: "Nour El-Din Mahmoud",
    email: "nour.mahmoud@example.com",
    href: "https://github.com/nourmahmoud",
    role: "contributor" as const,
    imageUrl: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "3",
    name: "Salma Hassan",
    email: "salma.hassan@example.com",
    href: "https://github.com/salmahsn",
    role: "contributor" as const,
    imageUrl: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "4",
    name: "Mostafa El-Naggar",
    email: "mostafa.naggar@example.com",
    href: "https://github.com/mostafanaggar",
    role: "guest" as const,
    imageUrl: "/placeholder.svg?height=36&width=36",
  },
]
