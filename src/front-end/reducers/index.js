import { combineReducers } from 'redux';
import articleList from './article';
import articleDetail from './articleDetail';
import edit from './edit';

export default combineReducers({
  articleList,
  articleDetail,
  edit,
})
