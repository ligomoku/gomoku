import {
  Board,
  GetMoveOutput,
  GomokuBasicEngine,
  GomokuEngine,
  GomokuPvsOptionObject,
  Move,
  Position,
  Turn,
} from "../../type"
import {
  compareNumberProperty,
  positionToString,
  readableScore,
} from "../../utils"

const comparePotential = compareNumberProperty("potential")

/**
 * @param turn whose player it is the turn of
 * @param board the state of the game to evaluate
 */
export class GomokuPvs implements GomokuEngine {
  basicEngine: GomokuBasicEngine
  depthDampeningFactor: number
  dynamicLimit: (depth: number, halfMoveCount: number) => number
  moveHistory: Position[]

  constructor(
    private board: Board,
    private turn: Turn,
    optionObject: GomokuPvsOptionObject,
  ) {
    this.basicEngine = optionObject.basicEngine
    this.depthDampeningFactor = optionObject.depthDampeningFactor ?? 0.5
    this.moveHistory = optionObject.moveHistory
    this.dynamicLimit =
      optionObject.dynamicLimit ??
      ((depth: number, halfMoveCount: number) =>
        depth === 0 ? 9 : Math.max(1, 2 + Math.min(halfMoveCount, 4) - depth))
  }

  init(prop: { turn: Turn; board?: Board }) {
    this.board = prop.board ?? this.board
    this.turn = prop.turn
    return this
  }

  getMove(shouldStop: () => boolean): GetMoveOutput {
    // Hard-coded solutions, for the first move
    // ...when playing first
    if (this.moveHistory.length === 0) {
      return this.basicEngine.getMove(shouldStop)
    }
    // ...when playing second
    if (this.moveHistory.length === 1) {
      let move = this.moveHistory[0]
      if (move.x > 0 && move.x < 18 && move.y > 0 && move.y < 18) {
        return {
          gameover: false,
          moveArray: [
            { x: move.x - 1, y: move.y },
            { x: move.x + 1, y: move.y },
            { x: move.x, y: move.y - 1 },
            { x: move.x, y: move.y + 1 },
          ],
          proceedings: { stopped: false, examinedMoveCount: 0 },
        }
      }
    }
    // End of hard-coded solutions
    // Detect friendly and enemy potential lines of five and react immediately to them

    let {
      bestMoveArray: preBestMoveArray,
      gameoverRef,
      potentialGrid,
    } = this.basicEngine
      .init({
        board: this.board,
        moveHistory: this.moveHistory,
        turn: this.turn,
      })
      .aiProcessing()
      .get()

    if (gameoverRef.current) {
      return {
        gameover: true,
        moveArray: [],
        proceedings: { stopped: false, examinedMoveCount: 0 },
      }
    }

    if (preBestMoveArray.length > 0) {
      let move = preBestMoveArray[0]
      let potential = potentialGrid[move.y][move.x]
      if (potential[0] > 0 || potential[1] > 0) {
        return {
          gameover: false,
          moveArray: preBestMoveArray,
          proceedings: { stopped: false, examinedMoveCount: 1 },
        }
      }
    }

    let bestMoveArray: Position[] = []
    let bestScore = -Infinity
    let bestPotential = 0

    let basicMoveArray = [] as Move[]
    let variation = ""
    let stopped = false
    let moveCount = 0

    let examinedMoveCountAtDepthZero = this.dynamicLimit(
      0,
      this.moveHistory.length,
    )
    let manager = this.getBoardManager(
      this.board,
      this.turn,
      examinedMoveCountAtDepthZero,
    )

    for (
      ;
      manager.next() === "continue" && moveCount < examinedMoveCountAtDepthZero;
      moveCount++
    ) {
      let score = -this.pvs(
        this.board,
        1,
        bestScore,
        Infinity,
        (3 - this.turn) as Turn,
      )

      let move = manager.getCurrentMove()
      basicMoveArray.push(move)
      if (new URLSearchParams(location.search).has("verbose")) {
        console.log(
          `[${"_●○"[this.turn]}]`,
          "move, potential, score",
          move && positionToString(move),
          move.potential,
          readableScore(score),
        )
      }
      if (score === bestScore && move.potential === bestPotential) {
        bestMoveArray.push(move)
      } else if (
        score > bestScore ||
        (score === bestScore && move.potential > bestPotential)
      ) {
        if (moveCount > 0) {
          variation = " --- variation"
        }
        bestScore = score
        bestPotential = move.potential
        bestMoveArray.splice(0, bestMoveArray.length, move)
      } else if (bestScore === Infinity && move.potential < bestPotential) {
        moveCount++
        break
      }
      if (shouldStop()) {
        stopped = true
        moveCount++
        break
      }
    }
    manager.reset()

    console.log(
      ...basicMoveArray.map(positionToString),
      `\n[${"_●○"[this.turn]}]${variation}`,
      ...bestMoveArray.map(positionToString),
      readableScore(bestScore),
    )

    return {
      gameover: false,
      moveArray: bestMoveArray,
      proceedings: {
        stopped,
        examinedMoveCount: moveCount,
      },
    }
  }

  pvs(board: Board, depth: number, alpha: number, beta: number, turn: Turn) {
    let limit = this.dynamicLimit(depth, this.moveHistory.length)
    let manager = this.getBoardManager(board, turn, limit)

    if (manager.isTerminal) {
      return -(2 ** 412)
    }

    const getScore = (nextAlpha: number) =>
      -this.pvs(board, depth + 1, nextAlpha, -alpha, (3 - turn) as Turn) *
      this.depthDampeningFactor

    for (let k = 0; k < limit; k++) {
      if (manager.next() === "stop") {
        break
      }

      let score: number
      if (k === 0) {
        // search with a **full** window
        score = getScore(-beta)
      } else {
        // search with a **null** window
        score = getScore(-alpha)
        if (alpha < score && score < beta) {
          // if it failed high, do a full re-search
          score = getScore(-beta)
        }
      }

      alpha = Math.max(alpha, score)
      if (alpha > beta) {
        break // beta cut-off
      }
    }
    manager.reset()

    return alpha
  }

  getMoveArray(board: Board, turn: Turn, limit: number) {
    let { potentialGrid, gameoverRef } = this.basicEngine
      .init({
        board,
        moveHistory: this.moveHistory,
        turn,
      })
      .processBoard()
      .get()

    if (gameoverRef.current) {
      return null
    }

    let positionArray: Move[] = []

    for (let y = 0; y < 19; y++) {
      for (let x = 0; x < 19; x++) {
        if (board[y][x] > 0) {
          continue
        }

        let potential = potentialGrid[y][x].reduce((res, v) => res * 100 + v, 0)
        positionArray.push({ x, y, potential })
      }
    }

    positionArray.sort(comparePotential)

    return positionArray.slice(-limit)
  }

  getBoardManager(board: Board, turn: Turn, limit: number) {
    let moveArray = this.getMoveArray(board, turn, limit)!
    if (moveArray === null || moveArray.length === 0) {
      return {
        isTerminal: true,
        next: () => "stop" as const,
        getCurrentMove: () => ({ x: -1, y: -1, potential: -1 }),
        reset: () => {},
      }
    }

    let move = moveArray[moveArray.length - 1]
    let index = moveArray.length
    const reset = () => {
      board[move.y][move.x] = 0
    }

    return {
      isTerminal: false,
      next: () => {
        board[move.y][move.x] = 0
        if (index === 0) {
          return "stop" as const
        }
        index--
        move = moveArray[index]
        board[move.y][move.x] = turn
        return "continue" as const
      },
      getCurrentMove: () => move,
      reset,
    }
  }
}
