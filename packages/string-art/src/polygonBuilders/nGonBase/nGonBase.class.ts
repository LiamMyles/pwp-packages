import { type NGonMetadata } from "MatrixCalculations/calcLineDensity"

import type { INGonBasePublic, VerticesMatrix } from "CommonTypes"

export abstract class NGonBase implements INGonBasePublic {
  private recalculateVertices: boolean
  private recalculateNGonMetadata: boolean

  protected NGonMetadata?: NGonMetadata
  protected verticesMatrix: VerticesMatrix = []

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

  protected abstract calculateVertices(): VerticesMatrix

  /**
   * Get the raw vertices matrix that doesn't take into account the chance of repeated patterns.
   *
   */
  getRawVerticesMatrix(): VerticesMatrix {
    if (this.recalculateVertices === true) {
      this.verticesMatrix = this.calculateVertices()
      this.recalculateVertices = false
      return this.verticesMatrix
    } else {
      return this.verticesMatrix
    }
  }

  /**
   * Get the subset of the VerticesMatrix that doesn't repeat. Which is calculated by lineDensity
   *
   * This creates a cleaner effect when drawn, as getRawVerticesMatrix can sometimes loop over itself
   *
   */
  getVerticesMatrix(): VerticesMatrix {
    const { lineDensity } = this.getNGonMetadata()

    const miniumVerticesMatrix = this.getRawVerticesMatrix().slice(
      0,
      lineDensity,
    )
    return miniumVerticesMatrix
  }
}
