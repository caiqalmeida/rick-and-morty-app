import classes from './index.module.scss'

export function Title() {
  return (
    <header>
      <h1 className={classes.title}>Rick and Morty</h1>
    </header>
  )
}