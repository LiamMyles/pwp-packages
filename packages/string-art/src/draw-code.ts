import Canvas from "drawille"

import { NGonSubdivisions } from "../dist/index.mjs"

const NGon = new NGonSubdivisions({
  vertices: 4,
  subdivisions: 11,
  points: 43,
  jumps: [2, 5, 6],
})

const size = 250

const c = new Canvas(size, size)

const scale = size / 2
const width = size
const height = size
const maxX = width - 5
const maxY = height - 5

function clampToCanvas(x: number, y: number) {
  const clampedX = Math.min(Math.max(x, 0), maxX)
  const clampedY = Math.min(Math.max(y, 0), maxY)
  return [clampedX, clampedY] as const
}

function lineFloatAware(
  p1: { x: number; y: number },
  p2: { x: number; y: number },
) {
  // Canvas center
  const cx = Math.floor(width / 2)
  const cy = Math.floor(height / 2)

  // Convert float coords (centered) → integer canvas coords
  let x1 = Math.round(cx + p1.x * scale)
  let y1 = Math.round(cy - p1.y * scale) // invert Y so +y is up
  let x2 = Math.round(cx + p2.x * scale)
  let y2 = Math.round(cy - p2.y * scale)

  // Clamp to drawable canvas bounds
  const [x1Clamped, y1Clamped] = clampToCanvas(x1, y1)
  const [x2Clamped, y2Clamped] = clampToCanvas(x2, y2)

  x1 = x1Clamped
  y1 = y1Clamped
  x2 = x2Clamped
  y2 = y2Clamped

  // Differences in each axis
  let deltaX = Math.abs(x2 - x1)
  let deltaY = Math.abs(y2 - y1)

  // Step direction for each axis (+1 or -1)
  let stepX = x1 < x2 ? 1 : -1
  let stepY = y1 < y2 ? 1 : -1

  // Bresenham error accumulator
  let error = deltaX - deltaY

  // Helper predicates (evaluated inside the loop)
  const isLineComplete = () => x1 === x2 && y1 === y2

  while (true) {
    c.set(x1, y1)

    if (isLineComplete()) break

    const doubledError = 2 * error

    const shouldStepX = doubledError > -deltaY
    const shouldStepY = doubledError < deltaX

    if (shouldStepX) {
      error -= deltaY
      x1 += stepX
    }

    if (shouldStepY) {
      error += deltaX
      y1 += stepY
    }
  }
}

function renderFrameInPlace(frame: string) {
  process.stdout.write("\x1b[H\x1b[2J") // Move cursor home + clear screen
  process.stdout.write(frame)
}

function drawFrame() {
  const verticesMatrix = NGon.getVerticesMatrix()

  verticesMatrix
    .slice(0, NGon.getNGonMetadata().lineDensity)
    .forEach((_, count) => {
      const sub = verticesMatrix[count]
        ? verticesMatrix[count]
        : verticesMatrix[verticesMatrix.length - 1]
      const point = verticesMatrix[count + 1]
        ? verticesMatrix[count + 1]
        : verticesMatrix[0]

      lineFloatAware(sub, point)
    })

  renderFrameInPlace(c.frame())
}

c.clear()
drawFrame()
