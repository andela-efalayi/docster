import React from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

/**
 * PageNavigation Component
 * Returns a list of pages available
 * @param {number} pageCount
 * @param {func} changePage
 * @returns {object} react-component
 */
const PageNavigation = ({ pageCount, changePage}) => {
  return(
    <ReactPaginate
      previousLabel={'<--'}
      nextLabel={'-->'}
      breakLabel={<a href="">...</a>}
      breakClassName={'page-ellipsis'}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      onPageChange={changePage}
      containerClassName={'pagination u-pull-right'}
      activeClassName={'active'}
    />
  );
};

PageNavigation.propTypes = {
  changePage: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired
};

export default PageNavigation;
