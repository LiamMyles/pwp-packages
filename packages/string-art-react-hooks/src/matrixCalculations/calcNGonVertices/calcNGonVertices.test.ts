import { calcNGonVertices } from "MatrixCalculations/calcNGonVertices"

describe("getNGonVertices", () => {
  it.each`
    verticesCount
    ${1}
    ${2}
    ${3}
    ${4}
    ${5}
    ${6}
    ${7}
    ${8}
    ${9}
    ${10}
    ${11}
    ${12}
  `(
    "should start at x:0, y:1 for n-gon $verticesCount",
    ({ verticesCount }) => {
      const polygon = calcNGonVertices(verticesCount)

      expect(polygon[0]).toEqual({ x: 0, y: 1 })
    }
  )

  it.each`
    verticesCount
    ${1}
    ${2}
    ${3}
    ${4}
    ${5}
    ${6}
    ${7}
    ${8}
    ${9}
    ${10}
    ${11}
    ${12}
  `(
    "should create correct vertices for $verticesCount vertices",
    ({ verticesCount }) => {
      const polygon = calcNGonVertices(verticesCount)

      expect(polygon.length).toEqual(verticesCount)
    }
  )
})
