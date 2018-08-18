import React, { Component } from 'react';
import './style.scss';

function genPages(current, total) {
  const result = [];
  result.push(current);
  for (let i = 1; i < 5; i++ ) {
    if (current + i <= total) result.push(current + i);
    if (current - i > 0) result.unshift(current - i);
  }
  return result;
}


class Pagination extends Component {

  paginate = (p) => {
    const { onChange } = this.props;
    return () => {
      onChange && onChange(p);
    }
  }

render () {
  const { data: pagination = {} } = this.props;
  if (!pagination || !pagination.currentPage) {
    return null;
  }
  const pages = genPages(+pagination.currentPage, +pagination.totalPages);
  return (
    <div className="wlog-pagination">
      <ul>
        <li>
        {
          pagination.currentPage <= 1 ? <span>第一页</span> : <a onClick={this.paginate(1)}>第一页</a>
        }
        </li>
        {
          pages.map(p => (
            <li key={p} className={ p == pagination.currentPage ? 'active' : ''}><a onClick={this.paginate(p)}>{ p }</a></li>
          ))
        }
        <li>{pagination.currentPage >= pagination.totalPages ? <span>末页</span> : <a onClick={ this.paginate(pagination.totalPages) }>末页</a>}</li>
      </ul>
    </div>
  );
}

}

export default Pagination;