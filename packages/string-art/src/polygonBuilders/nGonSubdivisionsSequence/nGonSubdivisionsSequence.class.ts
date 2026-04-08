import { calcNGonMetadata } from "MatrixCalculations/calcLineDensity"
import type { VerticesMatrix } from "MatrixCalculations/types"

import { NGonSubdivisions } from "../nGonSubdivisions"

export class NGonSubdivisionsSequence extends NGonSubdivisions {
  constructor(
    vertices?: number,
    subdivisions?: number,
    jumps?: number[],
    pointsRange?: {
      start: number
      end: number
    },
  ) {
    super()
    if (vertices) {
      this.setVertices(vertices)
    }
    if (subdivisions) {
      this.setSubdivisions(subdivisions)
    }
    if (jumps) {
      this.setJumps(jumps)
    }
    if (pointsRange) {
      this.pointsRangeConstructed = true
      this.setSequencePointsRange(pointsRange.start, pointsRange.end)
      this.setPoints(pointsRange.start)
    }
    this.calculateVertexMatrix()
  }

  subdivisions = 10
  points = 1
  subdivisionMatrix: VerticesMatrix[] = [{ x: 0, y: 0 }]
  initialMatrix: VerticesMatrix[] = [{ x: 0, y: 0 }]

  pointsStartingRange = 1
  pointsEndingRange = 2000
  pointsRangeConstructed = false
  targetSCF = 1
  speedMs = 100
  playAnimation = true

  lastFrameDrawTime = performance.now()
  matchDepthCounter = 0
  lastAnimationFrame: undefined | number

  autoSetPointsRange(): void {
    if (this.pointsRangeConstructed === false) {
      this.pointsEndingRange =
        this.verticesAmount * this.subdivisions * this.jumps.length
    }
  }

  /** overwrite parent functions to set points range */
  setVertices(count: number): void {
    super.setVertices(count)
    this.autoSetPointsRange()
    this.points = 1
  }

  setSubdivisions(subdivisions: number): void {
    super.setSubdivisions(subdivisions)
    this.autoSetPointsRange()
    this.points = 1
  }

  setJumps(jumps: number[]): void {
    super.setJumps(jumps)
    this.autoSetPointsRange()
    this.points = 1
  }
  /** end of overwrite parent functions to set points range */

  setSequencePointsRange(start: number, end: number): void {
    this.pointsStartingRange = start
    this.pointsEndingRange = end
  }

  setSpeedMs(speedMs: number): void {
    this.speedMs = speedMs
  }

  /**
   * Recursively increases the points count until SCF is 1 again
   *
   * Recursion depth is measured to avoid endless loops
   * */
  progressToNextSCF(): boolean {
    if (this.matchDepthCounter === 50) {
      return false
    }

    this.setPoints(this.points + 1)

    if (this.points >= this.pointsEndingRange) {
      this.points = this.pointsStartingRange
    }

    const { subdivisionCommonFactor } = calcNGonMetadata({
      vertices: this.verticesAmount,
      subdivisions: this.subdivisions,
      points: this.points,
      jumps: this.jumps,
    })

    if (subdivisionCommonFactor !== this.targetSCF) {
      this.matchDepthCounter = this.matchDepthCounter + 1
      return this.progressToNextSCF()
    } else {
      this.matchDepthCounter = 0
      return true
    }
  }
}
