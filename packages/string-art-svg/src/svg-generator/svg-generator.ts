import { serve } from "bun"

import { NGonSubdivisions } from "../polygonBuilders/nGonSubdivisions"

type Point = { x: number; y: number }

/**
 * Converts an array of normalized points into an SVG polygon string.
 * @param points Array of { x, y } coordinates
 * @param scale Multiplier to scale normalized coordinates (default: 100)
 * @returns SVG string
 */
function generateSVGFromPoints(points: Point[], scale = 400): string {
  const svgHeader = `<svg width="${scale * 2}" height="${scale * 2}" viewBox="${
    scale * -1
  } ${scale * -1} ${scale * 2} ${
    scale * 2
  }" xmlns="http://www.w3.org/2000/svg">`
  const svgFooter = `</svg>`

  const scaledPoints = points
    .map((p) => `${p.x * scale},${-p.y * scale}`) // Flip Y for SVG coordinate system
    .join(" ")

  const polygon = `<polygon points="${scaledPoints}" fill="none" stroke="black" stroke-width="0.1" />`

  return `${svgHeader}\n  ${polygon}\n${svgFooter}`
}

serve({
  port: 3000,
  routes: {
    "/generate/": (req) => {
      const url = new URL(req.url)

      const vertex = parseInt(url.searchParams.get("vertex") || "0", 10)
      const subdivisions = parseInt(
        url.searchParams.get("subdivisions") || "0",
        10
      )
      const points = parseInt(url.searchParams.get("points") || "0", 10)

      // Collect all 'jumps' parameters
      const jumps = url.searchParams.getAll("jumps").map((j) => parseInt(j, 10))

      const polygon = new NGonSubdivisions()

      polygon.setVertices(vertex)
      polygon.setSubdivisions(subdivisions)
      polygon.setJumps(jumps)
      polygon.setPoints(points)
      polygon.calculateVertexMatrix()

      const result = generateSVGFromPoints(polygon.verticesMatrix)

      return new Response(result, {
        headers: { "Content-Type": "image/svg+xml" },
      })
    },
  },
})

// await Bun.write("./test.svg", result)

// https://www.playingwithpolygons.com/?vertex=11&subdivisions=11&points=32&jumps=4&jumps=3&jumps=6
