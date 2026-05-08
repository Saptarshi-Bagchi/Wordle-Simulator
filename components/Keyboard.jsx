const ROWS = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["ENTER","Z","X","C","V","B","N","M","BACK"],
]

const KEY_LABELS = {
  ENTER: "ENTER",
  BACK: "⌫",
}

function Keyboard({ handleKeyPress, keyColors }) {
  return (
    <div className="keyboard">
      {ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => {
            const color = keyColors[key] || ""
            const isWide = key === "ENTER" || key === "BACK"
            return (
              <button
                key={key}
                className={`keyboard-key ${color}${isWide ? " wide" : ""}`}
                onClick={() => handleKeyPress(key)}
              >
                {KEY_LABELS[key] ?? key}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Keyboard