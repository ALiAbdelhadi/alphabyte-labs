import about_1_folder_tree from "./folder-tree-blocks/about-1-folder-tree.json"
import carousel_1_folder_tree from "./folder-tree-blocks/carousel-1-folder-tree.json"
import carousel_2_folder_tree from "./folder-tree-blocks/carousel-2-folder-tree.json"
import navbar_1_folder_tree from "./folder-tree-blocks/navbar-1-folder-tree.json"
import new_collection_1_code_tree from "./folder-tree-blocks/new-collection-1-folder-tree.json"
import timeline_1_folder_tree from "./folder-tree-blocks/timeline-1-folder-tree.json"

export const folderTreeMap = {
  "timeline-1-tree": timeline_1_folder_tree,
  "navbar-1-tree": navbar_1_folder_tree,
  "about-1-tree": about_1_folder_tree,
  "carousel-1-tree": carousel_1_folder_tree,
  "carousel-2-tree": carousel_2_folder_tree,
  "new-collection-1-tree": new_collection_1_code_tree,
}

export function getFolderTree(name: string) {
  return folderTreeMap[name as keyof typeof folderTreeMap] || null
}