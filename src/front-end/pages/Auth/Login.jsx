import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
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
    } = this.props;
    return (
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
              用户名:
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
              用户名:
              <input type="submit" value="登陆" onClick={doLogin}/>
            </label>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ username, password }) => {
  return {
    username,
    password,
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

export default connect(mapDispatchToProps, mapDispatchToProps)(Login);