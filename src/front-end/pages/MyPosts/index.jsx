import React, { Component } from 'react';
import ArticleList from '../../components/ArticleList';
import NavBar from '../../components/Nav';
import ScrollTop from '../../components/ScrollTop';
import Footer from '../../components/Footer';
import './style.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions';


class MyPosts extends Component {

  componentDidMount() {
    const { actions } = this.props;
    actions.fetchMyArticles();
  }

  render() {
    const { articles, loading, isLogin } = this.props;
    return (
      <div className="wlog-home-page">
        <NavBar isLogin={isLogin}/>
        <div className="article-list">
          {
            articles.length ? (
              <ArticleList list={articles} loading={loading} enableEdit />
            ) : (
              <div className="no-articles">暂无文章～</div>
            )
          }
        </div>
        <ScrollTop />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    articles: state.myArticles.articleList,
    loading: state.myArticles.loading,
    isLogin: state.login && state.login.token,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);