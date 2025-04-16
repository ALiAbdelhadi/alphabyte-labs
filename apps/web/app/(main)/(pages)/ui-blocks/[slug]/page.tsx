import Container from "@/components/Container"
import { getAllBlocks, getBlocksForSlug } from "@/lib/markdown"
import { notFound } from "next/navigation"

export default async function BlockPage(props: {
    params: Promise<{ slug?: string }>
}) {
    const params = await props.params

    const { slug } = params

    const slugRote = await slug
    if (!slugRote) {
        return notFound()
    }
    let block = await getBlocksForSlug(slugRote)

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
    return blocks.map((block) => ({ slug: block.slug }))
}