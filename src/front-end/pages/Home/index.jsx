import React, { Component } from 'react';
import ArticleList from '../../components/ArticleList';
import './style.scss';
import { bindActionCreators } from 'redux';
import { Pagination } from '../../components';
import * as actionCreators from '../../actions';
import banner from '../../assets/images/banner.png';
import { connect } from 'dva';

@connect(state => ({
  list: state.posts.list,
  loading: state.posts.loading,
  pagination: state.posts.pagination,
}))
class Home extends Component {

  componentDidMount() {
    const { actions } = this.props;
    actions.fetchArticles();
  }

  paginate = (page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'posts/getPosts',
      payload: page,
    })
  }

  render() {
    const { list, loading, pagination } = this.props;
    return (
      <div className="wlog-home-page">
        {/* <div className="banner" style={{backgroundImage: `url(${banner})`}}>
          <h1>江南好，风景旧曾谙</h1>
          <p>李美丽 信永中和会计师事务所审计专员</p>
        </div> */}
        <div className="article-list">
          <ArticleList list={list} loading={loading} />
          <Pagination data={pagination} onChange={this.paginate}></Pagination>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    articles: state.articleList.articleList,
    loading: state.articleList.loading,
    isLogin: state.login && state.login.token,
    pagination: state.articleList.pagination,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;