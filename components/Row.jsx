import Tile from "./Tile"

function Row({ row, colors, rowIndex, shakeRow }) {
  return (
    <div className={`row ${shakeRow === rowIndex ? "shake" : ""}`}>
      {row.map((cell, cellIndex) => (
        <div
          key={cellIndex}
          className={`cell ${colors?.[cellIndex] ? "flip" : ""}`}
          style={{
            backgroundColor: colors?.[cellIndex] || ""
          }}
        >
          {cell}
        </div>
      ))}
    </div>
  )
}

export default Row