import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"

function App() {
  const [turns, setTurns] = useState([])
  const [activePlayer, setActivePlayer] = useState('X')

  const handleSelectSquare = (rowIndex, colIndex) => {
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X')
    
    setTurns((prevTurns) => {
      let activePlayer = 'X'

      if(turns.length > 0 && turns[0].player === 'X') {
        activePlayer = 'O'
      }

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
