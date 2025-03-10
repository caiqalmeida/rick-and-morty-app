import classes from './index.module.scss'

export function CharacterCard () {
  return (
    <div className={classes['character-card']}>
      <img src="https://placehold.co/600x400" />
      <div className={classes['character-card__info']}>
        <p>Rick Sanchez</p>
        <p>Status</p>
        <p>Alive - Human</p>
        <p>Last know location : Schurables</p>
        <p>First seen in : Scheuravels </p>
      </div>
    </div>
  )
}