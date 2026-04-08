import { calcJumpedMatrix } from "MatrixCalculations/calcJumpedMatrix"
import { calcNGonVertices } from "MatrixCalculations/calcNGonVertices"
import { calcSpiral } from "MatrixCalculations/calcSpiral"
import type { VerticesMatrix } from "MatrixCalculations/types"
import { useEffect, useState } from "react"

import { NGonJumps } from "../nGonJumps"

export class NGonSpirals extends NGonJumps {
  setLineDensity: React.Dispatch<React.SetStateAction<number>>
  reduction = 12
  showMirror = false
  initialMatrix: VerticesMatrix[] = [{ x: 0, y: 0 }]

  constructor({
    setLineDensity,
  }: {
    setLineDensity: React.Dispatch<React.SetStateAction<number>>
  }) {
    super()
    this.setLineDensity = setLineDensity
  }
  setReduction(reduction: number): void {
    this.reduction = reduction
  }

  setShowMirror(showMirror: boolean): void {
    this.showMirror = showMirror
  }

  useReduction(
    initialReduction: number
  ): [number, React.Dispatch<React.SetStateAction<number>>] {
    const [reduction, setReduction] = useState(initialReduction)
    useEffect(() => {
      this.setReduction(reduction)
      this.calculateVertexMatrix()
    }, [reduction])

    return [reduction, setReduction]
  }

  useShowMirror(
    initialShowMirror: boolean
  ): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
    const [showMirror, setShowMirror] = useState(initialShowMirror)
    useEffect(() => {
      this.setShowMirror(showMirror)
      this.calculateVertexMatrix()
    }, [showMirror])

    return [showMirror, setShowMirror]
  }

  calculateVertexMatrix(): void {
    this.initialMatrix = calcNGonVertices(this.verticesAmount)

    const jumpedMatrix = calcJumpedMatrix(this.initialMatrix, ...this.jumps)

    this.verticesMatrix = calcSpiral(
      jumpedMatrix,
      this.reduction,
      this.showMirror
    )
    this.setLineDensity(this.verticesMatrix.length)
  }
}
