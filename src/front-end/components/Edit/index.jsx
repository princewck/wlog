import React, { Component, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import conf from './tinymce';
import ImageCropper from '../ImageCropper';
import './style.scss';
import upload from '../../utils/upload';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  componentDidMount() {
    const { config = {}, onContentChange, initArticle = {} } = this.props;
    tinymce.init({
      selector: 'textarea',
      ...conf,
      ...config,
      setup: (editor) => {
        this.editor = editor;
        conf.setup && conf.setup(editor);
        if (initArticle.content) {
          editor.setContent(initArticle.content);
        }
        editor.on('keyup', (e) => {
          onContentChange(editor.getContent());
        });
        editor.on('upload_image', () => {
          this.setState({
            showModal: true,
          });
        });
      },
    });
  }

  onCrop = (result) => {
    const { editor } = this;
    const { onContentChange } = this.props;
    this.setState({
      showModal: false,
    });
    editor.insertContent(editor.dom.createHTML('img', { src: result.url }));
    onContentChange(editor.getContent());
  }

  cancel = () => {
    this.setState({
      showModal: false,
    });
  }

  render() {
    const { showModal } = this.state;
    return (
      <Fragment>
        <div className="wlog-editor">
          <textarea></textarea>
        </div>
        {
          showModal ? 
          <ImageCropper 
            uploadAfterCrop 
            upload={upload} 
            onCrop={this.onCrop}
            onCancel={this.cancel}
          ></ImageCropper> : null
        }
      </Fragment>
    );
  }
}

export default Edit;