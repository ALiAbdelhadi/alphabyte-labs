import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const SheetTopDemo = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          Open Notifications
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="h-64">
        <div className="max-w-md mx-auto">
          <SheetHeader>
            <SheetTitle>Notifications</SheetTitle>
            <SheetDescription>Your recent notifications</SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-2xl border border-border">
                <p className="text-sm font-medium">New message from Alice</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-border">
                <p className="text-sm font-medium">Order #1234 has shipped</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default SheetTopDemo
