import Row from "./Row"

function Board({ board, colors, shakeRow }) {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <Row
            key={rowIndex}
            row={row}
            colors={colors[rowIndex]}
            rowIndex={rowIndex}
            shakeRow={shakeRow}
        />
      ))}
    </div>
  )
}

export default Board