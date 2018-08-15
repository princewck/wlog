import React, { Component } from 'react';
import './style.scss';
import Nav from '../../components/Nav';
import ArticleDetail from '../../components/Article';
import Markdown from '../../components/MarkdownDetail';
import Footer from '../../components/Footer';
import ScrollTop from '../../components/ScrollTop';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as types from '../../constants/articleDetailTypes';
import * as actions from '../../actions';

class Article extends Component {

  componentDidMount() {
    const { actions, id, match = {} } = this.props;
    const { params = {} } = match;
    if (params.id) {
      actions.fetchArticle(params.id);
    }
  }

  render() {
    const { article, loading } = this.props;
    const Detail = article.format === 2 ? Markdown : ArticleDetail;
    return (
      <div>
        <Nav />
        {
          loading
            ? <div className="article-loading">加载中...</div>
            : <Detail article={article} />
        }
        <Footer />
        <ScrollTop />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  article: state.articleDetail.article,
  loading: state.articleDetail.loading,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Article);