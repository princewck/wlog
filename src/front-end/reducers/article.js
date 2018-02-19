import _ from 'lodash';
import {
  FETCH_ARTICLES_START,
  FETCH_ARTICLES_DONE,
  FETCH_ARTICLES_ERROR
} from '../constants/articleTypes';


const initialState = {
  loading: false,
  articleList: [],
  pagination: {},
  edit: {},
};

export default function articleReducer(state = initialState, action) {
  const type = _.get(action, 'type');
  switch (type) {
    case FETCH_ARTICLES_START:
      return {
        ...state,
        loading: true,
      };
      break;
    case FETCH_ARTICLES_DONE:
      const res = action.payload;
      return {
        ...state,
        articleList: res.data,
        loading: false,
      };
      break;
    case FETCH_ARTICLES_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}