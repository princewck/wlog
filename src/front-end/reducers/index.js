import { combineReducers } from 'redux';
import articleList from './article';
import myArticles from './my-article';
import articleDetail from './articleDetail';
import edit from './edit';
import login from './login';

export default combineReducers({
  articleList,
  myArticles,
  articleDetail,
  edit,
  login,
})
