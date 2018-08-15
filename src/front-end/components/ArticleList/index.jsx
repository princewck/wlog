import React, { Component } from 'react';
import ArticleListItem from './ArticleListItem';
import './styles.scss';

class ArticleList extends Component {

  render() {
    const { list: articles, loading, enableEdit = false } = this.props;
    return (
      <div className="article-list">
        {
          loading
            ? <div className="article-list-loading" style={{ textAlign: 'center' }}>加载中...</div>
            : articles.map((article, index) => {
                return <ArticleListItem enableEdit key={index} index={index} {...article} />;
            })
        }
      </div>
    );
  }
}

export default ArticleList;