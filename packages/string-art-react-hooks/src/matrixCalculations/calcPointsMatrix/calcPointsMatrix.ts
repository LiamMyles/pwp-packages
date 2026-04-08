import type { VerticesMatrix } from "MatrixCalculations/types"

export function calcPointsMatrix(
  vertices: number,
  subdivisions: number,
  points: number,
  subdivisionMatrix: VerticesMatrix[],
  ...jumps: number[]
): VerticesMatrix[] {
  let totalPoints = vertices * subdivisions
  if (jumps.length !== 0) {
    totalPoints = jumps.length * vertices * subdivisions
  }

  return [...Array(totalPoints)].map((_, index) => {
    return subdivisionMatrix[(index * points) % totalPoints]
  })
}
