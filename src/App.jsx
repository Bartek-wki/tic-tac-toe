import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"

function deriveActivePlayer(turns) {
  let activePlayer = 'X'

  if(turns.length > 0 && turns[0].player === 'X') {
    activePlayer = 'O'
  }

  return activePlayer
}

function App() {
  const [turns, setTurns] = useState([])

  const activePlayer = deriveActivePlayer(turns)

  const handleSelectSquare = (rowIndex, colIndex) => {
    setTurns((prevTurns) => {
      const activePlayer = deriveActivePlayer(prevTurns)

      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: activePlayer},...prevTurns]

      return updatedTurns
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={"Player 1"} symbol={"X"} isActive={activePlayer === 'X'} />
          <Player initialName={"Player 2"} symbol={"O"} isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={turns} />
      </div>
      <Log turns={turns} />
    </main>
  )
}

export default App
