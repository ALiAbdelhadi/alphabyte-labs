"use client"

import { Button } from "@/components/library/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/library/drawer"

export default function DrawerDemo() {
  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant={"outline"}>Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto rounded-2xl max-w-md">
            <DrawerHeader>
              <DrawerTitle>Edit Profile</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile here.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    placeholder="Enter your name"
                    className="w-full rounded-md border p-2"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-md border p-2"
                  />
                </div>
              </div>
            </div>
            <DrawerFooter className="flex-row justify-end space-x-2">
              <DrawerClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DrawerClose>
              <Button>Save Changes</Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
