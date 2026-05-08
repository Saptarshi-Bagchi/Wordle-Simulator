import './App.css'
import { useEffect, useCallback, useState } from "react"
import Board from "/components/Board"
import Keyboard from "/components/Keyboard"
import { words } from "./words"

function App() {

  const emptyBoard = () => [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]

  const [board, setBoard] = useState(emptyBoard())
  const [currentRow, setCurrentRow] = useState(0)
  const [currentCol, setCurrentCol] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [message, setMessage] = useState("")
  const [shakeRow, setShakeRow] = useState(null)
  const [locked, setLocked] = useState(false)
  const [colors, setColors] = useState(emptyBoard())
  const [keyColors, setKeyColors] = useState({})
  const [usedWords, setUsedWords] = useState([])
  const [guessedThisRound, setGuessedThisRound] = useState([])

  const pickNewWord = (exclude) => {
    const remaining = words.filter(w => !exclude.includes(w))
    const pool = remaining.length > 0 ? remaining : words
    return pool[Math.floor(Math.random() * pool.length)]
  }

  const [secretWord, setSecretWord] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  })

  const [score, setScore] = useState({ wins: 0, losses: 0 })

  const resetGame = () => {
    const newUsed = [...usedWords, secretWord]
    setUsedWords(newUsed)
    setBoard(emptyBoard())
    setColors(emptyBoard())
    setCurrentRow(0)
    setCurrentCol(0)
    setGameOver(false)
    setMessage("")
    setShakeRow(null)
    setLocked(false)
    setKeyColors({})
    setGuessedThisRound([])
    setSecretWord(pickNewWord(newUsed))
  }

  const showMessage = (text) => {
    setMessage(text)
    setTimeout(() => {
      setMessage("")
    }, 5000)
  }

  const handleKeyPress = useCallback((key) => {

    if (/^[A-Z]$/.test(key)) {
      if (gameOver || locked) return
      setBoard(prev => {
        const newBoard = prev.map(row => [...row])
        if (prev[currentRow][currentCol] === "") {
          newBoard[currentRow][currentCol] = key
        }
        return newBoard
      })
      if (currentCol < 5) setCurrentCol(col => col + 1)
      return
    }

    if (key === "BACKSPACE" || key === "BACK") {
      if (currentCol > 0) {
        setBoard(prev => {
          const newBoard = prev.map(row => [...row])
          newBoard[currentRow][currentCol - 1] = ""
          return newBoard
        })
        setCurrentCol(col => col - 1)
      }
      return
    }

    if (key === "ENTER" && currentCol === 5) {
      checkRow()
    }
  }, [board, currentRow, currentCol, gameOver, locked])

  const checkRow = () => {
    setLocked(true)
    const guess = board[currentRow].join("")

    if (!words.includes(guess)) {
      showMessage("Not a valid word")
      const row = currentRow
      setShakeRow(row)
      setTimeout(() => setShakeRow(null), 500)
      setLocked(false)
      return
    }

    if (guessedThisRound.includes(guess)) {
      showMessage("Already guessed that word")
      const row = currentRow
      setShakeRow(row)
      setTimeout(() => setShakeRow(null), 500)
      setLocked(false)
      return
    }

    setGuessedThisRound(prev => [...prev, guess])

    const newColors = colors.map(row => [...row])
    const newKeyColors = { ...keyColors }
    const result = Array(5).fill("gray")

    const secretArr = secretWord.split("")
    const guessArr = guess.split("")

    const secretRemaining = [...secretArr]

    for (let i = 0; i < 5; i++) {
      if (guessArr[i] === secretArr[i]) {
        result[i] = "green"
        secretRemaining[i] = null
      }
    }

    for (let i = 0; i < 5; i++) {
      if (result[i] === "green") continue
      const idx = secretRemaining.indexOf(guessArr[i])
      if (idx !== -1) {
        result[i] = "amber"
        secretRemaining[idx] = null
      }
    }

    for (let i = 0; i < 5; i++) {
      newColors[currentRow][i] = result[i]
      const letter = guessArr[i]
      const color = result[i]
      if (color === "green") {
        newKeyColors[letter] = "green"
      } else if (color === "amber" && newKeyColors[letter] !== "green") {
        newKeyColors[letter] = "amber"
      } else if (color === "gray" && !newKeyColors[letter]) {
        newKeyColors[letter] = "gray"
      }
    }

    setColors(newColors)
    setKeyColors(newKeyColors)

    if (guess === secretWord) {
      showMessage("You Win!")
      setScore(s => ({ ...s, wins: s.wins + 1 }))
      setGameOver(true)
      setLocked(true)
      return
    }

    const nextRow = currentRow + 1
    setCurrentRow(nextRow)
    setCurrentCol(0)

    if (nextRow >= 6) {
      showMessage(`Word was ${secretWord}`)
      setScore(s => ({ ...s, losses: s.losses + 1 }))
      setGameOver(true)
      setLocked(true)
      return
    }

    setLocked(false)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase()
      handleKeyPress(key)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyPress])

  return (
    <div className="app">
      <h1>Wordle Simulator</h1>
      <div className="score">
        <span className="score-item wins">W {score.wins}</span>
        <span className="score-divider">|</span>
        <span className="score-item losses">L {score.losses}</span>
      </div>
      {message && (
        <div className="toast">
          {message}
        </div>
      )}
      <Board
        board={board}
        colors={colors}
        shakeRow={shakeRow}
      />
      <Keyboard
        handleKeyPress={handleKeyPress}
        keyColors={keyColors}
      />
      <button className="play-again" onClick={resetGame} disabled={!gameOver}>Play Again</button>
    </div>
  )
}

export default App