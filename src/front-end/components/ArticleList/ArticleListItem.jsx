import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import getInnerText from '../../utils/getInnerText';


class ArticleListItem extends Component {

  onDelete = () => {
    const { onDelete, _id } = this.props;
    if (onDelete) {
      onDelete(_id);
    } else {
      console.error('onDelete callback is not specified!');
    }
  }

  render() {
    const { title, content, author, format, created_at, index, _id, enableEdit } = this.props;
    return (
      <div 
        className="article-list-item-wrapper animated fadeIn"
        style={{
          animationDuration: '400ms',
          animationDelay: index * 100 + 'ms',
        }}
      >
        <div className="title"><Link to={`/post/${_id}`} >{ title }</Link></div>
        <div className="content">
        { getInnerText(content) }
        </div>
        <div className="meta">{ moment(created_at).format('YYYY-MM-DD HH:mm') }</div>
        <div className="more">
        {
          enableEdit ? (
            <Fragment>
              <Link to={`/edit/${format || 1}/${_id}`}>修改</Link>
              <a onClick={ this.onDelete }>删除</a>
            </Fragment>
          ) : null
        }
        </div>
      </div>
    );
  }
}

export default ArticleListItem;