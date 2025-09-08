import { Link } from "@/i18n/navigation"
import { getDocsRouting } from "@/settings/docs-routing"

// Server Component
export async function ComponentsList() {
  const docsConfig = await getDocsRouting()
  const componentsSection = docsConfig.sidebarItems.find(
    (item) => item.id === "components"
  )

  if (!componentsSection || !componentsSection.items) {
    return <p>No components found.</p>
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20 pt-8">
      {componentsSection.items.map((component) => (
        <Link
          key={component.href}
          href={`/docs/components${component.href}`}
          className="text-lg font-medium no-underline underline-offset-4 hover:underline md:text-base transition-all"
        >
          {component.title}
        </Link>
      ))}
    </div>
  )
}