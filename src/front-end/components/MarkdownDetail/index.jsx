import React, { Component } from 'react';
import moment from 'moment';
import tags from '../../assets/icons/bookmark.svg'
import blog from '../../assets/icons/blog.svg'
import Editor from 'tui-editor';
import './style.scss';

class ArticleMarkdown extends Component {

  constructor(props) {
    super(props);
    this.ele;
  }

  componentDidMount() {
    this.renderMarkdown();
  }

  componentWillReceiveProps(nextProps) {
    const { article } = nextProps;
    this.editor.setValue(article.content);
  }

  renderMarkdown = () => {
    const { article } = this.props;
    this.editor = Editor.factory({
        el: this.ele,
        viewer: true,
        height: '500px',
        initialValue: article.content,
    });    
  }

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
            ref={node => { this.ele = node; }}
          />
          <div className="wlog-article-footer">
            <img src={blog} />
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleMarkdown;
