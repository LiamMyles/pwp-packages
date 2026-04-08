export interface VerticesMatrix {
  x: number
  y: number
}
// Vertices, Subdivisions, Points
export interface VSP {
  vertices: number
  subdivisions: number
  points: number
}

// Vertices, Subdivisions, Points, Jumps
export interface VSPJ extends VSP {
  jumps: number[]
}
