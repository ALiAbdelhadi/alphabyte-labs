import Link from "next/link"
import { Heart, Menu, Settings, ShoppingCart, User } from "lucide-react"

import { Button } from "@/components/library/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/library/sheet"

const SheetLeftDemo = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Menu size={16} />
          Open Menu
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <nav className="py-6">
          <ul className="space-y-4">
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded"
              >
                <User size={18} />
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded"
              >
                <ShoppingCart size={18} />
                <span>Orders</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded"
              >
                <Heart size={18} />
                <span>Wishlist</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded"
              >
                <Settings size={18} />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default SheetLeftDemo
