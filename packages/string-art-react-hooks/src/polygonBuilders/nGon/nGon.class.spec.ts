import { NGon } from "."

describe("NGon Class", () => {
  it("should start with correct defaults", () => {
    const NGonInstance = new NGon()

    expect(NGonInstance.verticesAmount).toEqual(0)
    expect(NGonInstance.verticesMatrix).toEqual([])
  })
  it("should update correct values when setVertices is set", () => {
    const NGonInstance = new NGon()

    NGonInstance.setVertices(4)
    NGonInstance.calculateVertexMatrix()

    expect(NGonInstance.verticesAmount).toEqual(4)
    expect(NGonInstance.verticesMatrix.length).toEqual(4)
    expect(NGonInstance.verticesMatrix).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          x: expect.any(Number),
          y: expect.any(Number),
        }),
      ])
    )
  })
  it("should overwrite old values with new correct values when setVertices is called again", () => {
    const NGonInstance = new NGon()

    NGonInstance.setVertices(4)
    NGonInstance.calculateVertexMatrix()

    expect(NGonInstance.verticesAmount).toEqual(4)
    expect(NGonInstance.verticesMatrix.length).toEqual(4)
    expect(NGonInstance.verticesMatrix).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          x: expect.any(Number),
          y: expect.any(Number),
        }),
      ])
    )

    NGonInstance.setVertices(2)
    NGonInstance.calculateVertexMatrix()

    expect(NGonInstance.verticesAmount).toEqual(2)
    expect(NGonInstance.verticesMatrix.length).toEqual(2)
    expect(NGonInstance.verticesMatrix).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          x: expect.any(Number),
          y: expect.any(Number),
        }),
      ])
    )
  })
})
