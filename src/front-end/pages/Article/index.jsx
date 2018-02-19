import React, { Component } from 'react';
import './style.scss';
import Nav from '../../components/Nav';
import ArticleDetail from '../../components/Article';
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
    return (
      <div>
        <Nav />
        {
          loading
            ? <div style={{minHeight: '300px', textAlign: 'center'}}>加载中...</div>
            : <ArticleDetail article={article} />
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