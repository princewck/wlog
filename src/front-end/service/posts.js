import request from './request';

export function fetchPosts(page) {
  return request({
    url: `/api/posts?page=${page}`
  });
}

export function getPost(id) {
  return request({
    url: `/api/post/${id}`,
  });
}