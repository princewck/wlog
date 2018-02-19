import * as types from '../constants/articleTypes';
import {
  FETCH_ARTICLES_START,
  FETCH_ARTICLES_DONE,
  FETCH_ARTICLES_ERROR
} from '../constants/articleTypes';

export const fetchArticles = (page) => ({
  type: 'FETCH_ARTICLES',
  types: [FETCH_ARTICLES_START, FETCH_ARTICLES_DONE, FETCH_ARTICLES_ERROR],
  url: '/api/posts?page=1',
  data: {},
});