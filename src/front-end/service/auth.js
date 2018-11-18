import request from './request';

export function login(name, password) {
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      name,
      password,
    }
  });
}