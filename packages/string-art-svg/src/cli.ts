#!/usr/bin/env node
import { existsSync, writeFileSync } from "node:fs"
import path from "node:path"
import yargs from "yargs"
import { hideBin } from "yargs/helpers"

import { NGonSubdivisions } from "@chthonic/string-art"

import { generateSVGFromVerticesMatrix } from "./svg-generator"

yargs(hideBin(process.argv))
  .scriptName("string-art-svg")
  .usage("$0 [options]")
  .wrap(null)
  .example(
    "$0 -v 13 -s 11 -p 73 -j 2 5 7",
    "Generate an V13-S11-P73-J2_5_7.svg file",
  )
  .example("$0 -o file-name.svg", "Save svg to file-name.svg")
  .option("vertices", {
    alias: "v",
    type: "number",
    default: 6,
    describe: "Number of vertices",
    demandOption: true,
  })
  .option("jumps", {
    alias: "j",
    type: "array",
    default: [],
    describe: "Jump sequence (array of numbers)",
    coerce: (arr) => arr.map(Number),
    demandOption: true,
  })
  .option("subdivisions", {
    alias: "s",
    type: "number",
    default: 1,
    describe: "Number of subdivisions",
  })
  .option("points", {
    alias: "p",
    type: "number",
    default: 1,
    describe: "Number of points",
    demandOption: true,
  })
  .option("output", {
    alias: "o",
    type: "string",
    describe: "Output svg file path",
  })
  .option("force", {
    alias: "f",
    type: "boolean",
    default: false,
    describe: "Overwrite the output file if it already exists",
  })
  .option("stroke", {
    alias: "k",
    type: "number",
    default: 1,
    describe: "Stroke width",
    demandOption: true,
  })
  .option("size", {
    alias: "z",
    type: "number",
    default: 400,
    describe: "Svg size",
    demandOption: true,
  })
  .option("colour", {
    alias: "c",
    type: "string",
    default: "#333A3F",
    describe: "Svg colour",
  })
  .group(["vertices", "jumps", "subdivisions", "points"], "String Art Options:")
  .group(["output", "force"], "Output Options:")
  .group(["stroke", "colour", "size"], "Styling Options:")
  .group(["help", "version"], "Other Options:")
  .help()
  .parseAsync()
  .then((argv) => {
    const {
      vertices,
      jumps,
      subdivisions,
      points,
      output,
      force,
      size,
      stroke: strokeWidth,
      colour: strokeColour,
    } = argv

    if (output === "-") {
      console.log(
        JSON.stringify({ vertices, jumps, subdivisions, points }, null, 2),
      )
      return
    }

    let fileName = output

    if (fileName === undefined) {
      const jumpsPart = jumps.join("_")
      fileName = `V${vertices}-S${subdivisions}-P${points}-J${jumpsPart}.svg`
    }

    if (existsSync(fileName) && !force) {
      console.error(
        `Error: File "${fileName}" already exists. Use --force to overwrite.`,
      )
      process.exit(1)
    }

    const svgNGon = new NGonSubdivisions({
      vertices,
      jumps,
      points,
      subdivisions,
    })
    const verticesMatrix = svgNGon.getVerticesMatrix()

    const svg = generateSVGFromVerticesMatrix({
      verticesMatrix,
      size,
      strokeColour,
      strokeWidth,
    })
    writeFileSync(fileName, svg, "utf8")
    const resolved = path.resolve(fileName)
    console.log(`Wrote svg to ${resolved}`)
  })
