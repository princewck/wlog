import axios from 'axios';
import { getUser } from '../utils/tokenHandler';

axios.interceptors.response.use(function(response){
  return response;
}, function(error){
  if (error.response.status === 401) {
    localStorage.setItem('user', null);
    window.location.href = '/login';
  }
  //对返回的错误进行一些处理
  return Promise.reject(error);
});

export default function ({
  method = 'get',
  url,
  data = {},
  headers = {},
}) {
  const user = getUser(); 
  return axios({
    method,
    url,
    data,
    headers: {
      ...headers,
      Authorization: user && user.token || '',
    }
  })  
}