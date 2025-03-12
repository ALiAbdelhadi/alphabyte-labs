import { Fragment } from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function PageBreadcrumb({ paths }: { paths: string[] }) {
  return (
    <div className="mb-4 not-prose">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="font-normal ">Docs</BreadcrumbLink>
          </BreadcrumbItem>
          {paths.map((path, index) => {
            const href = `/docs/${paths.slice(0, index + 1).join("/")}`
            return (
              <Fragment key={path}>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="font-normal ">
                  {index < paths.length - 1 ? (
                    <BreadcrumbLink href={href}>
                      {toTitleCase(path)}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{toTitleCase(path)}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

function toTitleCase(input: string): string {
  const words = input.split("-")
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  )
  return capitalizedWords.join(" ")
}
