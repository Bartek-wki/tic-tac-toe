import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./components/GameOver"

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

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

  let gameBoard = [...initialGameBoard.map(array => [...array])];
  let winner;

  for (const turn of turns) {
      const {square, player} = turn
      const {row, col} = square

      gameBoard[row][col] = player
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol
    }
  }

  const isDraw = turns.length === 9 && !winner

  const handleSelectSquare = (rowIndex, colIndex) => {

    setTurns((prevTurns) => {
      const activePlayer = deriveActivePlayer(prevTurns)

      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: activePlayer},...prevTurns]

      return updatedTurns
    })
  }

  const handleRestart = () => {
    setTurns([])
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={"Player 1"} symbol={"X"} isActive={activePlayer === 'X'} />
          <Player initialName={"Player 2"} symbol={"O"} isActive={activePlayer === 'O'} />
        </ol>
        {(winner || isDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={turns} />
    </main>
  )
}

export default App
