import type { NGonMetadata } from "MatrixCalculations/calcLineDensity"

export interface Vertices {
  x: number
  y: number
}

export interface NGonInputs {
  vertices: number
  subdivisions: number
  jumps: number[]
  points: number
}

export interface INGonBuilderPublic {
  getNGonMetadata(): NGonMetadata
  getVerticesMatrix(): Vertices[]
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
