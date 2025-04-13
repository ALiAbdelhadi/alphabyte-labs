import about_1_code_files from "./about-1-code-files.json"
import carousel_1_code_files from "./carousel-1-code-files.json"
import carousel_2_code_files from "./carousel-2-code-files.json"
import navbar_1_code_files from "./navbar-1-code-files.json"
import new_collection_1_code_files from "./new-collection-1-code-files.json"
import timeline_1_code_files from "./timeline-1-code-files.json"

export const codeFilesMap = {
  "timeline-1-tree": timeline_1_code_files,
  "navbar-1-tree": navbar_1_code_files,
  "about-1-tree": about_1_code_files,
  "carousel-1-tree": carousel_1_code_files,
  "carousel-2-tree": carousel_2_code_files,
  "new-collection-1-tree": new_collection_1_code_files,
}

export function getCodeFiles(name: string) {
  return codeFilesMap[name as keyof typeof codeFilesMap] || []
}
