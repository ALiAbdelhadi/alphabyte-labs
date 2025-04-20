import { Button } from "@/components/library/button"
import { toast } from "sonner"

const SonnerInfoDemo = () => {
    return (
        <Button
            variant="outline"
            onClick={() =>
                toast.info("Event has been created", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                })
            }
        >
            Show Toast
        </Button>
    )
}

export default SonnerInfoDemo
