import { calcJumpedMatrix } from "MatrixCalculations/calcJumpedMatrix"
import { calcNGonVertices } from "MatrixCalculations/calcNGonVertices"
import { calcSpiral } from "MatrixCalculations/calcSpiral"

import type {
  INGonJumps,
  INGonSpirals,
  INGonVertices,
  NGonInputs,
  VerticesMatrix,
} from "CommonTypes"
import { NGonBase } from "PolygonBuilders/nGonBase"

export class NGonSpirals
  extends NGonBase
  implements INGonVertices, INGonJumps, INGonSpirals
{
  jumps: number[]
  vertices: number
  reduction: number
  showMirror: boolean
  initialMatrix: VerticesMatrix = [{ x: 0, y: 0 }]

  constructor({
    vertices,
    reduction,
    jumps,
    showMirror,
  }: Pick<NGonInputs, "vertices" | "jumps"> & {
    reduction: number
    showMirror: boolean
  }) {
    super()

    this.jumps = jumps
    this.vertices = vertices
    this.reduction = reduction
    this.showMirror = showMirror
  }
  setReduction(reduction: number): void {
    this.reduction = reduction
    this.requireRecalculate()
  }

  setShowMirror(showMirror: boolean): void {
    this.showMirror = showMirror
    this.requireRecalculate()
  }

  setJumps(jumps: number[]): void {
    this.jumps = jumps
    this.requireRecalculate()
  }

  setVertices(count: number): void {
    this.vertices = count
    this.requireRecalculate()
  }

  protected calculateMetadata() {
    return {
      lineDensity: this.verticesMatrix.length - 1,
      subdivisionCommonFactor: 0,
      verticesCommonFactor: 0,
    }
  }
  protected calculateVertices() {
    const initialMatrix = calcNGonVertices(this.vertices)
    const jumpedMatrix = calcJumpedMatrix(initialMatrix, ...this.jumps)

    return calcSpiral(jumpedMatrix, this.reduction, this.showMirror)
  }
}
