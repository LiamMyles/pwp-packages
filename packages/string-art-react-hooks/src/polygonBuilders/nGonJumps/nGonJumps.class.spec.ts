import { NGonJumps } from "."

describe("NGon Class", () => {
  it("should inherit from nGon and start with correct defaults", () => {
    const NGonInstance = new NGonJumps()

    expect(NGonInstance.verticesAmount).toEqual(0)
    expect(NGonInstance.verticesMatrix).toEqual([])
    expect(NGonInstance.setVertices).toBeDefined()
    expect(NGonInstance.jumps).toEqual([])
  })

  it("should set jumps ", () => {
    const NGonInstance = new NGonJumps()

    NGonInstance.setVertices(4)
    NGonInstance.calculateVertexMatrix()

    expect(NGonInstance.verticesAmount).toEqual(4)
    expect(NGonInstance.verticesMatrix.length).toEqual(4)
    expect(NGonInstance.jumps).toEqual([])

    NGonInstance.setJumps([1, 2, 3])
    NGonInstance.calculateVertexMatrix()

    expect(NGonInstance.verticesAmount).toEqual(4)
    expect(NGonInstance.verticesMatrix.length).toEqual(12)
    expect(NGonInstance.jumps).toEqual([1, 2, 3])
  })

  it.todo("should handel errors when calling setJumps without vertices")
})
