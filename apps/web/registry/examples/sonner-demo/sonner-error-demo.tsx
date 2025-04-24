import { Button } from "@/components/library/button"
import { toast } from "sonner"

const SonnerErrorDemo = () => {
    return (
        <Button
            variant="outline"
            onClick={() =>
                toast.error("Unexpected error white creating event")
            }
        >
            Show Toast
        </Button>
    )
}

export default SonnerErrorDemo
