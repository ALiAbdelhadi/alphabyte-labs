import { Button } from "@/components/library/button"
import { toast } from "sonner"

const SonnerSuccessDemo = () => {
    return (
        <Button
            variant="outline"
            onClick={() =>
                toast.success("Event has been created successfully")
            }
        >
            Show Toast
        </Button>
    )
}

export default SonnerSuccessDemo
