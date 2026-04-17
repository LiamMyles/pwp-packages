import type { NGonMetadata } from "MatrixCalculations/calcLineDensity"

export interface Vertex {
  x: number
  y: number
}

export type VerticesMatrix = Vertex[]

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

export interface NGonInputs {
  vertices: number
  subdivisions: number
  jumps: number[]
  points: number
}

export interface INGonBuilderPublic {
  getNGonMetadata(): NGonMetadata
  getVerticesMatrix(): VerticesMatrix
}

export interface INGonVertices {
  vertices: number
  setVertices(count: number): void
}

export interface INGonJumps {
  jumps: number[]
  setJumps(jumps: number[]): void
}

export interface INGonSubdivided {
  subdivisions: number
  points: number
  setSubdivisions(subdivisions: number): void
  setPoints(points: number): void
}

export interface INGonSpirals {
  reduction: number
  showMirror: boolean
  setReduction(reduction: number): void
  setShowMirror(showMirror: boolean): void
}
