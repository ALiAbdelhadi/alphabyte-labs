import { existsSync } from "fs"
import fs from "fs/promises"
import path from "path"
import puppeteer from "puppeteer"

const REGISTRY_SCREENSHOT = path.join(
  process.cwd(),
  "apps/web/public/block-mokeup"
)

// Function to get blocks list from blocks-examples.ts
async function getBlocksFromExamples() {
  try {
    // Define variables for content and foundPath
    let content = ""
    let foundPath = ""

    // Path to blocks-examples.ts
    const filePath = path.join(
      process.cwd(),
      "apps/web/registry/blocks-examples.ts"
    )

    // Check if file exists and read it
    if (existsSync(filePath)) {
      content = await fs.readFile(filePath, "utf-8")
      foundPath = filePath
      console.log(`Found blocks-examples.ts at: ${foundPath}`)
    } else {
      console.error("Could not find blocks-examples.ts")
    }

    // Parse the file to extract block names
    // Using a regex that looks for "name": "block-name" pattern
    const nameMatches = [...content.matchAll(/"name":\s*"([^"]+)"/g)]
    const blockNames = nameMatches.map((match) => match[1])

    if (blockNames.length === 0) {
      console.warn("No block names found in the file, using default list")
    }

    return blockNames
  } catch (error) {
    console.error("Error loading blocks-examples.ts:", error)
  }
}

async function captureScreenShots() {
  // Check if screenshots already exist
  await fs.mkdir(REGISTRY_SCREENSHOT, { recursive: true })

  // Get blocks list
  const blockIds = await getBlocksFromExamples()
  console.log(`Found ${blockIds.length} blocks: ${blockIds.join(", ")}`)

  const blocks = blockIds.filter((block) => {
    const lightPath = path.join(REGISTRY_SCREENSHOT, `${block}-light.png`)
    const darkPath = path.join(REGISTRY_SCREENSHOT, `${block}-dark.png`)
    return !existsSync(lightPath) || !existsSync(darkPath)
  })

  if (blocks.length === 0) {
    console.log("✨ All screenshots exist, nothing to capture")
    return
  }

  console.log(`🔍 Found ${blocks.length} blocks to capture`)
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--disable-gpu",
    ],
    ignoreDefaultArgs: ["--disable-extensions"],
  })

  try {
    for (const block of blocks) {
      const page = await browser.newPage()
      const blockPageUrl = `http://localhost:3000/view/${block}`

      console.log(`- Capturing ${block}`)

      try {
        // Navigate to the page and wait until network is idle
        await page.goto(blockPageUrl, {
          waitUntil: "networkidle0",
          timeout: 60000,
        })

        for (const theme of ["light", "dark"]) {
          const suffix = theme === "dark" ? "-dark" : "-light"
          const screenshotPath = path.join(
            REGISTRY_SCREENSHOT,
            `${block}${suffix}.png`
          )
          if (existsSync(screenshotPath)) {
            console.log(`  - ${theme} theme screenshot already exists`)
            continue
          }
          // Set theme and reload page
          await page.evaluate((t) => {
            localStorage.setItem("theme", t)
            // Force theme application if your app has a function for it
            if (window.applyTheme) {
              window.applyTheme(t)
            }
          }, theme)
          await page.reload({ waitUntil: "networkidle0", timeout: 30000 })
          // Wait for animations to complete
          await new Promise((resolve) => setTimeout(resolve, 6000))
          // Hide Tailwind indicator
          await page.evaluate(() => {
            const ind = document.querySelector("[data-tailwind-indicator]")
            if (ind) ind.remove()
          })
          console.log(`  - Capturing ${theme} theme screenshot`)
          await page.screenshot({ path: screenshotPath })
          console.log(`  - Saved to ${screenshotPath}`)
        }
      } catch (error) {
        console.error(`Error capturing ${block}:`, error)
      } finally {
        await page.close()
      }
    }
  } finally {
    await browser.close()
  }
}

;(async () => {
  try {
    console.log("🔍 Capturing screenshots...")
    await captureScreenShots()
    console.log("✅ Done!")
  } catch (err) {
    console.error("❌ Error:", err)
    process.exit(1)
  }
})()
