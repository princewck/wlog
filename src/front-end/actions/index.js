import * as types from '../constants/articleTypes';
import {
  FETCH_ARTICLES_START,
  FETCH_ARTICLES_DONE,
  FETCH_ARTICLES_ERROR,
} from '../constants/articleTypes';
import {
  FETCH_ARTICLE_START,
  FETCH_ARTICLE_DONE,
  FETCH_ARTICLE_ERROR,
} from '../constants/articleDetailTypes';
import {
  POST_ARTICLE_START,
  POST_ARTICLE_DONE,
  POST_ARTICLE_ERROR,
  CHANGE_CONTENT,
  CHANGE_TITLE,
} from '../constants/editTypes';

export const fetchArticles = (page) => ({
  type: 'FETCH_ARTICLES',
  types: [FETCH_ARTICLES_START, FETCH_ARTICLES_DONE, FETCH_ARTICLES_ERROR],
  url: '/api/posts?page=1',
  data: {},
});

export const fetchArticle = id => ({
  type: 'FETCH_ARTICLE',
  types: [FETCH_ARTICLE_START, FETCH_ARTICLE_DONE, FETCH_ARTICLE_ERROR],
  url: `/api/post/${id}`,
});

export const postArticle = () => ({
  types: [POST_ARTICLE_START, POST_ARTICLE_DONE, POST_ARTICLE_ERROR],
  url: `/api/post`,
  method: 'POST',
  data: (store) => {
    console.log('store', store);
    return (store.edit.article);
  },
});

export const changeContent = content => ({
  type: CHANGE_CONTENT,
  payload: content,
});

export const changeTitle = title => ({
  type: CHANGE_TITLE,
  payload: title,
});