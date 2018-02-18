import React, {Component} from 'react';
import icon from '../../assets/icons/arrow-up.svg';
import './style.scss';
import getScrollTop from '../../utils/getScrollTop';

class ScrollTop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handler);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handler);
  }

  scrollTop() {
    let time = performance.now();
    const scroll = () => {
      const top = getScrollTop();
      const t = performance.now();
      let scrollAmount = top - (t-time) * 1500/1000;
      time = t;
      scrollAmount = scrollAmount > 0 ? scrollAmount : top;
      window.scrollTo(0, scrollAmount);
      if (getScrollTop() > 10) {
        requestAnimationFrame(scroll);
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.log('已经滚动到顶部');
        }
      }
    }
    scroll();
  }

  handler = () => {
    const scrollTop = getScrollTop();
    const visible = scrollTop > 250;
    this.setState({ visible });
  }

  render() {
    const { visible } = this.state;
    return (
      visible
      ? (
        <div className="wlog-scroll-top" onClick={this.scrollTop}>
          <img src={ icon } />
        </div>        
      )
      : null
    );
  }
}

export default ScrollTop;