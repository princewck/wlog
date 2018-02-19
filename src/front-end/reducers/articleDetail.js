import _ from 'lodash';
import {
  FETCH_ARTICLE_START,
  FETCH_ARTICLE_DONE,
  FETCH_ARTICLE_ERROR
} from '../constants/articleDetailTypes';


const initialState = {
  loading: false,
  article: {},
};

export default function articleReducer(state = initialState, action) {
  const type = _.get(action, 'type');
  switch (type) {
    case FETCH_ARTICLE_START:
      return {
        ...state,
        article: {},
        loading: true,
      };
      break;
    case FETCH_ARTICLE_DONE:
      const res = action.payload;
      return {
        ...state,
        article: res.data,
        loading: false,
      };
      break;
    case FETCH_ARTICLE_ERROR:
      // fixit 去404页面。
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}