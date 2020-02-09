import ReactPaginate from 'react-paginate';
import React, { Component } from 'react';
import history from '../helpers/history';
import { getPagingArgs } from '../helpers/pagination';

export default class Pagination extends Component {
  handleClick = data => {
    let path = this.props.routePath;
    const pageNumber = data.selected + 1;
    history.push(`${path}?page=${pageNumber}`)
    if(this.props.action) {
      const pagingArgs = getPagingArgs(history.location);
      this.props.action(pagingArgs);
    }
  }

  render() {
    let { 
      pageCount,
      currentPage,
    } = this.props;

    currentPage = currentPage ? currentPage - 1 : 0;
    return (
      <div className="odr-pagination">
        {
          pageCount && pageCount > 1 
            ? <ReactPaginate
              forcePage={currentPage}
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handleClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
            : ''
        }
      </div>
          

    )
    
  }

}