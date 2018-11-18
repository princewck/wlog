import { getUser, setUser } from '../utils/tokenHandler';

const user = getUser() || {};

export default {
  namespace: 'user',
  state: {
    info: user,
    token: user.token || null,
  },
  reducers: {
    merge(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    }
  },
}