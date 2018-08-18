import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Content extends Component {


  componentDidMount = () => {
    window.addEventListener('resize', this.resize);
    setTimeout(this.resize, 50);
  }

  componentWillUnmount() {
    window.removeEventListener(this.resize, this.resize);
  }


  resize = () => {
    const dom = ReactDOM.findDOMNode(this);
    console.log(dom);
    if (dom) {
      const minHeight = window.innerHeight - 280;
      dom.style.minHeight = `${minHeight}px`;
    }
  }

  render() {
    return this.props.children;
  }

}

export default Content;