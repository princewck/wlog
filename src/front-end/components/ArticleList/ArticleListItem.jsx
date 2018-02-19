import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import getInnerText from '../../utils/getInnerText';


class ArticleListItem extends Component {
  render() {
    const { title, content, author, created_at, index, _id } = this.props;

    return (
      <div 
        className="article-list-item-wrapper animated slideInRight"
        style={{
          animationDuration: '400ms',
          animationDelay: index * 100 + 'ms',
        }}
      >
        <div className="title"><Link to={`/post/${_id}`} >{ title }</Link></div>
        <div className="meta">{ moment(created_at).format('YYYY-MM-DD HH:mm') }</div>
        <div className="content">
        { getInnerText(content) }
        </div>
        <div className="more"></div>
      </div>
    );
  }
}

export default ArticleListItem;