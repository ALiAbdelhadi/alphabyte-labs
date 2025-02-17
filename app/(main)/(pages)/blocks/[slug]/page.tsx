import Container from "@/components/Container";
import { getBlocksForSlug } from "@/lib/markdown";
import { notFound } from "next/navigation";

export default async function BlockPage({ params }: { params: { slug: string } }) {
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
