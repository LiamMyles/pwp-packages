import { type NGonMetadata } from "MatrixCalculations/calcLineDensity"

import type { INGonBuilderPublic, Vertices } from "../n-gon.types"

export abstract class NGonBuilder implements INGonBuilderPublic {
  private recalculateVertices: boolean
  private recalculateNGonMetadata: boolean

  protected NGonMetadata?: NGonMetadata
  protected verticesMatrix: Vertices[] = []

  constructor() {
    this.recalculateVertices = true
    this.recalculateNGonMetadata = true
  }

  protected requireRecalculate(): void {
    this.recalculateVertices = true
    this.recalculateNGonMetadata = true
  }

  protected abstract calculateMetadata(): NGonMetadata

  getNGonMetadata(): NGonMetadata {
    if (this.recalculateNGonMetadata === true) {
      this.NGonMetadata = this.calculateMetadata()
      this.recalculateNGonMetadata = false
      return this.NGonMetadata
    } else {
      if (this.NGonMetadata === undefined) {
        throw new Error("NGonMetadata must be defined")
      }
      return this.NGonMetadata
    }
  }

  protected abstract calculateVertices(): Vertices[]

  getVerticesMatrix(): Vertices[] {
    if (this.recalculateVertices === true) {
      this.verticesMatrix = this.calculateVertices()
      this.recalculateVertices = false
      return this.verticesMatrix
    } else {
      return this.verticesMatrix
    }
  }
}
