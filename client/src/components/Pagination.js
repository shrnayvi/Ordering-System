import ReactPaginate from 'react-paginate';
import React, { Component } from 'react';
import history from '../helpers/history';

export default class Pagination extends Component {
  handleClick = (data) => {
    let path = this.props.routePath;
    const pageNumber = data.selected + 1;
    history.push(`${path}?page=${pageNumber}`)
    this.props.action(`page=${pageNumber}`);
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
          pageCount && pageCount > 1 &&
            <ReactPaginate
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
        }
      </div>
          

    )
    
  }

}