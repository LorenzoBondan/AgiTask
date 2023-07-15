import {ReactComponent as ArrowIcon} from 'assets/images/Seta.svg';
import ReactPaginate from 'react-paginate';
import './styles.css';

type Props = {
    pageCount : number;
    range : number;
    onChange?: (pageNumber : number ) => void;
    forcePage? : number;
}

const Pagination = ({pageCount, range, onChange, forcePage} : Props) => {
    return(
        <ReactPaginate 
            pageCount = {pageCount} 
            pageRangeDisplayed = {range} 
            marginPagesDisplayed = {1} 
            containerClassName= 'pagination-container'
            pageLinkClassName='pagination-item' 
            breakClassName='pagination-item' 
            previousClassName='arrow-previous'
            nextClassName='arrow-next'
            previousLabel={<div className='pagination-arrow-container'><ArrowIcon/></div>} 
            nextLabel={<div className='pagination-arrow-container'><ArrowIcon/></div>} 
            activeLinkClassName='pagination-link-active'
            disabledClassName='arrow-inactive'
            onPageChange={(items) => onChange ? onChange(items.selected) : {}}
            forcePage={forcePage}
        />
    );
}

export default Pagination;
