import BlockPreview from "@/components/block-preview"
import BlockForGrid from "@/components/BlockForGrid"
import Container from "@/components/Container"
import { Button } from "@/components/library/button"
import Link from "next/link"

const UiBlocksPage = () => {
  return (
    <div className="py-8 bg-[#f8f8f9] dark:bg-[#111111]">
      <Container>
        <section className="my-14 md:my-16 space-y-3">
          <div className="space-y-2">
            <h1 className="text-2xl lg:text-4xl md:text-3xl font-bold">
              Building Blocks for the Web
            </h1>
            <p className="text-base md:text-lg lg:text-xl font-normal max-w-2xl text-foreground opacity-80">
              Clean, modern building blocks. Copy and paste into your apps.
              Works with all React frameworks. Open Source. Free forever.
            </p>
          </div>
          <div className="space-x-2">
            <Link href="/ui-blocks/carousel-1">
              <Button className="lg:h-10 lg:px-7 px-3 h-8">Get started</Button>
            </Link>
            <Link href="#browse-all-blocks">
              <Button variant={"ghost"} className="lg:h-10 lg:px-7 px-3 h-8">
                Browse All Blocks
              </Button>
            </Link>
          </div>
        </section>
      </Container>
      {/* Blocks */}
      {/* Block one */}
      <div className="py-10 md:py-12">
        <Container>
          <h2 className="text-muted-foreground mb-3">Latest Blocks</h2>
          <div className="space-y-8">
            <h3 className="text-3xl font-medium mb-4">Carousels</h3>
            <BlockPreview
              id="carousel-1"
              BlockId="carousel-1"
              BlockName="Carousel1"
              fileTree={"carousel-1-tree"}
            />
            {/* Block two */}
            <h3 className="text-3xl font-medium mb-4">Navbar</h3>
            <BlockPreview
              id="navbar-1"
              BlockName="Navbar"
              BlockId="navbar-1"
              fileTree={"navbar-1-tree"}
            />
            {/* Block Three */}
            <h3 className="text-3xl font-medium mb-4">New Collection</h3>
            <BlockPreview
              id="new-collection-1"
              BlockName="New Collection"
              BlockId="new-collection-1"
              fileTree="new-collection-1-tree"
            />
          </div>
          {/* Tons Of Blocks Ready to copy and past or even download it */}
          <div id="browse-all-blocks" className="py-10 md:py-14 lg:py-20">
            <div className="space-y-2">
              <h2 className="lg:text-3xl text-2xl font-semibold">Ui Blocks</h2>
              <p className="text-lg md:text-xl font-light text-foreground">
                Ready to copy&paste or even download it using your favorite npm
                package
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <BlockForGrid
                title="Carousel1"
                href="/ui-blocks/carousel-1"
                src={"/block-mokeup/carousel/carousel-1.png"}
              />
              <BlockForGrid
                title="Carousel2"
                href="/ui-blocks/carousel-2"
                src={"/block-mokeup/carousel/carousel-2.png"}
              />
              <BlockForGrid
                title="Timeline"
                href="/ui-blocks/timeline-1"
                src={"/block-mokeup/timeline/timeline-1.png"}
              />
              <BlockForGrid
                title="Navbar"
                href="/ui-blocks/navbar-1"
                src={"/block-mokeup/navbar/navbar-1.png"}
              />
              <BlockForGrid
                title="New Collection"
                href="/ui-blocks/new-collection-1"
                src={"/block-mokeup/new-collection/new-collection.png"}
              />
              <BlockForGrid
                title="About1"
                href="/ui-blocks/about-1"
                src={"/block-mokeup/about/about-1.png"}
              />
              <BlockForGrid
                title="Service1"
                href="/ui-blocks/service-1"
                src={"/block-mokeup/service/service-1.png"}
              />
              <BlockForGrid
                title="Service1"
                href="/ui-blocks/service-1"
                src={"/block-mokeup/product-overview/product-overview-1.png"}
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default UiBlocksPage
