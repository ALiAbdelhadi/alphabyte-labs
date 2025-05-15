import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const BreadcrumbResponsiveDemo = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="flex flex-wrap">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem className="hidden sm:flex">
          <BreadcrumbLink href="/category">Category</BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem className="hidden md:flex">
          <BreadcrumbLink href="/category/subcategory">
            Subcategory
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/category/subcategory/item">
            Item
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadcrumbResponsiveDemo
