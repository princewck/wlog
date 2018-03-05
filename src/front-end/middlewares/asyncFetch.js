import axios from 'axios';
axios.interceptors.response.use(function(response){
  return response;
},function(error){
  if (error.response.status === 401) {
    localStorage.setItem('user', null);
    window.location.href = '/';
  }
  //对返回的错误进行一些处理
  return Promise.reject(error);
});

export default store => next => action => {
  if (action.types && action.types.length === 3) {
    store.dispatch({
      type: action.types[0],
    });
    const { url, data, method = 'GET' } = action;
    const requestData = data instanceof Function ? data(store.getState()) : data;
    const loginState = store.getState()['login'] || {};
    axios({
      method,
      url,
      data: requestData,
      headers: {
        Authorization: loginState.token,
      }
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