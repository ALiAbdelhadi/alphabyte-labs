import Container from "@/components/Container";
import { getAllBlocks, getBlocksForSlug } from "@/lib/markdown";
import { notFound } from "next/navigation";

export default async function BlockPage({ params }: { params: { slug?: string } }) {
   if (!params?.slug) {
      return notFound();
   }
   const block = await getBlocksForSlug(params.slug);

   if (!block) {
      return notFound();
   }
   return (
      <div className="py-12 md:py-16 lg:py-20 xl:py-24">
         <Container>
            <div>
               <div>{block.content}</div>
            </div>
         </Container>
      </div>
   );
}
export async function generateStaticParams() {
   const blocks = await getAllBlocks();
   return blocks.map((block) => ({ slug: block.slug }))
}