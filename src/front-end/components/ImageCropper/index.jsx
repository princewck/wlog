import React, { Component } from 'react';
import Modal from '../Modal';
import './style.scss';
import { selectFiles, dataURLtoBlob } from '../../utils';
import { Cropper } from 'react-image-cropper';

class ImageCropper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: '',
      history: [],
      preview: null,
      imageWrapperStype: {},
    }
  }

  selectFiles = () => {
    selectFiles({
      accept: 'images/*'
    }, file => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        this.onImgLoad(img.width, img.height);
        this.setState({
          image: url,
          history: [url, ...this.state.history]
        });
      }
      img.src = url;
    });
  }

  onImgLoad = (imgWidth, imgHeight) => {
    const { width, height } = this.container.getBoundingClientRect();
    let fitWidth, fitHeight;
    if (imgWidth/imgHeight > width/height) {
      fitWidth =  width;
      fitHeight = (imgHeight * width) / imgWidth;
    } else {
      fitHeight = height;
      fitWidth = height * (imgWidth / imgHeight);
    }
    this.setState({
      imageWrapperStype: {
        width: fitWidth,
        height: fitHeight,
      },
    });
  }

  onChange = (...values) => {
    const blob = dataURLtoBlob(this.cropper.crop());
    const url = URL.createObjectURL(blob);
    this.setState({
      preview: url,
    });
  }

  onCrop = () => {
    const { onCrop, uploadAfterCrop, upload } = this.props;
    if (uploadAfterCrop && onCrop) {
      return upload(null, dataURLtoBlob(this.cropper.crop())).then(url => {
        onCrop(url, this.cropper.values());
      });
    } else if (onCrop) {
      onCrop(this.cropper.crop(), this.cropper.values());
    } else {
      console.error('onCrop callback is not defined!');
    }
  }

  cancel = () => {
    const { onCancel } = this.props;
    onCancel && onCancel();
  }

  render() {
    const { image, preview, imageWrapperStype } = this.state;
    return (
      <Modal>
        <div className="img-cropper">
          <div className="image-box">
            <div ref={node => { this.container = node; }}>
              {image ? 
              <div style={imageWrapperStype}>
                <Cropper
                  src={image}
                  ref={ref => { this.cropper = ref }}
                  onImgLoad={this.onChange}
                  onChange={this.onChange}
                  fixedRatio={false}
                />
              </div> : null}
            </div>
            <p><a onClick={this.selectFiles}>选择图片</a></p>
          </div>
          <div className="sidebar">
            <div className="preview">
              <label>预览:</label>
              {preview ? <img src={preview} /> : null}
            </div>
          </div>
          <div className="cropper-footer">
            <button className="btn btn-cancel" onClick={this.cancel}>取消</button>
            <button className="btn btn-primary" onClick={this.onCrop}>确定</button>
          </div>
        </div>
      </Modal>
    );
  }


}

export default ImageCropper;