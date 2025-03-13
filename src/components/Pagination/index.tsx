import { SlArrowLeftCircle, SlArrowRightCircle } from "react-icons/sl";
import { IPagination } from "../../hooks/useCharacters";
import classes from './index.module.scss';

interface PaginationProps {
  currentPage: number;
  pagination: IPagination
  isLoadingCharacters: boolean;
}


export function Pagination ({pagination, isLoadingCharacters, currentPage} : PaginationProps ) {
  const {  hasNext, hasPrevious, onClickNext, onClickPrev, pages} = pagination;
  return (
    <div className={classes.pagination}>
      <button 
      className={classes['pagination__arrow']}
      onClick={onClickPrev}
      disabled={!hasPrevious || isLoadingCharacters || currentPage === 1}
      >
        <SlArrowLeftCircle />
      </button>
      <span>Page {currentPage} of {pages}</span>
      <button 
      className={classes['pagination__arrow']}
      onClick={onClickNext}
      disabled={!hasNext || isLoadingCharacters}
      >
        <SlArrowRightCircle />
      </button>
    </div>
  )
}