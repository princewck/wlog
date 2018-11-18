import React, { Component, Fragment } from 'react';
import ArticleList from '../../components/ArticleList';
import { Pagination } from '../../components';
import './style.scss';
import { connect } from 'dva';

@connect(state => ({
  list: state.mine.list,
  pagination: state.mine.pagination,
}))
class MyPosts extends Component {

  paginate = (page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'mine/fetch',
      payload: page,
    });
  }

  componentDidMount() {
    this.paginate(1);
  }

  onDelete = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'mine/delete',
      payload: id,
    });
  }

  render() {
    const { list: articles = [], loading, pagination } = this.props;
    return (
      <div className="wlog-home-page">
        <div className="article-list">
          {
            articles.length ? (
              <Fragment>
                <ArticleList list={articles} loading={loading} enableEdit onDelete={this.onDelete} />
                <Pagination data={pagination} onChange={this.paginate}></Pagination>
              </Fragment>
            ) : (
              <div className="no-articles">暂无文章～</div>
            )
          }
        </div>
      </div>
    );
  }
}


export default MyPosts;