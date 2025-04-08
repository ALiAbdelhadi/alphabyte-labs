import { BLOCKS_FILES } from "@/registry-blocks/registry-view.json"
import { folderTreeMap, getFolderTree } from "@/registry-blocks"

export type BlockFile = {
    path: string
}
export type BlockData = {
    name: string;
    files: BlockFile[]
}
export function getAllBlocksData(): BlockData[] {
    return BLOCKS_FILES
}
// Get a specific block by the name
export function getBlockData(blockName: string): BlockData | undefined {
    return BLOCKS_FILES.find((block) => block.name === blockName)
}


export { folderTreeMap, getFolderTree };