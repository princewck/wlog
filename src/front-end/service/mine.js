import request from './request';

export function fetch(page = 1) {
  return request({
    method: 'get',
    url: `/api/my/posts?page=${page}`
  });
}

export function remove(id) {
  return request({
    method: 'delete',
    url: `/api/post/${id}`,
  });
}