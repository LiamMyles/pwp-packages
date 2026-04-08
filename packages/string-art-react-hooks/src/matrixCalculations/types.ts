export interface VerticesMatrix {
  x: number
  y: number
}

export interface VSP {
  vertices: number
  subdivisions: number
  points: number
}

export interface VSPJ extends VSP {
  jumps: number[]
}
