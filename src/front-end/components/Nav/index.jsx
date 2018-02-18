import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import './style.scss';

class Nav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      top: 0,
    };
  }

  componentDidMount() {
    const nav = ReactDOM.findDOMNode(this);
    console.log(nav);
    document.addEventListener('scroll', this.scrollHandler);
  }

  scrollHandler = (e) => {
    const nav = ReactDOM.findDOMNode(this);
    const position = nav.getBoundingClientRect();
    this.setState({
      top: position.top,
      sticky: position.height + position.top < 0
    });
  }

  componentWillUnmount() {
    const nav = ReactDOM.findDOMNode(this);
    document.removeEventListener('scroll', this.scrollHandler);
  }


  render() {
    return (
      <nav className="wlog-navbar-wrapper">
        <div className="wlog-navbar">
          <div className="wlog-navbar-logo">
            wlog
          </div>
          <ul>
            <li> <Link to="/">首页</Link></li>
            <li> <a href="#">前端开发</a> </li>
            <li> <a href="#">作品集</a> </li>
            <li> <Link to="/edit/1">写文章</Link> </li>
            <li> <a href="#">日志</a> </li>
          </ul>
        </div>
        <div className={classnames('wlog-navbar-sticky', {
          active: this.state.sticky
        })}>
          <div>
            <div className="wlog-navbar-sticky-logo">
              王子的网站 { this.state.sticky }
            </div>  
            <ul>
              <li> <Link to="/">首页</Link></li>
              <li> <a href="#">前端开发</a> </li>
              <li> <a href="#">作品集</a> </li>
              <li> <Link to="/edit/1">写文章</Link> </li>
              <li> <a href="#">日志</a> </li>
            </ul> 
            <div className="wlog-navbar-sticky-search">
              <input type="text" placeholder="搜索内容" />
            </div>
          </div>                       
        </div> 
      </nav>
    );    
  }
}

export default Nav;