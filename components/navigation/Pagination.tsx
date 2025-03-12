import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { getPreviousNext } from "@/lib/markdown"

const Pagination = ({ pathname }: { pathname: string }) => {
  const res = getPreviousNext(pathname)
  return (
    <div className="flex flex-col sm:flex-row justify-between my-12 gap-4">
      <div className="w-full sm:w-1/2">
        {res.prev && (
          <Link
            className="w-full  border-none flex flex-col  !py-4 !items-start font-medium not-prose"
            href={`/docs${res.prev.href}`}
          >
            <div>
              <span className=" text-muted-foreground text-xs sm:text-[13px]">
                Previous
              </span>
              <span className="flex no-underline items-center justify-center text-gray-900 hover:text-gray-950  dark:text-gray-200 hover:dark:text-gray-100 transition-colors text-base md:text-lg mt-2">
                <ChevronLeftIcon className="w-6 h-6 text-muted-foreground mt-[1px] mr-[6px]" />
                {res.prev.title}
              </span>
            </div>
          </Link>
        )}
      </div>
      <div className="w-full sm:w-1/2 flex justify-end">
        {res.next && (
          <Link
            className="w-full border-none flex flex-col !py-4 !items-end text-right font-medium not-prose"
            href={`/docs${res.next.href}`}
          >
            <span className=" text-muted-foreground text-xs sm:text-[13px]">
              Next
            </span>
            <span className="flex no-underline items-center justify-center text-gray-900 hover:text-gray-950  dark:text-gray-200 hover:dark:text-gray-100  transition-colors text-base md:text-lg mt-2">
              {res.next.title}
              <ChevronRightIcon className="w-6 h-6 text-muted-foreground mt-[1px] ml-[6px]" />
            </span>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Pagination
