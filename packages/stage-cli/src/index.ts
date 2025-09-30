#!/usr/bin/env node
import { Command } from "commander"
import { add } from "./commands/add.js"
import { init } from "./commands/init.js"
import { list } from "./commands/list.js"
import { search } from "./commands/search.js"
import { view } from "./commands/view.js"
import { deps } from "./commands/deps.js"

import packageJson from "../package.json" assert { type: "json" }

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

async function main() {
  const program = new Command()
    .name("alphabyte")
    .description("Add Alphabyte Labs components and blocks to your project")
    .version(
      packageJson.version || "1.0.0",
      "-v, --version",
      "display the version number"
    )

  program
    .addCommand(init)
    .addCommand(add)
    .addCommand(list)
    .addCommand(view)
    .addCommand(search)
    .addCommand(deps)

  program.parse()
}

main()
