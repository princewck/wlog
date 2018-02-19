import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import conf from './tinymce';
import './style.scss';

class Edit extends Component {

  componentDidMount() {
    const { config = {} , onContentChange, initArticle = {}} = this.props;
    tinymce.init({
      selector: 'textarea',
      ...conf,
      ...config,
      setup: (editor) => {
        if (initArticle.content) {
          editor.setContent(initArticle.content);
        }
        editor.on('keyup', (e) => {
          console.log('content change');
          onContentChange(editor.getContent());
        });
      },
    });
  }

  render() {
    return (
      <div className="wlog-editor">
        <textarea></textarea>
      </div>
    );
  }
}

export default Edit;