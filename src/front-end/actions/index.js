import * as types from '../constants/articleTypes';
import {
  FETCH_ARTICLES_START,
  FETCH_ARTICLES_DONE,
  FETCH_ARTICLES_ERROR,
  FETCH_MY_ARTICLES_START,
  FETCH_MY_ARTICLES_DONE,
  FETCH_MY_ARTICLES_ERROR,
  
  DELETE_ARTICLE_START,
  DELETE_ARTICLE_DONE,
  DELETE_ARTICLE_ERROR,  
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
  SET_TYPE,
  INIT_EDIT_ARTICLE_START,
  INIT_EDIT_ARTICLE_SUCCESS,
  INIT_EDIT_ARTICLE_DONE,
} from '../constants/editTypes';

import { push } from 'connected-react-router';

export const fetchArticles = (page = 1) => ({
  type: 'FETCH_ARTICLES',
  types: [FETCH_ARTICLES_START, FETCH_ARTICLES_DONE, FETCH_ARTICLES_ERROR],
  url: `/api/posts?page=${page}`,
  data: {},
});

export const fetchMyArticles = (page = 1) => ({
  type: 'FETCH_MY_ARTICLES',
  types: [FETCH_MY_ARTICLES_START, FETCH_MY_ARTICLES_DONE, FETCH_MY_ARTICLES_ERROR],
  url: `/api/my/posts?page=${page}`,
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
    const {id = null} = store.login;
    return ({...store.edit.article, author: id});
  },
  onDone: (store, res) => {
    store.dispatch(push(res && res.data ? `/post/${res.data}` : '/'));
  }
});

export const deleteArticle = (id) => ({
  type: 'DELETE_ARTICLE',
  types: [DELETE_ARTICLE_START, DELETE_ARTICLE_DONE, DELETE_ARTICLE_ERROR],
  url: `/api/post/${id}`,
  method: 'DELETE',
});

export const setArticleFormat = (type = 1) => ({
  type: SET_TYPE,
  payload: type,
});

export const changeContent = content => ({
  type: CHANGE_CONTENT,
  payload: content,
});

export const changeTitle = title => ({
  type: CHANGE_TITLE,
  payload: title,
});

export const initEditArticle = (id) => ({
  types: [
    INIT_EDIT_ARTICLE_START,
    INIT_EDIT_ARTICLE_SUCCESS,
    INIT_EDIT_ARTICLE_DONE
  ],
  url: `/api/post/${id}`,
})