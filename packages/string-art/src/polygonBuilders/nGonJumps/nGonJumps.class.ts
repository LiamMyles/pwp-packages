import { calcJumpedMatrix } from "MatrixCalculations/calcJumpedMatrix"
import {
  calcNGonMetadata,
  type NGonMetadata,
} from "MatrixCalculations/calcLineDensity"
import { calcNGonVertices } from "MatrixCalculations/calcNGonVertices"

import type {
  NGonInputs,
  INGonVertices,
  VerticesMatrix,
  INGonJumps,
} from "CommonTypes"

import { NGonBase } from "PolygonBuilders/nGonBase"

export class NGonJumps extends NGonBase implements INGonJumps, INGonVertices {
  jumps: number[]
  vertices: number

  constructor({ vertices, jumps }: Pick<NGonInputs, "vertices" | "jumps">) {
    super()
    this.vertices = vertices
    this.jumps = jumps
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
      subdivisions: 1,
      points: 1,
      jumps: this.jumps,
    })
  }

  protected calculateVertices(): VerticesMatrix {
    const initialMatrix = calcNGonVertices(this.vertices)
    return calcJumpedMatrix(initialMatrix, ...this.jumps)
  }
}
