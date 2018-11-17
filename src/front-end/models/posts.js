import { getPosts } from '../service/posts';
export default {
  namespace: 'posts',
  state: {
    list: [],
    loading: false,
    pagination: {},
  },
  reducers: {
    merge: (state, {payload}) {
      return {
        ...state,
        ...payload
      }
    },
  },
  effects: {
    * fetchPosts({payload = 1}, {put, call}) {
      const res = yield call(getPosts, payload);
      console.log('res', res);
    }
  }
}