import { notFound } from "next/navigation"

import { getAllBlocks, getBlocksForSlug } from "@/lib/markdown"
import Container from "@/components/Container"

export default async function BlockPage(props: {
  params: Promise<{ slug?: string; locale: string }>
}) {
  const params = await props.params

  const { slug, locale } = params

  const slugRote = await slug
  if (!slugRote) {
    return notFound()
  }
  let block = await getBlocksForSlug(slugRote, locale)

  if (!block) {
    block = await getBlocksForSlug(slugRote)

    if (!block) {
      return notFound()
    }
  }

  return (
    <div className="py-12 md:py-16 lg:py-20 xl:py-24 bg-[#f8f8f9] dark:bg-[#111111]">
      <Container>
        <div>{block.content}</div>
      </Container>
    </div>
  )
}

export async function generateStaticParams() {
  const blocks = await getAllBlocks()
  const { routing } = await import("@/i18n/routing")
  return blocks.flatMap((block) =>
    routing.locales.map((locale) => ({ locale, slug: block.slug }))
  )
}
