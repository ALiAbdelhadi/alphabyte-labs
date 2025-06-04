"use client"

import { FolderTreeComponent } from "./FolderTreeComponent"

type FileItem = {
  id: string
  name: string
  type: "file" | "folder"
  path?: string
  items?: FileItem[]
}

const fileStructure: FileItem[] = [
  {
    id: "app",
    name: "app",
    type: "folder",
    items: [
      {
        id: "layout",
        name: "layout.js",
        type: "file",
      },
      {
        id: "marketing",
        name: "(marketing)",
        type: "folder",
        items: [
          {
            id: "about",
            name: "about",
            type: "folder",
            path: "/about",
            items: [
              {
                id: "about-page",
                name: "page.js",
                type: "file",
              },
            ],
          },
          {
            id: "blog",
            name: "blog",
            type: "folder",
            path: "/blog",
            items: [
              {
                id: "blog-page",
                name: "page.js",
                type: "file",
              },
            ],
          },
        ],
      },
      {
        id: "shop",
        name: "(shop)",
        type: "folder",
        items: [
          {
            id: "account",
            name: "account",
            type: "folder",
            path: "/account",
            items: [
              {
                id: "account-page",
                name: "page.js",
                type: "file",
              },
            ],
          },
        ],
      },
    ],
  },
]

export default function FolderTreeTest() {
  return (
    <div className="flex items-center justify-center ">
      <FolderTreeComponent items={fileStructure} />
    </div>
  )
}
