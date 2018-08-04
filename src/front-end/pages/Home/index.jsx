import React, { Component } from 'react';
import ArticleList from '../../components/ArticleList';
import NavBar from '../../components/Nav';
import ScrollTop from '../../components/ScrollTop';
import Footer from '../../components/Footer';
import './style.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions';
import banner from '../../assets/images/banner.png';

class Home extends Component {

  componentDidMount() {
    const { actions } = this.props;
    actions.fetchArticles();
  }

  render() {
    const { articles, loading, isLogin } = this.props;
    return (
      <div className="wlog-home-page">
        <NavBar isLogin={isLogin}/>
        <div className="banner" style={{backgroundImage: `url(${banner})`}}>
          <h1>江南好，风景旧曾谙</h1>
          <p>李美丽 信永中和会计师事务所审计专员</p>
        </div>
        <div className="article-list">
          <ArticleList list={articles} loading={loading} />
        </div>
        <ScrollTop />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    articles: state.articleList.articleList,
    loading: state.articleList.loading,
    isLogin: state.login && state.login.token,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);