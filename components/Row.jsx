import Tile from "./Tile"

function Row({ row, colors, rowIndex, shakeRow }) {
  return (
    <div className={`row ${shakeRow === rowIndex ? "shake" : ""}`}>
      {row.map((cell, cellIndex) => (
        <Tile
          key={cellIndex}
          letter={cell}
          color={colors?.[cellIndex] || ""}
        />
      ))}
    </div>
  )
}

export default Row