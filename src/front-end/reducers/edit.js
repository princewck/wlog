import _ from 'lodash';
import {
  CHANGE_CONTENT,
  CHANGE_TITLE,
  POST_ARTICLE_START,
  POST_ARTICLE_DONE,
  POST_ARTICLE_ERROR,
} from '../constants/editTypes';

const initialState = {
  article: {},
  posting: false,
};

export default function editReducer(state = initialState, action) {
  const type = _.get(action, 'type');
  switch (type) {
    case CHANGE_CONTENT:
      return {
        ...state,
        article: {
          ...state.article,
          content: action.payload,
        }
      }
    case CHANGE_TITLE:
      return {
        ...state,
        article: {
          ...state.article,
          title: action.payload,
        }
      }
    case POST_ARTICLE_START:
      return {
        ...state,
        posting: true,
      };
    case POST_ARTICLE_DONE:
      const res = action.payload;
      const id = _.get(res, 'data.value._id', null);
      window.location.href = `/post/${id}`;
      return {
        article: {},
        posting: false,
      };      
    case POST_ARTICLE_ERROR:
      alert('发布文章失败！');
      return {
        article: {},
        posting: false,
      };
    default:
      return state;
  }
}