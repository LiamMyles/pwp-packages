#!/usr/bin/env node
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { existsSync, writeFileSync } from "node:fs"
import path from "node:path"

yargs(hideBin(process.argv))
  .scriptName("string-art-svg")
  .usage("$0 [options]")
  .wrap(null)
  .example(
    "$0 -v 12 -j 2 5 7 -s 4 -p 500",
    "Generate a 12‑vertex pattern with jumps 2,5,7",
  )
  .option("vertices", {
    alias: "v",
    type: "number",
    describe: "Number of vertices in the polygon",
    demandOption: true,
  })
  .option("jumps", {
    alias: "j",
    type: "array",
    describe: "Jump sequence (array of numbers)",
    coerce: (arr) => arr.map(Number),
    demandOption: true,
  })
  .option("subdivisions", {
    alias: "s",
    type: "number",
    default: 1,
    describe: "Number of subdivisions per edge",
  })
  .option("points", {
    alias: "p",
    type: "number",
    describe: "Number of points to generate",
    demandOption: true,
  })
  .option("output", {
    alias: "o",
    type: "string",
    describe: "Output JSON file path",
  })
  .option("force", {
    alias: "f",
    type: "boolean",
    default: false,
    describe: "Overwrite the output file if it already exists",
  })
  .group(["vertices", "jumps", "subdivisions", "points"], "Pattern Parameters:")
  .group(["output", "force"], "Output Options:")
  .help()
  .parseAsync()

  .then((argv) => {
    const { vertices, jumps, subdivisions, points, output, force } = argv

    const data = { vertices, jumps, subdivisions, points }

    if (output === "-") {
      console.log(
        JSON.stringify({ vertices, jumps, subdivisions, points }, null, 2),
      )
      return
    }

    let fileName = output

    if (fileName === undefined) {
      const jumpsPart = jumps.join("_")
      fileName = `V${vertices}-S${subdivisions}-P${points}-J${jumpsPart}.json`
    }

    if (existsSync(fileName) && !force) {
      console.error(
        `Error: File "${fileName}" already exists. Use --force to overwrite.`,
      )
      process.exit(1)
    }

    writeFileSync(fileName, JSON.stringify(data, null, 2), "utf8")
    const resolved = path.resolve(fileName)
    console.log(`Wrote svg to ${resolved}`)
  })
