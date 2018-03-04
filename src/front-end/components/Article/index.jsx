import React, { Component } from 'react';
import moment from 'moment';
import tags from '../../assets/icons/bookmark.svg'
import blog from '../../assets/icons/blog.svg'
import './style.scss';

class Article extends Component {

  render() {
    const { article = {} } = this.props;
    return (
      <div className="wlog-article-wrapper">
        <div className="wlog-article animated fadeIn">
          <div className="wlog-article-title">
            <h4>{article.title}</h4>
          </div>
          <div className="wlog-article-info">
            <span>发布时间：{ moment(article.created_at).format('YYYY-MM-DD HH:mm:ss') }</span>
            <span><img src={tags} /> 标签：前端开发，js，程序</span>
          </div>
          <div 
            className="wlog-article-content"
            dangerouslySetInnerHTML={{__html: article.content || '<p></p>'}}
          />
          <div className="wlog-article-footer">
            <img src={blog} />
          </div>
        </div>
      </div>
    );
  }
}

export default Article;
