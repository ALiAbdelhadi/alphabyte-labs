import Container from "@/components/Container"
import { Button } from "@/components/library/button"
import Link from "next/link"

const CommunityPage = () => {
  return (
    <div>
      <Container>
        <section className="my-14 md:my-16 space-y-3">
          <div className="space-y-2">
            <h1 className="text-2xl lg:text-4xl md:text-3xl font-bold">
              Be a part of the family
            </h1>
            <p className="text-base md:text-lg lg:text-xl font-normal max-w-2xl text-foreground opacity-80">
              Join our community of developers and designers who are passionate about build premium things and create something truly special. Share your ideas, collaborate on projects, and learn from each other.
            </p>
          </div>
          <div className="space-x-2">
            <Link href="/discord">
              <Button className="lg:h-10 lg:px-7 px-3 h-8">
                Join our community
              </Button>
            </Link>
          </div>
        </section>
      </Container>
    </div>
  )
}

export default CommunityPage
