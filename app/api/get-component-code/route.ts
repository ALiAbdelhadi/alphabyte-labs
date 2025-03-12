import fs from "fs/promises"
import path from "path"
import { NextRequest, NextResponse } from "next/server"

const codeCache: Record<string, { content: string; timestamp: number }> = {}
const CACHE_TTL = 5 * 60 * 1000

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const componentName = searchParams.get("name")
    const baseComponent = searchParams.get("baseComponent")

    if (!componentName) {
      return NextResponse.json(
        { error: "Component name is required" },
        { status: 400 }
      )
    }

    const cacheKey = `${baseComponent || ""}-${componentName}`
    const now = Date.now()

    if (
      codeCache[cacheKey] &&
      now - codeCache[cacheKey].timestamp < CACHE_TTL
    ) {
      return NextResponse.json({ code: codeCache[cacheKey].content })
    }

    let filePath
    let fileContent

    if (baseComponent) {
      const folderPath = `${baseComponent}-demo`
      filePath = path.join(
        process.cwd(),
        "registry-components",
        "examples",
        folderPath,
        `${componentName}.tsx`
      )

      try {
        await fs.access(filePath)
        fileContent = await fs.readFile(filePath, "utf-8")
      } catch (error) {
        filePath = path.join(
          process.cwd(),
          "registry-components",
          "examples",
          `${componentName}.tsx`
        )
        fileContent = await fs.readFile(filePath, "utf-8")
      }
    } else {
      filePath = path.join(
        process.cwd(),
        "registry-components",
        "examples",
        `${componentName}.tsx`
      )
      fileContent = await fs.readFile(filePath, "utf-8")
    }

    codeCache[cacheKey] = {
      content: fileContent,
      timestamp: now,
    }

    return NextResponse.json({ code: fileContent })
  } catch (error) {
    console.error("Error reading component file:", error)
    return NextResponse.json(
      { error: "An error occurred while reading the component file" },
      { status: 500 }
    )
  }
}
