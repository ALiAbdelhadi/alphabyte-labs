import LoadingIcon from "@/components/icons/loading-icon";
import { REGISTRY_BLOCKS } from "@/registry-blocks";
import { BLOCKS_FILES } from "@/registry-blocks/blocks-view.json";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const getBlockData = (blockId: string) => {
    return BLOCKS_FILES.find((block) => block.name === blockId);
};

const BlockViewPage = async ({ params }: { params: { block: string } }) => {
    const { block: blockId } = await params;
    // Get block data first
    const blockData = getBlockData(blockId);
    if (!blockData) {
        return notFound();
    }

    // Find the registry block
    const registryBlock = REGISTRY_BLOCKS.items.find(
        (item) => item.name === blockId
    );

    // Create dynamic component
    const DynamicBlock = registryBlock?.name
        ? dynamic(
            async () => {
                try {
                    return await import(`@/registry-blocks/view/blocks/${blockId}/${blockId}.tsx`)
                } catch (error) {
                    console.error("Failed to load block:", error);
                    return () => <div>Block not found</div>;
                }
            },
            {
                loading: () => (
                    <div className="flex w-full items-center justify-center text-sm text-muted-foreground gap-2">
                        <LoadingIcon size={16} />
                        Loading...
                    </div>
                ),
            }
        )
        : () => <div>Block configuration not found</div>;
    return (
        <DynamicBlock />
    );
};

export function getAllBlocksPaths() {
    return BLOCKS_FILES.map((block) => ({
        block: block.name
    }));
}

export default BlockViewPage;