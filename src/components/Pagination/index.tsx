import classes from './index.module.scss'

export function Pagination () {
  return (
    <div className={classes.pagination}>
      <span className={classes['pagination__arrow']}>&lt;</span>
      <span>Página 1</span>
      <span className={classes['pagination__arrow']}>&gt;</span>
    </div>
  )
}