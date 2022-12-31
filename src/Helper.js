const MOVE_DIRECTIONS = ["up", "down", "left", "right"]

export default class Helper {
  /**
   * Returns random int number between [min and max] both including
   * @param min number
   * @param max number
   * @returns number between min and max
   */
  static randomFromRange = (min, max) =>
    min + Math.floor(Math.random() * (max - min + 1))

  /**
   * Deep compare of two matrices
   * @param {Array<number[]>} m1
   * @param {Array<number[]>} m2
   * @returns boolean
   */
  static compareMatrices(m1, m2) {
    if (m1.length !== m2.length) return false
    for (let i = 0; i < m1.length; i++)
      if (m1[i][0] !== m2[i][0] || m1[i][1] !== m2[i][1]) return false
    return true
  }

  /**
   * Generates sorted matrix of given size
   * @param {number} size size of the matrix
   * @returns new sorted matrix
   */
  static generateMatrix(size) {
    return Array(size * size)
      .fill(0)
      .map((_, index) => [Math.floor(index / size), index % size])
  }

  static canMoveTile(board, index) {
    if (index < 0 || index >= board.length - 1) return false

    const tilePos = board[index]
    const emptyPos = board[board.length - 1]
    if (tilePos[0] === emptyPos[0])
      return Math.abs(tilePos[1] - emptyPos[1]) === 1
    else if (tilePos[1] === emptyPos[1])
      return Math.abs(tilePos[0] - emptyPos[0]) === 1
    else return false
  }

  static moveTile(board, index) {
    if (!Helper.canMoveTile(board, index)) return board

    const emptyPosition = [...board[board.length - 1]]
    const tilePosition = [...board[index]]

    let boardAfterMove = [...board]
    boardAfterMove[board.length - 1] = tilePosition
    boardAfterMove[index] = emptyPosition

    return boardAfterMove
  }

  static moveInDirection(board, dir) {
    const epos = board[board.length - 1]
    const posToMove =
      dir === "up"
        ? [epos[0] + 1, epos[1]]
        : dir === "down"
        ? [epos[0] - 1, epos[1]]
        : dir === "left"
        ? [epos[0], epos[1] + 1]
        : dir === "right"
        ? [epos[0], epos[1] - 1]
        : epos

    const tileToMove = board.findIndex(
      (t) => t[0] === posToMove[0] && t[1] === posToMove[1]
    )

    return Helper.moveTile(board, tileToMove)
  }

  /**
   * Shuffles matrix without loosing an order
   * @param {Array<number[]>} board game board (2d matrix)
   * @param {number[]} movesRange range of moves [minNumberOfMoves, maxNumberOfMoves]
   * @param {number} epos index of the empty tile
   * @returns shuffled matrix
   */
  static shuffleMatrix(board, movesRange) {
    const shuffleMoves = Helper.randomFromRange(...movesRange)
    let shuffledBoard = board
    for (let i = 0; i <= shuffleMoves; i++) {
      const randomDirection = MOVE_DIRECTIONS[Helper.randomFromRange(0, 3)]
      shuffledBoard = Helper.moveInDirection(shuffledBoard, randomDirection)
    }
    return shuffledBoard
  }

  /**
   * Checks whether the tile suits the correct position in solved board
   * @param {number} index index of the checking tile
   * @param {Array<number[]>} board current state of the board
   * @param {Array<number[]>} solvedBoard ideal solved board
   * @returns boolean true or false
   */
  static checkTileRight(index, board, solvedBoard) {
    return (
      board[index][0] === solvedBoard[index][0] &&
      board[index][1] === solvedBoard[index][1]
    )
  }
}
