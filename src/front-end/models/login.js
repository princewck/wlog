import { login } from '../service/auth';
import { setUser } from '../utils/tokenHandler';
export default {
  namespace: 'login',
  state: {
    username: '',
    password: '',
  },
  reducers: {
    merge(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    * changeName({payload: username}, {put}) {
      yield put({
        type: 'merge',
        payload: {
          username,
        },
      });
    },
    * changePassword({payload: password}, {put}) {
      yield put({
        type: 'merge',
        payload: {
          password,
        },
      });
    },
    * doLogin(action, { call, put, select }) {
      const { username, password } = yield select(state => state.login);
      const res = yield call(login, username, password);
      const user = res.data;
      setUser(user);
      yield put({
        type: 'user/merge',
        payload: {
          info: {
            username: user.name,
            token: user.token,
            id: user._id,
            loading: false,            
          },
          token: user.token,
        }
      })
    }
  }
};