import axios from 'axios';

export default store => next => action => {
  if (action.types && action.types.length === 3) {
    store.dispatch({
      type: action.types[0],
    });
    const { url, data } = action;
    axios.get(url, data).then(res => {
      store.dispatch({
        type: action.types[1],
        payload: res.data,
      });
    }, (e) => {
      store.dispatch({
        type: action.types[2],
        payload: e,
      }); 
    });
  } else {
    next(action);
  }
}