import _reverse from "lodash.reverse"
import type { VerticesMatrix } from "MatrixCalculations/types"

export function calcNGonVertices(vertices: number): VerticesMatrix[] {
  const twoPi = Math.PI * 2
  const angleBetweenPoints = twoPi / vertices

  let currentAngle = 0 - angleBetweenPoints

  const initialVertices = [...Array(vertices)].map(() => {
    currentAngle += angleBetweenPoints
    const cos = Math.cos(currentAngle)
    const sin = Math.sin(currentAngle)
    const y = cos
    const x = sin

    return { x, y }
  })

  const firstItem = initialVertices[0]
  const array = _reverse(initialVertices)
  array.unshift(firstItem)
  array.pop()
  return array
}
