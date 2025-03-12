import classes from './index.module.scss';

interface PaginationProps {
  currentPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  handleChangePage: (page: number) => void;
  isLoadingCharacters: boolean;
}


export function Pagination ({currentPage, hasNextPage, hasPreviousPage, handleChangePage, isLoadingCharacters} : PaginationProps ) {
  return (
    <div className={classes.pagination}>
      <button 
      className={classes['pagination__arrow']}
      onClick={() => handleChangePage(-1)}
      disabled={!hasPreviousPage || isLoadingCharacters || currentPage === 1}
      >&lt;</button>
      <span>Página {currentPage}</span>
      <button 
      className={classes['pagination__arrow']}
      onClick={() => handleChangePage(+1)}
      disabled={!hasNextPage || isLoadingCharacters}
      >&gt;</button>
    </div>
  )
}