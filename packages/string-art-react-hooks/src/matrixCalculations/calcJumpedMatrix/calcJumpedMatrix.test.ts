import { calcJumpedMatrix } from "MatrixCalculations/calcJumpedMatrix"
import type { VerticesMatrix } from "MatrixCalculations/types"

describe("getJumpedPoints", () => {
  it("should return passed points if no jumps exist", () => {
    const initialVertices: VerticesMatrix[] = [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 0 },
    ]

    const actual = calcJumpedMatrix(initialVertices)

    expect(actual).toEqual(initialVertices)
  })
  describe("2 jumps", () => {
    describe("first jump 1", () => {
      it("should return correct list for second jump 1", () => {
        const initialVertices: VerticesMatrix[] = [
          { x: 0, y: 1 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 0, y: 0 },
        ]

        const expectedVertices: VerticesMatrix[] = [
          { x: 0, y: 1 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 0, y: 0 },
        ]
        const actualVertices = calcJumpedMatrix(initialVertices, 1, 1)

        expect(actualVertices[0]).toEqual({ x: 0, y: 1 })
        expect(actualVertices[0]).toEqual(expectedVertices[0])
        expect(actualVertices[1]).toEqual(expectedVertices[1])
        expect(actualVertices[2]).toEqual(expectedVertices[2])
        expect(actualVertices[3]).toEqual(expectedVertices[3])
        expect(actualVertices[4]).toEqual(expectedVertices[4])
        expect(actualVertices[5]).toEqual(expectedVertices[5])
        expect(actualVertices[6]).toEqual(expectedVertices[6])
        expect(actualVertices[7]).toEqual(expectedVertices[7])
      })

      it("should return correct list for second jump 2", () => {
        const initialVertices: VerticesMatrix[] = [
          { x: 0, y: 1 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 0, y: 0 },
        ]

        const expectedVertices: VerticesMatrix[] = [
          { x: 0, y: 1 },
          { x: 1, y: 0 },
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 1, y: 1 },
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
        ]
        const actualVertices = calcJumpedMatrix(initialVertices, 1, 2)

        expect(actualVertices[0]).toEqual({ x: 0, y: 1 })
        expect(actualVertices[0]).toEqual(expectedVertices[0])
        expect(actualVertices[1]).toEqual(expectedVertices[1])
        expect(actualVertices[2]).toEqual(expectedVertices[2])
        expect(actualVertices[3]).toEqual(expectedVertices[3])
        expect(actualVertices[4]).toEqual(expectedVertices[4])
        expect(actualVertices[5]).toEqual(expectedVertices[5])
        expect(actualVertices[6]).toEqual(expectedVertices[6])
        expect(actualVertices[7]).toEqual(expectedVertices[7])
      })

      it("should return correct list for second jump 3", () => {
        const initialVertices: VerticesMatrix[] = [
          { x: 0, y: 1 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 0, y: 0 },
        ]

        const expectedVertices: VerticesMatrix[] = [
          { x: 0, y: 1 },
          { x: 1, y: 0 },
          { x: 0, y: 1 },
          { x: 1, y: 0 },
          { x: 0, y: 1 },
          { x: 1, y: 0 },
          { x: 0, y: 1 },
          { x: 1, y: 0 },
        ]
        const actualVertices = calcJumpedMatrix(initialVertices, 1, 3)

        expect(actualVertices[0]).toEqual({ x: 0, y: 1 })
        expect(actualVertices[0]).toEqual(expectedVertices[0])
        expect(actualVertices[1]).toEqual(expectedVertices[1])
        expect(actualVertices[2]).toEqual(expectedVertices[2])
        expect(actualVertices[3]).toEqual(expectedVertices[3])
        expect(actualVertices[4]).toEqual(expectedVertices[4])
        expect(actualVertices[5]).toEqual(expectedVertices[5])
        expect(actualVertices[6]).toEqual(expectedVertices[6])
        expect(actualVertices[7]).toEqual(expectedVertices[7])
      })
      it("should return correct list for second jump 4", () => {
        const initialVertices: VerticesMatrix[] = [
          { x: 0, y: 1 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 0, y: 0 },
        ]

        const expectedVertices: VerticesMatrix[] = [
          { x: 0, y: 1 },
          { x: 1, y: 0 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 1, y: 1 },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 0, y: 1 },
        ]
        const actualVertices = calcJumpedMatrix(initialVertices, 1, 4)

        expect(actualVertices[0]).toEqual({ x: 0, y: 1 })
        expect(actualVertices[0]).toEqual(expectedVertices[0])
        expect(actualVertices[1]).toEqual(expectedVertices[1])
        expect(actualVertices[2]).toEqual(expectedVertices[2])
        expect(actualVertices[3]).toEqual(expectedVertices[3])
        expect(actualVertices[4]).toEqual(expectedVertices[4])
        expect(actualVertices[5]).toEqual(expectedVertices[5])
        expect(actualVertices[6]).toEqual(expectedVertices[6])
        expect(actualVertices[7]).toEqual(expectedVertices[7])
      })
    })
    describe("first jump 2", () => {
      it("should return correct list for second jump 1", () => {
        const initialVertices: VerticesMatrix[] = [
          { x: 0, y: 1 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 0, y: 0 },
        ]

        const expectedVertices: VerticesMatrix[] = [
          { x: 0, y: 1 },
          { x: 1, y: 1 },
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 0, y: 1 },
          { x: 1, y: 0 },
          { x: 0, y: 0 },
        ]
        const actualVertices = calcJumpedMatrix(initialVertices, 2, 1)

        expect(actualVertices[0]).toEqual({ x: 0, y: 1 })
        expect(actualVertices[0]).toEqual(expectedVertices[0])
        expect(actualVertices[1]).toEqual(expectedVertices[1])
        expect(actualVertices[2]).toEqual(expectedVertices[2])
        expect(actualVertices[3]).toEqual(expectedVertices[3])
        expect(actualVertices[4]).toEqual(expectedVertices[4])
        expect(actualVertices[5]).toEqual(expectedVertices[5])
        expect(actualVertices[6]).toEqual(expectedVertices[6])
        expect(actualVertices[7]).toEqual(expectedVertices[7])
      })

      it("should return correct list for second jump 2", () => {
        const initialVertices: VerticesMatrix[] = [
          { x: 0, y: 1 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 0, y: 0 },
        ]

        const expectedVertices: VerticesMatrix[] = [
          { x: 0, y: 1 },
          { x: 1, y: 1 },
          { x: 0, y: 1 },
          { x: 1, y: 1 },
          { x: 0, y: 1 },
          { x: 1, y: 1 },
          { x: 0, y: 1 },
          { x: 1, y: 1 },
        ]
        const actualVertices = calcJumpedMatrix(initialVertices, 2, 2)

        expect(actualVertices[0]).toEqual({ x: 0, y: 1 })
        expect(actualVertices[0]).toEqual(expectedVertices[0])
        expect(actualVertices[1]).toEqual(expectedVertices[1])
        expect(actualVertices[2]).toEqual(expectedVertices[2])
        expect(actualVertices[3]).toEqual(expectedVertices[3])
        expect(actualVertices[4]).toEqual(expectedVertices[4])
        expect(actualVertices[5]).toEqual(expectedVertices[5])
        expect(actualVertices[6]).toEqual(expectedVertices[6])
        expect(actualVertices[7]).toEqual(expectedVertices[7])
      })
      it("should return correct list for second jump 3", () => {
        const initialVertices: VerticesMatrix[] = [
          { x: 0, y: 1 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 0, y: 0 },
        ]

        const expectedVertices: VerticesMatrix[] = [
          { x: 0, y: 1 },
          { x: 1, y: 1 },
          { x: 1, y: 0 },
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 0, y: 1 },
          { x: 0, y: 0 },
          { x: 1, y: 0 },
        ]
        const actualVertices = calcJumpedMatrix(initialVertices, 2, 3)

        expect(actualVertices[0]).toEqual({ x: 0, y: 1 })
        expect(actualVertices[0]).toEqual(expectedVertices[0])
        expect(actualVertices[1]).toEqual(expectedVertices[1])
        expect(actualVertices[2]).toEqual(expectedVertices[2])
        expect(actualVertices[3]).toEqual(expectedVertices[3])
        expect(actualVertices[4]).toEqual(expectedVertices[4])
        expect(actualVertices[5]).toEqual(expectedVertices[5])
        expect(actualVertices[6]).toEqual(expectedVertices[6])
        expect(actualVertices[7]).toEqual(expectedVertices[7])
      })

      it("should return correct list for second jump 4", () => {
        const initialVertices: VerticesMatrix[] = [
          { x: 0, y: 1 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 0, y: 0 },
        ]

        const expectedVertices: VerticesMatrix[] = [
          { x: 0, y: 1 },
          { x: 1, y: 1 },
          { x: 1, y: 1 },
          { x: 0, y: 1 },
          { x: 0, y: 1 },
          { x: 1, y: 1 },
          { x: 1, y: 1 },
          { x: 0, y: 1 },
        ]
        const actualVertices = calcJumpedMatrix(initialVertices, 2, 4)

        expect(actualVertices[0]).toEqual({ x: 0, y: 1 })
        expect(actualVertices[0]).toEqual(expectedVertices[0])
        expect(actualVertices[1]).toEqual(expectedVertices[1])
        expect(actualVertices[2]).toEqual(expectedVertices[2])
        expect(actualVertices[3]).toEqual(expectedVertices[3])
        expect(actualVertices[4]).toEqual(expectedVertices[4])
        expect(actualVertices[5]).toEqual(expectedVertices[5])
        expect(actualVertices[6]).toEqual(expectedVertices[6])
        expect(actualVertices[7]).toEqual(expectedVertices[7])
      })
    })
  })

  describe("1 total jumps", () => {
    it("should return correct list for 1 jump", () => {
      const initialVertices: VerticesMatrix[] = [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 0 },
      ]

      const expectedVertices: VerticesMatrix[] = [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 0 },
      ]
      const actualVertices = calcJumpedMatrix(initialVertices, 1)

      expect(actualVertices[0]).toEqual({ x: 0, y: 1 })
      expect(actualVertices[0]).toEqual(expectedVertices[0])
      expect(actualVertices[1]).toEqual(expectedVertices[1])
      expect(actualVertices[2]).toEqual(expectedVertices[2])
      expect(actualVertices[3]).toEqual(expectedVertices[3])
    })

    it("should return correct list for 2 jump", () => {
      const initialVertices: VerticesMatrix[] = [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 0 },
      ]

      const expectedVertices: VerticesMatrix[] = [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ]
      const actualVertices = calcJumpedMatrix(initialVertices, 2)

      expect(actualVertices[0]).toEqual({ x: 0, y: 1 })
      expect(actualVertices[0]).toEqual(expectedVertices[0])
      expect(actualVertices[1]).toEqual(expectedVertices[1])
      expect(actualVertices[2]).toEqual(expectedVertices[2])
      expect(actualVertices[3]).toEqual(expectedVertices[3])
    })

    it("should return correct list for 3 jump", () => {
      const initialVertices: VerticesMatrix[] = [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 0 },
      ]

      const expectedVertices: VerticesMatrix[] = [
        { x: 0, y: 1 },
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 0 },
      ]
      const actualVertices = calcJumpedMatrix(initialVertices, 3)

      expect(actualVertices[0]).toEqual({ x: 0, y: 1 })
      expect(actualVertices[0]).toEqual(expectedVertices[0])
      expect(actualVertices[1]).toEqual(expectedVertices[1])
      expect(actualVertices[2]).toEqual(expectedVertices[2])
      expect(actualVertices[3]).toEqual(expectedVertices[3])
    })

    it("should return correct list for 4 jump", () => {
      const initialVertices: VerticesMatrix[] = [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 0 },
      ]

      const expectedVertices: VerticesMatrix[] = [
        { x: 0, y: 1 },
        { x: 0, y: 1 },
        { x: 0, y: 1 },
        { x: 0, y: 1 },
      ]
      const actualVertices = calcJumpedMatrix(initialVertices, 4)

      expect(actualVertices[0]).toEqual({ x: 0, y: 1 })
      expect(actualVertices[0]).toEqual(expectedVertices[0])
      expect(actualVertices[1]).toEqual(expectedVertices[1])
      expect(actualVertices[2]).toEqual(expectedVertices[2])
      expect(actualVertices[3]).toEqual(expectedVertices[3])
    })
  })

  it.each`
    jumps            | vertices
    ${[1, 2, 3, 4]}  | ${[{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 0 }]}
    ${[1, 6, 3, 10]} | ${[{ x: 1, y: 2 }, { x: 3, y: 4 }, { x: 2, y: 3 }, { x: 0, y: 0 }, { x: 2, y: 3 }]}
    ${[1, 2, 3, 4]}  | ${[{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 0 }]}
    ${[1, 2, 3, 4]}  | ${[{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 0 }]}
  `("should match assortment of options", ({ jumps, vertices }) => {
    expect(calcJumpedMatrix(vertices, ...jumps)).toMatchSnapshot()
  })
})
