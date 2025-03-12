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
        <h3>{character.name}</h3>
        <p className={classes['character-card__info__item']}><span>Status :</span> {character.status}</p>
        <p className={classes['character-card__info__item']}><span>Specie :</span> {character.species}</p>
        <p className={classes['character-card__info__item']}><span>Last know location :</span> {character.location.name} </p>
        <p className={classes['character-card__info__item']}><span>First seen in :</span> {character.episode[0]} </p>
      </div>
    </div>
  )
}