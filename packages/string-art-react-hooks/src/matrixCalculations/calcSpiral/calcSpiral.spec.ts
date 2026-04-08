import { calcNGonVertices } from "MatrixCalculations/calcNGonVertices"
import { calcSpiral } from "MatrixCalculations/calcSpiral"

describe("getSpirals", () => {
  describe("NOT Mirrored", () => {
    it.each`
      vertices | reduction
      ${1}     | ${1}
      ${8}     | ${5}
      ${10}    | ${20}
      ${12}    | ${200}
      ${30}    | ${500}
    `(
      "should end roughly in the middle with $vertices vertices and $reduction reduction",
      ({ vertices, reduction }) => {
        const nGonVertices = calcNGonVertices(vertices)
        const actualSpirals = calcSpiral(nGonVertices, reduction)

        expect(actualSpirals[0]).toEqual({ x: 0, y: 1 })
        expect(actualSpirals[actualSpirals.length - 1].x).toBeLessThanOrEqual(
          0.00001
        )
        expect(actualSpirals[actualSpirals.length - 1].y).toBeLessThanOrEqual(1)

        expect(actualSpirals.length).toEqual(reduction + 1)
      }
    )

    it("should match expected output", () => {
      const nGonVertices = calcNGonVertices(12)
      const actualSpirals = calcSpiral(nGonVertices, 20)

      expect(actualSpirals).toMatchInlineSnapshot(`
        Array [
          Object {
            "x": 0,
            "y": 1,
          },
          Object {
            "x": -0.47499999999999964,
            "y": 0.8227241335952168,
          },
          Object {
            "x": -0.7794228634059948,
            "y": 0.4500000000000001,
          },
          Object {
            "x": -0.85,
            "y": -1.5614246689128752e-16,
          },
          Object {
            "x": -0.6928203230275508,
            "y": -0.40000000000000036,
          },
          Object {
            "x": -0.37499999999999956,
            "y": -0.6495190528383292,
          },
          Object {
            "x": 3.9658772283535854e-16,
            "y": -0.7,
          },
          Object {
            "x": 0.32500000000000023,
            "y": -0.562916512459885,
          },
          Object {
            "x": 0.5196152422706632,
            "y": -0.2999999999999999,
          },
          Object {
            "x": 0.55,
            "y": 3.367778697655222e-17,
          },
          Object {
            "x": 0.4330127018922193,
            "y": 0.25000000000000006,
          },
          Object {
            "x": 0.22499999999999995,
            "y": 0.3897114317029974,
          },
          Object {
            "x": 0,
            "y": 0.4,
          },
          Object {
            "x": -0.17499999999999988,
            "y": 0.30310889132455354,
          },
          Object {
            "x": -0.2598076211353316,
            "y": 0.15000000000000005,
          },
          Object {
            "x": -0.25,
            "y": -4.592425496802574e-17,
          },
          Object {
            "x": -0.17320508075688765,
            "y": -0.10000000000000006,
          },
          Object {
            "x": -0.07499999999999991,
            "y": -0.12990381056766587,
          },
          Object {
            "x": 5.665538897647978e-17,
            "y": -0.09999999999999998,
          },
          Object {
            "x": 0.02500000000000004,
            "y": -0.04330127018922196,
          },
          Object {
            "x": 0,
            "y": -0,
          },
        ]
      `)
    })
  })
  describe("Mirrored", () => {
    it.each`
      vertices | reduction
      ${1}     | ${1}
      ${8}     | ${5}
      ${10}    | ${21}
      ${12}    | ${221}
      ${33}    | ${511}
    `(
      "should end roughly in the middle with $vertices vertices and $reduction reduction",
      ({ vertices, reduction }) => {
        const nGonVertices = calcNGonVertices(vertices)
        const actualSpirals = calcSpiral(nGonVertices, reduction, true)

        expect(actualSpirals[0]).toEqual({ x: 0, y: 1 })
        expect(
          actualSpirals[Math.floor(actualSpirals.length / 2) - 1].x
        ).toBeLessThanOrEqual(0.00001)
        expect(
          actualSpirals[Math.floor(actualSpirals.length / 2) - 1].y
        ).toBeLessThanOrEqual(1)

        expect(actualSpirals.length).toEqual(reduction * 2 + 1)
      }
    )

    it("should match expected output", () => {
      const nGonVertices = calcNGonVertices(12)
      const actualSpirals = calcSpiral(nGonVertices, 20, true)

      expect(actualSpirals).toMatchInlineSnapshot(`
        Array [
          Object {
            "x": 0,
            "y": 1,
          },
          Object {
            "x": -0.47499999999999964,
            "y": 0.8227241335952168,
          },
          Object {
            "x": -0.7794228634059948,
            "y": 0.4500000000000001,
          },
          Object {
            "x": -0.85,
            "y": -1.5614246689128752e-16,
          },
          Object {
            "x": -0.6928203230275508,
            "y": -0.40000000000000036,
          },
          Object {
            "x": -0.37499999999999956,
            "y": -0.6495190528383292,
          },
          Object {
            "x": 3.9658772283535854e-16,
            "y": -0.7,
          },
          Object {
            "x": 0.32500000000000023,
            "y": -0.562916512459885,
          },
          Object {
            "x": 0.5196152422706632,
            "y": -0.2999999999999999,
          },
          Object {
            "x": 0.55,
            "y": 3.367778697655222e-17,
          },
          Object {
            "x": 0.4330127018922193,
            "y": 0.25000000000000006,
          },
          Object {
            "x": 0.22499999999999995,
            "y": 0.3897114317029974,
          },
          Object {
            "x": 0,
            "y": 0.4,
          },
          Object {
            "x": -0.17499999999999988,
            "y": 0.30310889132455354,
          },
          Object {
            "x": -0.2598076211353316,
            "y": 0.15000000000000005,
          },
          Object {
            "x": -0.25,
            "y": -4.592425496802574e-17,
          },
          Object {
            "x": -0.17320508075688765,
            "y": -0.10000000000000006,
          },
          Object {
            "x": -0.07499999999999991,
            "y": -0.12990381056766587,
          },
          Object {
            "x": 5.665538897647978e-17,
            "y": -0.09999999999999998,
          },
          Object {
            "x": 0.02500000000000004,
            "y": -0.04330127018922196,
          },
          Object {
            "x": 0,
            "y": -0,
          },
          Object {
            "x": -0.050000000000000044,
            "y": -3.061616997868386e-18,
          },
          Object {
            "x": -0.08660254037844393,
            "y": -0.05000000000000006,
          },
          Object {
            "x": -0.07499999999999994,
            "y": -0.12990381056766573,
          },
          Object {
            "x": -0,
            "y": -0.19999999999999996,
          },
          Object {
            "x": 0.12499999999999992,
            "y": -0.2165063509461097,
          },
          Object {
            "x": 0.2598076211353316,
            "y": -0.15000000000000005,
          },
          Object {
            "x": 0.3500000000000001,
            "y": 6.429395695523606e-17,
          },
          Object {
            "x": 0.3464101615137753,
            "y": 0.20000000000000012,
          },
          Object {
            "x": 0.2249999999999997,
            "y": 0.38971143170299755,
          },
          Object {
            "x": -2.83276944882399e-16,
            "y": 0.5,
          },
          Object {
            "x": -0.2750000000000002,
            "y": 0.4763139720814412,
          },
          Object {
            "x": -0.5196152422706632,
            "y": 0.29999999999999993,
          },
          Object {
            "x": -0.6499999999999999,
            "y": -3.980102097228897e-17,
          },
          Object {
            "x": -0.606217782649107,
            "y": -0.35000000000000003,
          },
          Object {
            "x": -0.37499999999999994,
            "y": -0.649519052838329,
          },
          Object {
            "x": -0,
            "y": -0.8,
          },
          Object {
            "x": 0.42499999999999977,
            "y": -0.7361215932167731,
          },
          Object {
            "x": 0.7794228634059946,
            "y": -0.45000000000000007,
          },
          Object {
            "x": 0.95,
            "y": 1.745121688784978e-16,
          },
          Object {
            "x": 0.8660254037844385,
            "y": 0.5000000000000004,
          },
        ]
      `)
    })
  })
})
