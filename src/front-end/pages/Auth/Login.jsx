import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as actions from '../../actions/login';
import './style.scss';

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
    return isLogin ? <Redirect to="/posts" /> :
      <div className="login-page">
        <form onSubmit={doLogin}>
          <div className="form-group">
            <label>
              用户名:
            <input
                type="text"
                value={username}
                onChange={onChangeUsername}
                placeholder="请输入用户名" /
              >
            </label>
          </div>
          <div className="form-group">
            <label>
              密码:
            <input
                type="password"
                placeholder="请输入密码"
                value={password}
                onChange={onChangePassword}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
            <input type="submit" value="登陆" onClick={doLogin} />
            </label>
          </div>
        </form>
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