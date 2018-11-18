import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { connect } from 'dva';
import { NavLink as Link } from 'react-router-dom';
import './style.scss';
import logo from '../../assets/images/logo.png';
import { UserIcon } from '../../components/Svg';

const links = [
  {
    url: '/posts',
    title: '首页'
  },
  {
    url: '/mine/posts',
    title: '我的文章'
  },
];

@connect(state => ({
  isLogin: !!state.user.token,
}))
class Nav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      top: 0,
    };
  }

  componentDidMount() {
    const nav = ReactDOM.findDOMNode(this);
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
    const { isLogin } = this.props;
    return (
      <nav className="wlog-navbar-wrapper">
        <div className="wlog-navbar">
          <div className="wlog-navbar-logo">
            <img src={logo} />
          </div>
          <ul>
            {
              links.map((link, index) => (<li key={index}> <Link exact={true} to={link.url}>
                {link.title}
              </Link></li>))
            }
            {
              isLogin ? (
                <Fragment>
                  <li> <Link exact={true} to="/edit/1/new">写文章</Link> </li>
                  <li> <Link exact={true} to="/edit/2/new">写Markdown</Link> </li>
                </Fragment>
              ) : null
            }
          </ul>
          <div className="user-info">
            <UserIcon/>
          </div>          
        </div>
        <div className={classnames('wlog-navbar-sticky', {
          active: this.state.sticky
        })}>
          <div>
            <div className="wlog-navbar-sticky-logo">
              <img src={logo} />
            </div>
            <ul>
              {
                links.map((link, index) => (<li key={index}> <Link exact={true} to={link.url}>
                  {link.title}
                </Link></li>))
              }
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