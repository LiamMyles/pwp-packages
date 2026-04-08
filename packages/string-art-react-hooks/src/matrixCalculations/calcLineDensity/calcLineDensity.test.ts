import { calcLineDensity } from "MatrixCalculations/calcLineDensity"

describe("getLineDensity", () => {
  it.each`
    vertices | subdivisions | points | expectedDensity | expectedSubdivisionCommonFactor | verticesCommonFactor
    ${9}     | ${2}         | ${3}   | ${6}            | ${3}                            | ${1}
    ${12}    | ${65}        | ${20}  | ${39}           | ${20}                           | ${1}
    ${30}    | ${12}        | ${45}  | ${8}            | ${45}                           | ${1}
    ${1}     | ${1}         | ${1}   | ${1}            | ${1}                            | ${1}
  `(
    "should return correct density for vertices:$vertices, subdivisions:$subdivisions, points:$points",
    ({
      vertices,
      subdivisions,
      points,
      expectedDensity,
      expectedSubdivisionCommonFactor,
      verticesCommonFactor,
    }) => {
      const {
        lineDensity: actualLineDensity,
        subdivisionCommonFactor: actualSubdivisionCommonFactor,
        verticesCommonFactor: actualVerticesCommonFactor,
      } = calcLineDensity({
        vertices,
        subdivisions,
        points,
        jumps: [],
      })
      expect(actualLineDensity).toEqual(expectedDensity)
      expect(actualSubdivisionCommonFactor).toEqual(
        expectedSubdivisionCommonFactor
      )
      expect(actualVerticesCommonFactor).toEqual(verticesCommonFactor)
    }
  )

  it.each`
    vertices | subdivisions | points | jumps        | expectedDensity | expectedSubdivisionCommonFactor | verticesCommonFactor
    ${9}     | ${2}         | ${3}   | ${[]}        | ${6}            | ${3}                            | ${1}
    ${9}     | ${2}         | ${3}   | ${[1, 1, 1]} | ${6}            | ${3}                            | ${3}
    ${9}     | ${2}         | ${3}   | ${[2, 2, 1]} | ${18}           | ${3}                            | ${1}
    ${12}    | ${65}        | ${20}  | ${[2, 2, 1]} | ${117}          | ${20}                           | ${1}
    ${30}    | ${12}        | ${45}  | ${[2]}       | ${4}            | ${45}                           | ${2}
    ${1}     | ${1}         | ${1}   | ${[1]}       | ${1}            | ${1}                            | ${1}
  `(
    "should return correct density and commonFactors for vertices:$vertices, subdivisions:$subdivisions, points:$points",
    ({
      vertices,
      subdivisions,
      points,
      jumps,
      expectedDensity,
      expectedSubdivisionCommonFactor,
      verticesCommonFactor,
    }) => {
      const {
        lineDensity: actualLineDensity,
        subdivisionCommonFactor: actualSubdivisionCommonFactor,
        verticesCommonFactor: actualVerticesCommonFactor,
      } = calcLineDensity({
        vertices,
        subdivisions,
        points,
        jumps,
      })

      expect(actualLineDensity).toEqual(expectedDensity)
      expect(actualSubdivisionCommonFactor).toEqual(
        expectedSubdivisionCommonFactor
      )
      expect(actualVerticesCommonFactor).toEqual(verticesCommonFactor)
    }
  )
})
