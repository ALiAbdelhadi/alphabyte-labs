"use client"

import BlockPreview from "@/components/block-preview"
import BlockForGrid from "@/components/BlockForGrid"
import Container from "@/components/Container"
import { Button } from "@/components/ui/button"
import { blockExamples } from "@/registry/blocks-examples"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useDeferredValue, useEffect, useState } from "react"


const blockExample = [
  {
    id: "carousel-1",
    name: "carousel-1",
    title: "Carousel",
  },
  {
    id: "navbar-1",
    name: "navbar-1",
    title: "Navbar",
  },
  {
    id: "new-collection-1",
    name: "new-collection-1",
    title: "New Collection",
  },
]



const UiBlocksPage = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const registryBlocks = blockExamples.items
  const DeferredItems = useDeferredValue(registryBlocks)
  return (
    <div className="py-8 bg-[#f8f8f9] dark:bg-[#111111]">
      <Container>
        <section className="my-14 md:my-16 space-y-3">
          <div className="space-y-2">
            <h1 className="text-2xl lg:text-4xl md:text-3xl font-bold">
              Building Blocks for the Web
            </h1>
            <p className="text-base md:text-lg lg:text-xl font-normal max-w-2xl text-foreground opacity-80">
              Clean, modern blocks. Copy and paste into your apps. Works with
              all React frameworks. Get your block exactly like your tech stack
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
      <div className="py-10 md:py-12">
        <Container>
          <h2 className="text-muted-foreground mb-3">Latest Blocks</h2>
          <div className="space-y-8">
            {
              blockExample.map((block) => (
                <div key={block.id}>
                  <h3 className="text-3xl font-medium mb-4">{block.title}</h3>
                  <BlockPreview
                    id={block.id}
                    BlockId={block.id}
                    BlockName={block.name}
                  />
                </div>
              ))
            }
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
              {mounted &&
                DeferredItems.map(({ name }) => {
                  return (
                    <BlockForGrid
                      key={name}
                      title={name.charAt(0).toUpperCase() + name.slice(1)}
                      href={`/ui-blocks/${name}`}
                      src={
                        theme === "light"
                          ? `/block-mokeup/${name}-light.png`
                          : `/block-mokeup/${name}-dark.png`
                      }
                    />
                  )
                })}
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default UiBlocksPage
