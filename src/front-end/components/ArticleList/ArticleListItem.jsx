import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';


class ArticleListItem extends Component {
  render() {
    const { title, content, author, created_at } = this.props;
    return (
      <div className="article-list-item-wrapper">
        <div className="title">{ title }</div>
        <div className="meta">{ moment(created_at).format('YYYY-MM-DD HH:mm') }</div>
        <div className="content">
        { content }
        </div>
        <div className="more">
          <Link to="/post/1">>>详情...</Link>
        </div>
      </div>
    );
  }
}

export default ArticleListItem;