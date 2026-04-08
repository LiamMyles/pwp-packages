import type { VerticesMatrix } from "MatrixCalculations/types"

export function calcSpiral(
  verts: VerticesMatrix[],
  reduction: number,
  isMirrored = false
): VerticesMatrix[] {
  const loopSize = isMirrored ? reduction * 2 : reduction

  const results = [...Array(loopSize + 1)].map((_, index) => {
    const { x, y } = verts[index % verts.length]
    return { x: x * (1 - index / reduction), y: y * (1 - index / reduction) }
  })

  return results
}
