import classes from './index.module.scss';

interface PaginationProps {
  pagination: {
    handleChangePage: (pageSum: number) => void;
    hasPrevious: boolean;
    hasNext: boolean;
    current: number;
    pages: number;
  }
  isLoadingCharacters: boolean;
}


export function Pagination ({pagination, isLoadingCharacters} : PaginationProps ) {
  const { current, hasNext, hasPrevious, handleChangePage, pages} = pagination;
  return (
    <div className={classes.pagination}>
      <button 
      className={classes['pagination__arrow']}
      onClick={() => pagination.handleChangePage(-1)}
      disabled={!hasPrevious || isLoadingCharacters || current === 1}
      >&lt;</button>
      <span>Page {current} of {pages}</span>
      <button 
      className={classes['pagination__arrow']}
      onClick={() => handleChangePage(+1)}
      disabled={!hasNext || isLoadingCharacters}
      >&gt;</button>
    </div>
  )
}