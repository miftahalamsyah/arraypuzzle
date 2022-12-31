const Tile = ({ index, pos, onClick, gap, isRight, boardStyle }) => {
  const top = pos[0] * 85 + gap
  const left = pos[1] * 85 + gap

  return (
    <div
      className={`tile-${boardStyle} ${
        isRight && `tile_correct-${boardStyle}`
      }`}
      onClick={onClick}
      style={{ top, left }}
    >
      {index + 1}
    </div>
  )
}

export { Tile }
