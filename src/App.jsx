import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./components/GameOver"

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
}

function deriveActivePlayer(turns) {
  let activePlayer = 'X'

  if(turns.length > 0 && turns[0].player === 'X') {
    activePlayer = 'O'
  }

  return activePlayer
}

function deriveWinner(gameBoard, playersName) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = playersName[firstSquareSymbol]
    }
  }

  return winner
}

function deriveGameBoard(turns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  

  for (const turn of turns) {
      const {square, player} = turn
      const {row, col} = square

      gameBoard[row][col] = player
  }

  return gameBoard
}

function App() {
  const [playersName, setPlayersName] = useState(PLAYERS)

  const [turns, setTurns] = useState([])

  const activePlayer = deriveActivePlayer(turns)
  const gameBoard = deriveGameBoard(turns)
  const winner = deriveWinner(gameBoard, playersName)

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

  const handleNameChange = (symbol, newName) => {
    setPlayersName(prevPlayersName => ({
      ...prevPlayersName,
      [symbol]: newName
    }))
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName={PLAYERS.X} 
            symbol={"X"} 
            isActive={activePlayer === 'X'} 
            onChangeName={handleNameChange} 
          />
          <Player 
            initialName={PLAYERS.O} 
            symbol={"O"} 
            isActive={activePlayer === 'O'} 
            onChangeName={handleNameChange} 
          />
        </ol>
        {(winner || isDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={turns} />
    </main>
  )
}

export default App
