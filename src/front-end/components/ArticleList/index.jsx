import React, { Component } from 'react';
import ArticleListItem from './ArticleListItem';
import './styles.scss';

class ArticleList extends Component {

  render() {
    const { list: articles, loading } = this.props;
    return (
      <div className="article-list">
        <div className="article-list-title">
          文章列表
        </div>
        {
          loading
            ? <li className="article-list-item-wrapper" style={{ textAlign: 'center' }}>加载中...</li>
            : articles.map((article, index) => {
                return <ArticleListItem key={index} index={index} {...article} />;
            })
        }
      </div>
    );
  }
}

export default ArticleList;