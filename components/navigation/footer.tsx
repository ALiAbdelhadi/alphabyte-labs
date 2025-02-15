import Link from "next/link"
import { Company } from "@/lib/meta"

export function Footer() {
  return (
    <footer className="w-full h-16 border-t">
      <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 sm:gap-0 w-full h-full px-2 sm:py-0 py-3 sm:px-4 lg:px-8 text-sm text-muted-foreground">
        <p className="text-center text-muted-foreground">
          &copy; {new Date().getFullYear()}{" "}
          <Link className="font-semibold underline " href={Company.link}>
            {Company.name}{" "}
          </Link>
          The source code is available on{" "}
          <Link href={"https://github.com/ALiAbdelhadi/alphabyte-labs"} className="underline">Github</Link>
          .
        </p>
        {Company.branding !== false && (
          <div className="text-center hidden md:block">
            <Link
              className="font-semibold"
              href="https://github.com/ALiAbdelhadi/alphabyte-labs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alphabyte-labs
            </Link>
          </div>
        )}
      </div>
    </footer>
  )
}
