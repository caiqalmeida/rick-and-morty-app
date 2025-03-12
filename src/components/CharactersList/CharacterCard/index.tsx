import { Character } from '../../../types/ram-api'
import classes from './index.module.scss'

interface CharacterCardProps {
  character: Character
}

export function CharacterCard ({character} : CharacterCardProps) {
  return (
    <div className={classes['character-card']}>
      <img src={character.image} />
      <div className={classes['character-card__info']}>
        <p>{character.name}</p>
        <p>Status : {character.status}</p>
        <p>Specie : {character.species}</p>
        <p>Last know location : {character.location.name} </p>
        <p>First seen in : {character.episode[0]} </p>
      </div>
    </div>
  )
}