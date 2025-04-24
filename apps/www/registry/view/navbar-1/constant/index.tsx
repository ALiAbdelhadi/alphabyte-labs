import { Book, Sunset, Trees, Zap } from "lucide-react"

export interface MenuItem {
  title: string
  url: string
  description?: string
  icon?: React.ReactNode
  items?: MenuItem[]
}

export const defaultLogo = {
  url: "https://uniquebrand.com",
  alt: "UniqueBrand Logo",
  title: "UniqueBrand",
}

export const defaultMenu: MenuItem[] = [
  { title: "Dashboard", url: "/" },
  {
    title: "Services",
    url: "#",
    items: [
      {
        title: "Web Development",
        description: "Responsive and modern websites",
        icon: <Zap className="h-5 w-5 shrink-0" />,
        url: "/services/web-development",
      },
      {
        title: "Mobile Apps",
        description: "Innovative mobile solutions",
        icon: <Sunset className="h-5 w-5 shrink-0" />,
        url: "/services/mobile-apps",
      },
      {
        title: "UI/UX Design",
        description: "User-centered design experiences",
        icon: <Book className="h-5 w-5 shrink-0" />,
        url: "/services/library-ux-design",
      },
      {
        title: "Consulting",
        description: "Expert advice to grow your business",
        icon: <Trees className="h-5 w-5 shrink-0" />,
        url: "/services/consulting",
      },
    ],
  },
  {
    title: "About Us",
    url: "/about",
  },
  {
    title: "Contact",
    url: "/contact",
  },
  {
    title: "Blog",
    url: "/blog",
  },
]

export const defaultMobileExtraLinks = [
  { name: "Privacy Policy", url: "/privacy" },
  { name: "Terms of Use", url: "/terms" },
  { name: "Support", url: "/support" },
  { name: "Careers", url: "/careers" },
]

export const defaultAuth = {
  login: { text: "Sign In", url: "/login" },
  signup: { text: "Register", url: "/register" },
}
