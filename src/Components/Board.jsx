import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"

import { Tile } from "./Tile"
import { RestartBtn } from "./RestartBtn"

import { moveTile, startNewGame } from "../app/slices/game/gameSlice"
import Helper from "../Helper"

const computeLength = (len) => Math.sqrt(len) * 90

const Board = () => {
  const dispatch = useDispatch()
  // bg / neu
  const [boardStyle, setBoardStyle] = useState("neu")

  const { board, solvedBoard, isSolved } = useSelector((state) => state.game)
  const handleMoveTile = (i) => dispatch(moveTile(i))
  const restartGame = () => dispatch(startNewGame())

  const len = computeLength(board.length)

  return (
    <>
      <div
        className={`board-${boardStyle} rad-shadow`}
        style={{
          width: `${len}px`,
          height: `${len}px`,
        }}
      >
        {board.slice(0, -1).map((pos, index) => {
          const isTileRight = Helper.checkTileRight(index, board, solvedBoard)

          return (
            <Tile
              index={index}
              key={pos}
              pos={pos}
              onClick={() => handleMoveTile(index)}
              isRight={isTileRight}
              gap={14}
              boardStyle={boardStyle}
            />
          )
        })}
        {isSolved && (
          <div
            className="overlay"
            style={{
              width: `${len}px`,
              height: `${len}px`,
            }}
          >
            <RestartBtn onClick={restartGame} />
          </div>
        )}
      </div>
      <RestartBtn onClick={restartGame} />
    </>
  )
}

export default Board
