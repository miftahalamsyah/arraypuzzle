import { createSlice } from "@reduxjs/toolkit"

import Helper from "../../../Helper"

const DEFAULT_SIZE = 4
const DEFAULT_SHUFFLE_RANGE = [100, 120]
const solved = Helper.generateMatrix(DEFAULT_SIZE)
const shuffled = Helper.shuffleMatrix(solved, DEFAULT_SHUFFLE_RANGE)

const initialState = {
  size: DEFAULT_SIZE,
  moves: 0,
  board: shuffled,
  solvedBoard: solved,
  isSolved: false,
  shuffleMovesRange: DEFAULT_SHUFFLE_RANGE,
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startNewGame: (state) => {
      state.isSolved = false
      const solved = Helper.generateMatrix(state.size)

      state.moves = 0
      state.solvedBoard = solved
      state.board = Helper.shuffleMatrix(solved, state.shuffleMovesRange)
    },
    moveTile: (state, action) => {
      const index = action.payload
      state.board = Helper.moveTile(state.board, index)
      state.moves++

      if (Helper.compareMatrices(state.board, state.solvedBoard))
        state.isSolved = true
    },
    setBoardSize: (state, action) => {
      state.size = action.payload
      startNewGame(state)
    },
  },
})

export const { startNewGame, moveTile, setBoardSize } = gameSlice.actions
export default gameSlice.reducer
