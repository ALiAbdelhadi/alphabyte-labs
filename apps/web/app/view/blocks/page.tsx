import { Button } from "@/components/library/button";
import Container from "@/components/Container";
import Link from "next/link";

const BlockPage = () => {
  return (
    <div className="min-h-[86.5vh] py-8">
      <Container>
        <section className="my-14 md:my-16 space-y-3 flex items-center justify-center flex-col">
          <div className="space-y-6 text-center">
            <h1 className="text-3xl md:text-4xl font-bold">
              Build your Blocks library
            </h1>
            <p className="text-lg md:text-xl max-w-4xl text-foreground">
              A set of beautifully-designed, accessible, and customizable
              components to help you build your component library. Open Source.
            </p>
          </div>
          <div className="space-x-2">
            <Link href="/blocks/Navbar">
              <Button>Go to your first block</Button>
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default BlockPage;
