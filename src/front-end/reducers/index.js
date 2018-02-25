import { combineReducers } from 'redux';
import articleList from './article';
import articleDetail from './articleDetail';
import edit from './edit';
import login from './login';

export default combineReducers({
  articleList,
  articleDetail,
  edit,
  login,
})
