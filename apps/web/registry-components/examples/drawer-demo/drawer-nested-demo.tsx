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

const NestedDrawerDemo = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Nested Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="max-w-sm w-full mx-auto">
          <DrawerHeader>
            <DrawerTitle>First Level Drawer</DrawerTitle>
            <DrawerDescription>
              You can open another drawer from here.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex justify-center  p-4">
            <Drawer>
              <DrawerTrigger asChild>
                <Button>Open Second Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="max-w-sm w-full mx-auto">
                  <DrawerHeader>
                    <DrawerTitle>Second Level Drawer</DrawerTitle>
                    <DrawerDescription>
                      This is a nested drawer.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4">
                    <p>
                      You can have multiple levels of drawers for complex UIs.
                    </p>
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default NestedDrawerDemo
