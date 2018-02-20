import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { NavLink as Link } from 'react-router-dom';
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
            <li> <Link exact={true} to="/">日志列表</Link></li>
            <li> <Link exact={true}to="/edit/1">写文章</Link> </li>
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
              <li> <Link exact={true} to="/">日志列表</Link></li>
              <li> <Link exact={true} to="/edit/1">写文章</Link> </li>
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