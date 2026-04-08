import { calcLineDensity } from "MatrixCalculations/calcLineDensity"
import { calcNGonVertices } from "MatrixCalculations/calcNGonVertices"
import { useEffect, useState } from "react"

import type { Vertices } from "../n-gon.types"

export class NGon {
  verticesAmount = 0
  verticesMatrix: Vertices[] = []
  lineDensity = 0
  subdivisionCommonFactor = 0
  verticesCommonFactor = 0

  setVertices(count: number): void {
    this.verticesAmount = count
  }

  calculateVertexMatrix(): void {
    this.verticesMatrix = calcNGonVertices(this.verticesAmount)
    const { lineDensity, subdivisionCommonFactor, verticesCommonFactor } =
      calcLineDensity({
        vertices: this.verticesAmount,
        subdivisions: 1,
        points: 1,
        jumps: [],
      })

    this.lineDensity = lineDensity
    this.subdivisionCommonFactor = subdivisionCommonFactor
    this.verticesCommonFactor = verticesCommonFactor
  }

  useVertices(
    initialVertices: number,
  ): [number, React.Dispatch<React.SetStateAction<number>>] {
    const [vertices, setVertex] = useState(initialVertices)
    useEffect(() => {
      this.setVertices(vertices)
      this.calculateVertexMatrix()
    }, [vertices])

    return [vertices, setVertex]
  }
}
