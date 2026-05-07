const row1 = ["Q","W","E","R","T","Y","U","I","O","P"]
const row2 = ["A","S","D","F","G","H","J","K","L"]
const row3 = ["ENTER","Z","X","C","V","B","N","M","BACKSPACE"]

function Keyboard({ handleKeyPress, keyColors }) {
  return (
    <div className="keyboard">
      <div className="keyboard-row">
        {row1.map((key) => (
            <button 
                key={key} 
                onClick={() => handleKeyPress(key)} 
                style={{backgroundColor: keyColors[key]
            }}>
                {key}
            </button>
        ))}
      </div>
      <div className="keyboard-row">
        {row2.map((key) => (
            <button 
                key={key} 
                onClick={() => handleKeyPress(key)} 
                style={{backgroundColor: keyColors[key]
            }}>
                {key}
            </button>
        ))}
      </div>
      <div className="keyboard-row">
        {row3.map((key) => (
            <button 
                key={key} 
                onClick={() => handleKeyPress(key)} 
                style={{backgroundColor: keyColors[key]
            }}>
                {key}
            </button>
        ))}
      </div>
    </div>
  )
}

export default Keyboard