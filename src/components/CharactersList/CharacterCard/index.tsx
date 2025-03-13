import { Character } from '../../../types/ram-api'
import classes from './index.module.scss'

interface CharacterCardProps {
  character: Character
}
export function CharacterCard ({character} : CharacterCardProps) {
  return (
    <dl className={classes['character-card']}>
      <img src={character.image} />
      <div className={classes['character-card__info']}>
        <dt>{character.name}</dt>
        <dd className={classes['character-card__info__item']}><span>Status :</span> {character.status}</dd>
        <dd className={classes['character-card__info__item']}><span>Specie :</span> {character.species}</dd>
        <dd className={classes['character-card__info__item']}><span>Last know location :</span> {character.location.name} </dd>
        <dd className={classes['character-card__info__item']}><span>First seen in :</span> {character.episode[0]} </dd>
      </div>
    </dl>
  )
}