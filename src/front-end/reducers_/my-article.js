import _ from 'lodash';
import {
  FETCH_MY_ARTICLES_START,
  FETCH_MY_ARTICLES_DONE,
  FETCH_MY_ARTICLES_ERROR,
  DELETE_ARTICLE_START,
  DELETE_ARTICLE_DONE,
  DELETE_ARTICLE_ERROR, 
} from '../constants/articleTypes';
import Pagination from '../utils/pagination';


const initialState = {
  loading: false,
  articleList: [],
  pagination: {},
  edit: {},
};

export default function articleReducer(state = initialState, action) {
  const type = _.get(action, 'type');
  switch (type) {
    case FETCH_MY_ARTICLES_START:
      return {
        ...state,
        loading: true,
      };
      break;
    case FETCH_MY_ARTICLES_DONE:
      const res = action.payload;
      return {
        ...state,
        articleList: res.data,
        loading: false,
        pagination: new Pagination(res)
      };
      break;
    case FETCH_MY_ARTICLES_ERROR:
      return {
        ...state,
        loading: false,
      };
    case DELETE_ARTICLE_START:
      return {
        ...state,
        loading: true,
      }
    case DELETE_ARTICLE_DONE:
      const deletedId = action.payload.data;
      return {
        ...state,
        loading: false,
        articleList: state.articleList.filter(a => a._id !== deletedId)
      }
    case DELETE_ARTICLE_ERROR:
      return {
        ...status,
        loading: false,
      }
    default:
      return state;
  }
}