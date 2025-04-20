import { Button } from "@/components/library/button"
import { toast } from "sonner"

const SonnerLoadingDemo = () => {
    return (
        <Button
            variant="outline"
            onClick={() =>
                toast.loading("Event is loading")
            }
        >
            Show Toast
        </Button>
    )
}

export default SonnerLoadingDemo
