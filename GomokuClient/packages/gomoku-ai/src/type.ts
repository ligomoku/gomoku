export type Turn = 1 | 2

export type Square = 0 | 1 | 2

export type Board = Square[][]

export interface Position {
  x: number
  y: number
}

export interface ClientPos {
  clientX: number
  clientY: number
}

export type Move = Position & { potential: number }

export type PotentialGrid = number[][][]

export type Engine =
  | "basicOne"
  | "basicTwo"
  | "pvsOne"
  | "pvsTwo"
  | "defensiveOne"

export type Versus = "humanAi" | "aiHuman" | "humanHuman" | "aiAi"

export interface GomokuEngine {
  getMove(shouldStop: () => boolean): GetMoveOutput
}

export interface GetMoveOutput {
  gameover: boolean
  moveArray: Position[]
  proceedings: {
    stopped: boolean
    examinedMoveCount: number
  }
}

export interface GomokuInitProp {
  turn: Turn
  moveHistory: Position[]
  board?: Board
  gameoverRef?: { current: boolean }
  bestMoveArray?: Position[]
  potentialGrid?: PotentialGrid
}

export interface GomokuBasicEngine extends GomokuEngine {
  init(prop: GomokuInitProp): GomokuBasicEngine
  processBoard(): GomokuBasicEngine
  aiProcessing(): GomokuBasicEngine
  get(): {
    gameoverRef: { current: boolean }
    bestMoveArray: Position[]
    potentialGrid: PotentialGrid
  }
}

export interface GomokuPvsOptionObject {
  basicEngine: GomokuBasicEngine
  moveHistory: Position[]
  depthDampeningFactor?: number
  dynamicLimit?: (depth: number, halfMoveCount: number) => number
}

export interface GomokuConfig {
  engine: Engine
  secondEngine: "same" | Engine
  versus: Versus
  timeout: number
  maximumThinkingTime: number
  dark: boolean
  playerColors: string
  highlightColors: string
  game: string
}
