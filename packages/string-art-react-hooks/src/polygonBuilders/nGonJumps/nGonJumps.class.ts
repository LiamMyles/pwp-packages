import { calcJumpedMatrix } from "MatrixCalculations/calcJumpedMatrix"
import { calcLineDensity } from "MatrixCalculations/calcLineDensity"
import { calcNGonVertices } from "MatrixCalculations/calcNGonVertices"
import { useEffect, useState } from "react"

import type { Vertices } from "../n-gon.types"
import { NGon } from "../nGon"

export class NGonJumps extends NGon {
  constructor() {
    super()
  }

  jumps: number[] = []
  initialJumpsVerticesMatrix: Vertices[] = []

  setJumps(jumps: number[]): void {
    this.jumps = jumps
  }

  calculateVertexMatrix(): void {
    const initialMatrix = calcNGonVertices(this.verticesAmount)
    this.verticesMatrix = calcJumpedMatrix(initialMatrix, ...this.jumps)

    const { lineDensity, subdivisionCommonFactor, verticesCommonFactor } =
      calcLineDensity({
        vertices: this.verticesAmount,
        subdivisions: 1,
        points: 1,
        jumps: this.jumps,
      })

    this.lineDensity = lineDensity
    this.subdivisionCommonFactor = subdivisionCommonFactor
    this.verticesCommonFactor = verticesCommonFactor
  }

  useJumps(
    initialJumps: number[],
  ): [number[], React.Dispatch<React.SetStateAction<number[]>>] {
    const [jumps, setJumps] = useState(initialJumps)
    useEffect(() => {
      this.setJumps(jumps)
      this.calculateVertexMatrix()
    }, [jumps])

    return [jumps, setJumps]
  }
}
