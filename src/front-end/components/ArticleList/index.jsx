import React, { Component } from 'react';
import ArticleListItem from './ArticleListItem';
import './styles.scss';

class ArticleList extends Component {


  onDelete = (id) => {
    const { onDelete } = this.props;
    const confirm = window.confirm('确定要删除这篇文章吗？\n该操作将无法撤销！');
    if (confirm) {
      onDelete(id);
    }
  }

  render() {
    const { list: articles, loading, enableEdit = false } = this.props;
    return (
      <div className="article-list">
        {
          loading
            ? <div className="article-list-loading" style={{ textAlign: 'center' }}>加载中...</div>
            : articles.map((article, index) => {
                return <ArticleListItem enableEdit={enableEdit} key={index} onDelete={this.onDelete} index={0} {...article} />;
            })
        }
      </div>
    );
  }
}

export default ArticleList;