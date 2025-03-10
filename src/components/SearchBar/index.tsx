import classes from './index.module.scss'

export function SearchBar () {

  return (
    <div className={classes['search-bar__wrapper']}>
      <input className={classes['search-bar__input']} type="text" placeholder="Pesquisar personagem"/>
      <button className={classes['search-bar__button']}>Pesquisar</button>
    </div>
  )
}