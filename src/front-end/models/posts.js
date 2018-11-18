import { fetchPosts, getPost } from '../service/posts';
import Pagination from '../utils/pagination';
export default {
  namespace: 'posts',
  state: {
    list: [],
    detail: {},
    loading: false,
    pagination: {},
  },
  reducers: {
    merge(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    },
  },
  effects: {
    * fetchPosts({payload = 1}, {put, call}) {
      const res = yield call(fetchPosts, payload);
      const pagination = new Pagination(res.data);
      const list = res.data.data;
      yield put({
        type: 'merge',
        payload: {
          list,
          pagination,
        }
      });
    },
    * getPost ({payload}, {put, call}) {
      const res = yield call(getPost, payload);
      const detail = res.data.data;
      yield put({
        type: 'merge',
        payload: {
          detail
        },
      });
    }
  }
}