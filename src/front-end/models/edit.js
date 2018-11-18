import { publish } from '../service/edit';
import { getPost } from '../service/posts';
import { routerRedux } from 'dva/router';
import { getUser } from '../utils/tokenHandler';
export default {
  namespace: 'edit',
  state: {
    article: {},
    posting: false,
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
    * setFormat({payload}, {put, select}) {
      const article = yield select(state => state.edit.article);
      yield put({
        type: 'merge',
        payload: {
          article: {
            ...article,
            format: payload,
          }
        }
      });
    },    
    * changeContent({payload}, {put, select}) {
      const article = yield select(state => state.edit.article);
      yield put({
        type: 'merge',
        payload: {
          article: {
            ...article,
            content: payload,
          }
        }
      });
    },
    * changeTitle ({payload}, {put, select}) {
      const article = yield select(state => state.edit.article);
      yield put({
        type: 'merge',
        payload: {
          article: {
            ...article,
            title: payload,
          }
        }
      });
    },
    * init ({payload}, {put, call}) {
      const res = yield call(getPost, payload);
      yield put({
        type: 'merge',
        payload: {
          article: res.data.data,
        },
      });
    },
    * publish ({payload}, {put, call, select}) {
      const article = yield select(state => state.edit.article);
      const user = getUser() || {};
      if (!user.token) {
        yield put(routerRedux.push('/'));
      } else {
        const data = {
          ...article,
          author: user._id
        };
        const res = yield call(publish, data);
        yield put(routerRedux.push(`/post/${res.data.data}`));        
      }
    }
  },
}