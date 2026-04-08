import type { VSPJ } from "MatrixCalculations/types"

function GCD(a: number, b: number): number {
  if (!b) {
    return a
  }

  return GCD(b, a % b)
}

export interface NGonMetadata {
  lineDensity: number
  subdivisionCommonFactor: number
  verticesCommonFactor: number
}

export function calcNGonMetadata({
  vertices,
  subdivisions,
  points,
  jumps = [],
}: VSPJ): NGonMetadata {
  let totalJumps = 1
  let sumOfJumps = 1

  if (jumps.length !== 0) {
    totalJumps = jumps.length
    sumOfJumps = jumps.reduce((a, b) => a + b)
  }

  const verticesCommonFactor = GCD(vertices, sumOfJumps % vertices)

  const verticesUsed = (vertices * totalJumps) / verticesCommonFactor

  const subdivisionCommonFactor = GCD(verticesUsed * subdivisions, points)

  const lineDensity = (verticesUsed * subdivisions) / subdivisionCommonFactor

  return { lineDensity, subdivisionCommonFactor, verticesCommonFactor }
}
