import {
  calcNGonMetadata,
  type NGonMetadata,
} from "MatrixCalculations/calcLineDensity"
import { calcNGonVertices } from "MatrixCalculations/calcNGonVertices"

import type { NGonInputs, INGonVertices, Vertices } from "../n-gon.types"
import { NGonBuilder } from "PolygonBuilders/nGonBuilder"

export class NGon extends NGonBuilder implements INGonVertices {
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

  protected calculateVertices(): Vertices[] {
    return calcNGonVertices(this.vertices)
  }
}
