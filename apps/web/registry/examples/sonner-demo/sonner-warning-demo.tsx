import { Button } from "@/components/library/button"
import { toast } from "sonner"

const SonnerWarningDemo = () => {
    return (
        <Button
            variant="outline"
            onClick={() =>
                toast.warning("You can't undo this action")
            }
        >
            Show Toast
        </Button>
    )
}

export default SonnerWarningDemo
