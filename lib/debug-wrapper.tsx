"use client"

import type { ReactNode } from "react"

export function ErrorBoundary({ children }: { children: ReactNode }) {
  try {
    return <>{children}</>
  } catch (error) {
    console.error("Error in MDX rendering:", error)
    return (
      <div className="p-4 border border-red-500 rounded-md bg-red-50 text-red-800">
        <h3 className="font-bold">Error rendering content</h3>
        <p>
          There was an error rendering this content. Please check the console
          for details.
        </p>
      </div>
    )
  }
}
