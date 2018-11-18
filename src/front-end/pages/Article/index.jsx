import React, { Component } from 'react';
import './style.scss';
import ArticleDetail from '../../components/Article';
import Markdown from '../../components/MarkdownDetail';
import Content from '../../components/Content';

import { connect } from 'dva';
import { withRouter } from 'dva/router';

@connect(state => {
  return ({
    article: state.posts.detail,
    loading: state.posts.loading,
  });
})
@withRouter
class Article extends Component {

  componentDidMount() {
    const { match = {}, dispatch } = this.props;
    const { params = {} } = match;
    if (params.id) {
      dispatch({
        type: 'posts/getPost',
        payload: params.id,
      });
    }
  }

  render() {
    const { article, loading } = this.props;
    const Detail = article.format === 2 ? Markdown : ArticleDetail;
    return (
      <div>
        <Content>
          {
            loading
              ? <div className="article-loading">加载中...</div>
              : <Detail article={article} />
          }
        </Content>
      </div>
    );
  }
}

export default Article;