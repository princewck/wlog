import React, { Component } from 'react';
import { createPortal, unmountComponentAtNode } from 'react-dom';
import './style.scss';

class Modal extends Component {


  constructor(props) {
    super(props);
    this.div = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.div);
  }

  componentWillUnmount() {
    this.div.remove();
  }

  render() {
    return createPortal((
      <div className="wlog-modal-mask">
        { this.props.children }
      </div>
    ), this.div);
  }


}

export default Modal;