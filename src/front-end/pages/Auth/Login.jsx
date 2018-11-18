import React, { Component } from 'react';
import './style.scss';
import login_bg1 from '../../assets/images/login_bg1.jpg';
import login_bg2 from '../../assets/images/login_bg2.jpg';
import logo from '../../assets/images/logo.png';

import { connect } from 'dva';
import { Redirect } from 'dva/router';

let bg = null;

@connect(state => {
  return ({
    username: state.login.username,
    password: state.login.password,
    user: state.user
  });
})
class Login extends Component {

  doLogin = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch({
      type: 'login/doLogin',
    });
  }

  onChangeUsername = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/changeName',
      payload: e.target.value,
    });
  }

  onChangePassword = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/changePassword',
      payload: e.target.value,
    });
  }

  render() {
    const {
      username,
      password,
      user,
    } = this.props;
    const isLogin = user && user.token;
    bg = bg ||  +new Date() % 2 ? login_bg1 : login_bg2;
    return isLogin ? <Redirect to="/posts" /> :
      <div className="login-page" style={{ backgroundImage: `url(${bg})` }}>
        <div className="login-form">
          <div className="logo">
            <img src={logo} />
            用户登录
          </div>
          <form onSubmit={this.doLogin}>
            <div className="form-group clearfix">
              <label className="clearfix">
                <span>用户名:</span>
                <input
                  type="text"
                  value={username}
                  onChange={this.onChangeUsername}
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
                  onChange={this.onChangePassword}
                />
              </label>
            </div>
            <div className="form-group submit clearfix">
              <label>
                <input type="submit" value="登陆" />
              </label>
            </div>
          </form>
        </div>
      </div>;
  }
}

export default Login;

{/* const mapStateToProps = ({ login: { username, password, token } }) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Login); */}