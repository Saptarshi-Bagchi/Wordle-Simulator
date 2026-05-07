function Tile({letter, color}) {
  return (
    <div
      className={`cell ${color ? "flip" : ""}`}
      style={{
        backgroundColor: color
      }}
    >
      {letter}
    </div>
  )
}

export default Tile