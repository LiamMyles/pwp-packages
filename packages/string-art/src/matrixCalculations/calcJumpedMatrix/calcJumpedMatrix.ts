import type { VerticesMatrix } from "MatrixCalculations/types"

export function calcJumpedMatrix(
  initialVertices: VerticesMatrix[],
  ...jumps: number[]
): VerticesMatrix[] {
  if (jumps.length !== 0) {
    let lastValue = 0
    const jumpedMatrix = [
      ...Array(initialVertices.length * jumps.length - 1),
    ].map((_, index) => {
      const currentJump = index % jumps.length
      const newValue = jumps[currentJump] + lastValue

      lastValue = newValue
      return initialVertices[newValue % initialVertices.length]
    })

    jumpedMatrix.unshift(initialVertices[0])

    return jumpedMatrix
  } else {
    return initialVertices
  }
}
