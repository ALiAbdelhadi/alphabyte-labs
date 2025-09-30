<ComponentPreview name="folder-tree-demo" />

## حول المكون

هيكل المجلدات مبني باستخدام مكون <MdxBadge>Sidebar</MdxBadge> من [shadcn/ui](https://ui.shadcn.com/docs/components/sidebar)

## التثبيت

<div className="not-prose md:px-0 px-4">
  <Step>
    <StepItem title="تثبيت الحزم">
      أولاً، تحتاج إلى تثبيت الحزم التالية:

      <Pre className="language-bash">
        {`npm install clsx tailwind-merge`}
      </Pre>

      <Pre className="language-bash">
        {`npx shadcn@latest add sidebar`}
      </Pre>
    </StepItem>

    <StepItem title="إنشاء utils.ts">
      <ComponentUtilsText />

      <ComponentUtils />
    </StepItem>

    <StepItem title="إنشاء Hook">
      قم بإنشاء مجلد جديد باسم <MdxBadge>hooks</MdxBadge> داخل مشروعك، ثم أنشئ ملف باسم <MdxBadge>use-submenu-state.ts</MdxBadge> وأضف الكود التالي:

      <Pre className="language-typescript" folderPath="hooks/use-submenu-state.ts">
        {`import { useState, useCallback } from "react"

          export function useSubmenuState(initialState: Record<string, boolean> = {}) {
           const [openStates, setOpenStates] = useState(initialState)

           const toggleSubmenu = useCallback((id: string) => {
              setOpenStates((prev) => ({ ...prev, [id]: !prev[id] }))
           }, [])

           return { openStates, toggleSubmenu }
          }
          `}
      </Pre>
    </StepItem>

    <StepItem title="إنشاء مكون Folder-Tree">
      <ComponentSource name="folder-tree-demo" />
    </StepItem>

    <StepItem title="إنشاء قائمة المجلدات">
      أنشئ ملف جديد داخل مجلد <MdxBadge>components</MdxBadge> باسم <MdxBadge>FolderTreeMenu.tsx</MdxBadge> وأضف الكود التالي:

      <CodeBlockWrapper>
        <Pre className="language-typescript" folderPath="components/FolderTreeMenu.tsx">
          {`"use client"

            import { ChevronDown, ChevronRight } from "lucide-react"
            import { cn } from "@/lib/utils"
            import { useSubmenuState } from "@/hooks/use-submenu-state"
            import {
            Sidebar,
            SidebarContent,
            SidebarHeader,
            SidebarMenu,
            SidebarMenuButton,
            SidebarMenuItem,
            SidebarMenuSub,
            SidebarMenuSubButton,
            SidebarMenuSubItem,
            } from "@/components/ui/sidebar"

            interface MenuItem {
            id: string
            title: string
            items?: MenuItem[]
            }

            interface FolderTreeMenuProps {
            items: MenuItem[]
            }

            export function FolderTreeMenu({ items }: FolderTreeMenuProps) {
            const { openStates, toggleSubmenu } = useSubmenuState()

            const renderMenuItem = (item: MenuItem) => {
              const hasSubItems = item.items && item.items.length > 0
              const isOpen = openStates[item.id]

              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => hasSubItems && toggleSubmenu(item.id)}
                    className={cn("w-full justify-between", hasSubItems && "font-semibold")}
                  >
                    {item.title}
                    {hasSubItems && (
                      <span className="ml-auto">
                        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </span>
                    )}
                  </SidebarMenuButton>
                  {hasSubItems && (
                    <SidebarMenuSub>
                      {isOpen &&
                        item.items!.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.id}>
                            <SidebarMenuSubButton>{subItem.title}</SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              )
            }

            return (
              <Sidebar className="w-64 rounded-lg border bg-card text-card-foreground shadow-sm">
                <SidebarHeader className="px-4 py-2">
                  <h2 className="text-lg font-semibold">القائمة</h2>
                </SidebarHeader>
                <SidebarContent>
                  <SidebarMenu>{items.map(renderMenuItem)}</SidebarMenu>
                </SidebarContent>
              </Sidebar>
            )
            }`}
        </Pre>
      </CodeBlockWrapper>
    </StepItem>

    <StepItem title="إنشاء مثال">
      أنشئ ملف جديد باسم <MdxBadge>FolderExample.tsx</MdxBadge> داخل مجلد <MdxBadge>components</MdxBadge> وأضف الكود التالي:

      <CodeBlockWrapper>
        <Pre className="language-typescript" folderPath="components/FolderExample.tsx">
          {`"use client"

            import { FolderTree } from "./FolderTree"

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
                  ],
                },
              ],
            },
            ]

            export default function FolderTreeExample() {
            return (
              <div className="flex items-center justify-center">
                <FolderTree items={fileStructure} />
              </div>
            )
            }
            `}
        </Pre>
      </CodeBlockWrapper>
    </StepItem>

    <StepItem title="استخدمه وخصصه كما تشاء" />
  </Step>
</div>

## الاستخدام

<div className="not-prose space space-y-4">
  <p className="text-base">
    يمكنك البدء بإنشاء كائن يحتوي على الخصائص التالية:
  </p>

  <Pre className="language-typescript">
    {`type FileItem = {
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
              },
            ],
          },
        ],
      },
      ]
      `}
  </Pre>

  <p className="text-base">
    ثم قم بإنشاء وسم <MdxBadge>div</MdxBadge> واستورد الكائن فيه:
  </p>

  <Pre className="language-typescript" folderPath="components/FolderTreeExample.tsx">
    {`"use client"

      import { FolderTree } from "./FolderTree"

      export default function FolderTreeExample() {
      return (
        <div className="flex items-center justify-center">
          <FolderTree items={fileStructure} />
        </div>
      )
      }
      `}
  </Pre>
</div>
