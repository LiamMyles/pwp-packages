import { calcJumpedMatrix } from "MatrixCalculations/calcJumpedMatrix"
import {
  calcNGonMetadata,
  type NGonMetadata,
} from "MatrixCalculations/calcLineDensity"
import { calcNGonVertices } from "MatrixCalculations/calcNGonVertices"
import { calcPointsMatrix } from "MatrixCalculations/calcPointsMatrix"
import { calcSubdivisionMatrix } from "MatrixCalculations/calcSubdivisionMatrix"
import type { VerticesMatrix } from "MatrixCalculations/types"

import { NGonBase } from "PolygonBuilders/nGonBase"
import type {
  INGonVertices,
  INGonJumps,
  INGonSubdivided,
  NGonInputs,
  Vertices,
} from "PolygonBuilders/n-gon.types"

export class NGonSubdivisions
  extends NGonBase
  implements INGonVertices, INGonJumps, INGonSubdivided
{
  vertices: number
  jumps: number[]
  subdivisions: number
  points: number
  constructor({ jumps, points, subdivisions, vertices }: NGonInputs) {
    super()

    this.jumps = jumps
    this.vertices = vertices
    this.subdivisions = subdivisions
    this.points = points
  }

  autoPoints = false
  subdivisionMatrix: VerticesMatrix[] = [{ x: 0, y: 0 }]
  initialMatrix: VerticesMatrix[] = [{ x: 0, y: 0 }]

  setSubdivisions(subdivisions: number): void {
    this.subdivisions = subdivisions
    this.requireRecalculate()
  }

  setPoints(points: number): void {
    this.points = points
    this.requireRecalculate()
  }

  setJumps(jumps: number[]): void {
    this.jumps = jumps
    this.requireRecalculate()
  }

  setVertices(count: number): void {
    this.vertices = count
    this.requireRecalculate()
  }

  protected calculateMetadata(): NGonMetadata {
    return calcNGonMetadata({
      vertices: this.vertices,
      subdivisions: this.subdivisions,
      points: this.points,
      jumps: this.jumps,
    })
  }
  protected calculateVertices(): Vertices[] {
    const initialMatrix = calcNGonVertices(this.vertices)

    const jumpedMatrix = calcJumpedMatrix(initialMatrix, ...this.jumps)

    const subdivisionMatrix = calcSubdivisionMatrix(
      this.subdivisions,
      jumpedMatrix,
    )

    const pointsMatrix = calcPointsMatrix(
      this.vertices,
      this.subdivisions,
      this.points,
      subdivisionMatrix,
      ...this.jumps,
    )
    return pointsMatrix
  }

  setPointsToNextStableSCF(): void {
    let currentLoop = 0
    let isNextSCF = false
    const effectiveJumps = this.jumps.length === 0 ? 1 : this.jumps.length
    const maxPoints = this.vertices * effectiveJumps * this.subdivisions

    while (isNextSCF === false || currentLoop > 50) {
      currentLoop = currentLoop + 1

      if (currentLoop >= 50) {
        throw new Error("Max loop depth reached")
      }

      this.setPoints(this.points + 1)
      if (this.points === maxPoints) {
        this.setPoints(1)
      }

      const { subdivisionCommonFactor } = this.getNGonMetadata()

      if (subdivisionCommonFactor === 1) {
        isNextSCF = true
      }
    }
  }
}
