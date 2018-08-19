import React, { Component, Fragment } from 'react';
import ArticleList from '../../components/ArticleList';
import { Pagination } from '../../components';
import './style.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions';


class MyPosts extends Component {

  componentDidMount() {
    const { actions } = this.props;
    actions.fetchMyArticles();
  }

  paginate = (page) => {
    const { actions } = this.props;
    actions.fetchMyArticles(page);
  }

  render() {
    const { articles = [], loading, actions, pagination } = this.props;
    return (
      <div className="wlog-home-page">
        {/* <NavBar isLogin={isLogin}/> */}
        <div className="article-list">
          {
            articles.length ? (
              <Fragment>
                <ArticleList list={articles} loading={loading} enableEdit onDelete={actions.deleteArticle} />
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

const mapStateToProps = state => {
  return {
    articles: state.myArticles.articleList,
    loading: state.myArticles.loading,
    isLogin: state.login && state.login.token,
    pagination: state.myArticles.pagination,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);