import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import conf from './tinymce';
import './style.scss';

class Edit extends Component {
  handleEditorChange = (value) => {
    console.log(value);
  }

  componentDidMount() {
    const { config = {} } = this.props;
    tinymce.init({
      ...conf,
      ...config,
      selector: 'textarea',
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