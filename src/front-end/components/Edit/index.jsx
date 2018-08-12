import React, { Component, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import conf from './tinymce';
import ImageCropper from '../ImageCropper';
import './style.scss';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  componentDidMount() {
    const { config = {}, onContentChange, initArticle = {} } = this.props;
    console.log(conf, config);
    tinymce.init({
      selector: 'textarea',
      ...conf,
      ...config,
      setup: (editor) => {
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

  render() {
    const { showModal } = this.state;
    return (
      <Fragment>
        <div className="wlog-editor">
          <textarea></textarea>
        </div>
        {
          showModal ? <ImageCropper></ImageCropper> : null
        }
      </Fragment>
    );
  }
}

export default Edit;