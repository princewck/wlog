import request from './request';

export function fetch(page = 1) {
  return request({
    method: 'get',
    url: `/api/my/posts?page=${page}`
  });
}