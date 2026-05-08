function Tile({letter, color}) {
  return (
    <div className={`cell ${color ? "flip " + color : ""}`}>
      {letter}
    </div>
  )
}

export default Tile