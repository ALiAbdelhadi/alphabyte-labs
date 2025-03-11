import { Button } from "@/components/library/button";
import { Input } from "@/components/library/input";
import { Label } from "@/components/library/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const DialogDemo = () => {
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button variant="outline">Edit Profile</Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Edit profile</DialogTitle>
               <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
               </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name">
                     Name
                  </Label>
                  <Input
                     id="name"
                     defaultValue="Pedro Duarte"
                     className="col-span-3"
                  />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username">
                     Username
                  </Label>
                  <Input
                     id="username"
                     defaultValue="@peduarte"
                     className="col-span-3"
                  />
               </div>
            </div>
            <DialogFooter>
               <Button type="submit">Save changes</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
export default DialogDemo;