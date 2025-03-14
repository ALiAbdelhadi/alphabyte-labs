import Link from "next/link"

import Container from "@/components/Container"
import { Button } from "@/components/library/button"

const Home = () => {
  return (
    <div className="min-h-[86.5vh] py-10 md:py-16">
      <Container>
        <section className="my-10 md:my-12 space-y-6 md:space-y-8">
          <div className="space-y-4 md:space-y-5">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl">
              Build Beautifully. <br className="hidden md:block" />
              <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r w-fit from-[#0898f4] from-[0%] via-[#f34d7a] via-[70%] to-[#f95032]">
                Alphabyte Labs:{" "}
              </span>
              Your Open Source Component Library.
            </h1>
            <p className="text-lg md:text-xl font-normal max-w-2xl text-foreground opacity-80">
              Craft stunning user interfaces with our meticulously designed
              collection of accessible, and fully customizable components. Built
              by developers, for developers, and freely available to all.
            </p>
          </div>
          <div className="space-x-2 md:space-x-3">
            <Link href="/docs/introduction">
              <Button className="lg:h-11 lg:px-8">Get started</Button>
            </Link>
            <Link href={"/ui-blocks"}>
              <Button variant={"ghost"} className="lg:h-11 lg:px-8">
                Browse Blocks
              </Button>
            </Link>
          </div>
        </section>
      </Container>
    </div>
  )
}

export default Home
