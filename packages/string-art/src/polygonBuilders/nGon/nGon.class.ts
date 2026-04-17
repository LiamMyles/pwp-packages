import {
  calcNGonMetadata,
  type NGonMetadata,
} from "MatrixCalculations/calcLineDensity"
import { calcNGonVertices } from "MatrixCalculations/calcNGonVertices"

import type { NGonInputs, INGonVertices, VerticesMatrix } from "CommonTypes"
import { NGonBase } from "PolygonBuilders/nGonBase"

export class NGon extends NGonBase implements INGonVertices {
  vertices

  constructor({ vertices }: Pick<NGonInputs, "vertices">) {
    super()
    this.vertices = vertices
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
      jumps: [],
    })
  }

  protected calculateVertices(): VerticesMatrix {
    return calcNGonVertices(this.vertices)
  }
}
