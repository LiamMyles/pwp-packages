import { calcLineDensity } from "MatrixCalculations/calcLineDensity"
import type { VerticesMatrix } from "MatrixCalculations/types"
import { useEffect, useState } from "react"

import { NGonSubdivisions } from "../nGonSubdivisions"

export class NGonSubdivisionsSequence extends NGonSubdivisions {
  constructor(
    vertices?: number,
    subdivisions?: number,
    jumps?: number[],
    pointsRange?: {
      start: number
      end: number
    }
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

  useSpeedMs(
    initialSpeedMs: number
  ): [number, React.Dispatch<React.SetStateAction<number>>] {
    const [speedMs, setSpeedMs] = useState(initialSpeedMs)
    useEffect(() => {
      this.setSpeedMs(speedMs)
      this.calculateVertexMatrix()
    }, [speedMs])

    return [speedMs, setSpeedMs]
  }

  useSequencePointsRange(
    start: number,
    end: number
  ): [
    { start: number; end: number },
    React.Dispatch<React.SetStateAction<{ start: number; end: number }>>
  ] {
    const [pointsRange, setPointsRange] = useState({ start, end })
    useEffect(() => {
      this.setSequencePointsRange(pointsRange.start, pointsRange.end)
      this.calculateVertexMatrix()
    }, [pointsRange])

    return [pointsRange, setPointsRange]
  }
  /**
   * Recursively increases the points count until SCF is 1 again
   *
   * Recursion depth is measured to avoid endless loops
   * */
  private matchNextSCF(): boolean {
    if (this.matchDepthCounter === 50) {
      return false
    }

    this.setPoints(this.points + 1)

    if (this.points >= this.pointsEndingRange) {
      this.points = this.pointsStartingRange
    }

    const { subdivisionCommonFactor } = calcLineDensity({
      vertices: this.verticesAmount,
      subdivisions: this.subdivisions,
      points: this.points,
      jumps: this.jumps,
    })

    if (subdivisionCommonFactor !== this.targetSCF) {
      this.matchDepthCounter = this.matchDepthCounter + 1
      return this.matchNextSCF()
    } else {
      this.matchDepthCounter = 0
      return true
    }
  }

  animateSequence(): void {
    if (this.lastAnimationFrame !== undefined) {
      cancelAnimationFrame(this.lastAnimationFrame)
    }
    const animate = (timestamp: DOMHighResTimeStamp) => {
      if (timestamp - this.lastFrameDrawTime >= this.speedMs) {
        this.lastFrameDrawTime = timestamp

        const foundMatch = this.matchNextSCF()

        if (foundMatch !== true) {
          this.playAnimation = false
        }

        this.calculateVertexMatrix()
      }
      if (this.playAnimation === true) {
        requestAnimationFrame(animate)
      }
    }

    this.lastAnimationFrame = requestAnimationFrame(animate)
  }
}
