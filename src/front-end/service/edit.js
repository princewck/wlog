import request from './request';

export function publish(article) {
  return request({
    method: 'post',
    url: '/api/post',
    data: article,
  });
}