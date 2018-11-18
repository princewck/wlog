import { fetch, remove } from '../service/mine';
import Pagination from '../utils/pagination';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'mine',
  state: {
    list: [],
    pagination: {},
    loading: false,
  },
  reducers: {
    merge(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    }
  },
  effects: {
    * fetch({payload}, {put, call}) {
      const res = yield  call(fetch, payload);
      yield put({
        type: 'merge',
        payload: {
          list: res.data.data,
          pagination: new Pagination(res.data),
        }
      });
    },
    * delete({payload}, {put, call}) {
      yield call(remove, payload);
      yield put({type: 'fetch'});
    }
  },
}