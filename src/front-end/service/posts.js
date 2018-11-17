import request from './request';

export function getPosts(page) {
  return request({
    url: `/api/posts?page=${page}`
  });
}