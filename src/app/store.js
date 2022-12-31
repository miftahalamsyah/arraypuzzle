import { configureStore } from "@reduxjs/toolkit"

import gameReducer from "./slices/game/gameSlice"

export default configureStore({
  reducer: {
    game: gameReducer,
  },
})
