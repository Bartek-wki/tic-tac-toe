import { useState } from "react"

export default function Player({initialName, symbol, isActive, onChangeName}) {
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(initialName)

    const handleEditClick = () => {
        setIsEditing(editing => !editing)

        if(isEditing) {
            onChangeName(symbol, name)
        }
    }

    const handleChangePlayerName = (event) => {
        setName(event.target.value)
    }

    let playerName = <span className="player-name">{name}</span>

    if(isEditing) {
        playerName = <input type="text" required value={name} onChange={handleChangePlayerName} />
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}