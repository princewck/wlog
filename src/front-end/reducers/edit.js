import _ from 'lodash';
import {
  SET_TYPE,
  CHANGE_CONTENT,
  CHANGE_TITLE,
  POST_ARTICLE_START,
  POST_ARTICLE_DONE,
  POST_ARTICLE_ERROR,
  INIT_EDIT_ARTICLE_START,
  INIT_EDIT_ARTICLE_SUCCESS,
  INIT_EDIT_ARTICLE_DONE,  
} from '../constants/editTypes';


const initialState = {
  article: {},
  posting: false,
  loading: false,
};

function parseArticleType(t) {
  if ([1, 2].includes(+t)) {
    return +t;
  }
  return 1;
}

export default function editReducer(state = initialState, action) {
  const type = _.get(action, 'type');
  switch (type) {
    case SET_TYPE:
      return {
        ...state,
        article: {
          ...state.article,
          format: parseArticleType(action.payload) // 1 富文本， 2 md
        }
      };
    case CHANGE_CONTENT:
      const article = {content: action.payload};
      if (state.article.format === 2) {
        const content = state.article.content || '';
        const match = content.match(/#{1,5}\s((\w|[\u4e00-\u9fa5])+)/) || [];
        article.title = match[1] || '';
      }
      return {
        ...state,
        article: {
          ...state.article,
          ...article
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
      const id = res || null;
      return {
        article: {},
        posting: false,
      };      
    case POST_ARTICLE_ERROR:
      alert('发布文章失败！');
      return {
        ...state,
        posting: false,
      };
    case INIT_EDIT_ARTICLE_START:
      return {
        ...state,
        loading: true,
      }
    case INIT_EDIT_ARTICLE_SUCCESS:
      const { data } = action.payload;
      return {
        ...state,
        article: data,
      }
    case INIT_EDIT_ARTICLE_DONE:
      return {
        ...state,
        loading: false,
      }
    default:
      return state;
  }
}