import React, {Component} from 'react';
import ArticleList from '../../components/ArticleList';
import NavBar from '../../components/Nav';
import ScrollTop from '../../components/ScrollTop';
import Footer from '../../components/Footer';
import './style.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions';


class Home extends Component {

  componentDidMount() {
    const { actions } = this.props;
    actions.fetchArticles();
  }

  render() {
    const { articles, loading } = this.props;
    return (
      <div className="wlog-home-page">
        <NavBar />
        <div className="article-list">
          <ArticleList list={articles} loading={loading}/>
        </div>
        <ScrollTop />
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.article.articleList,
  loading: state.article.loading,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);