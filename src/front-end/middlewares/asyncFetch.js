import axios from 'axios';

export default store => next => action => {
  if (action.types && action.types.length === 3) {
    store.dispatch({
      type: action.types[0],
    });
    const { url, data, method = 'GET' } = action;
    const requestData = data instanceof Function ? data(store.getState()) : data;
    console.log('%cajax数据:', 'color: green', requestData);
    axios({
      method,
      url,
      data: requestData,
    }).then(res => {
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