import React, { Component } from 'react';
import './tags.scss';

class Tags extends Component {

  render() {
    return (
      <div className="wlog-tags">
        <div className="tags-main">
          <div className="tags-list">
            <div className="tag-item">
              前端开发
            </div>
            <div className="tag-item">
              React
            </div>
          </div>
          <div className="tag-input">
            <input type="text" />
          </div>
        </div>
      </div>
    );
  }
}

export default Tags;