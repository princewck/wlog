/**
 * https://help.aliyun.com/document_detail/31870.html?spm=5176.8466029.cors.1.2e8b1450x6nwL3
 */
let token = null;
import { store } from '../App';
import axios from 'axios';

function getToken() {
  const state = store.getState()['login'] || {};
  const url = '/api/aliyun_sts'
  return axios({
    method: 'get',
    url,
    headers: {
      Authorization: state.token,
    }
  }).then(res => {
    return res && res.data || {};
  });
}

/**
 * STS授权方式上传， 注意不能漏掉stsToken
 */
export default async function upload(key, file) {
  key = key || (+new Date() + '_' + Math.floor(Math.random() * 10000));
  const t = await getToken();
  const { AccessKeySecret, AccessKeyId, SecurityToken } = t.credentials;
  const client = new OSS({
    region: 'oss-cn-shanghai',
    accessKeyId: AccessKeyId,
    accessKeySecret: AccessKeySecret,
    stsToken: SecurityToken, // 没有会报错 403 : aliyun-oss-sdk-6.0.1.min.js:4 Uncaught (in promise) Error: The OSS Access Key Id you provided does not exist in our records.
    bucket: 'wblogimages'
  });
  const res = await client.put(key, file);
  return res;
}

