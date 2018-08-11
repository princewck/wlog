import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as actions from '../../actions/login';
import './style.scss';
import login_bg1 from '../../assets/images/login_bg1.jpg';
import login_bg2 from '../../assets/images/login_bg2.jpg';
import logo from '../../assets/images/logo.png';

class Login extends Component {

  render() {
    const {
      username,
      password,
      onSubmit,
      onChangeUsername,
      onChangePassword,
      doLogin,
      isLogin,
    } = this.props;
    const bg = +new Date() % 2 ? login_bg1 : login_bg2;
    return isLogin ? <Redirect to="/posts" /> :
      <div className="login-page" style={{ backgroundImage: `url(${bg})` }}>
        <div className="login-form">
          <div className="logo">
            <img src={logo} />
            用户登录
          </div>
          <form onSubmit={doLogin}>
            <div className="form-group clearfix">
              <label className="clearfix">
                <span>用户名:</span>
                <input
                  type="text"
                  value={username}
                  onChange={onChangeUsername}
                  placeholder="请输入用户名" /
                >
              </label>
            </div>
            <div className="form-group clearfix">
              <label>
                <span>密码:</span>
                <input
                  type="password"
                  placeholder="请输入密码"
                  value={password}
                  onChange={onChangePassword}
                />
              </label>
            </div>
            <div className="form-group submit clearfix">
              <label>
                <input type="submit" value="登陆" onClick={doLogin} />
              </label>
            </div>
          </form>
        </div>
      </div>;
  }
}

const mapStateToProps = ({ login: { username, password, token } }) => {
  return {
    username,
    password,
    isLogin: token,
  };
}

const mapDispatchToProps = (dispatch) => ({
  onChangeUsername: (e) => {
    dispatch(actions.changeName(e.target.value));
  },
  onChangePassword: (e) => {
    dispatch(actions.changePassword(e.target.value));
  },
  doLogin: (e) => {
    e.preventDefault();
    dispatch(actions.doLogin())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);