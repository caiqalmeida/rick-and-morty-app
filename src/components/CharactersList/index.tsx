import { CharacterCard } from "./CharacterCard"
import classes from './index.module.scss'

export function CharactersList () {
  return (
    <div className={classes['character-list']}>
    <CharacterCard />
    <CharacterCard />
    <CharacterCard />
    <CharacterCard />
    </div>
  )
}