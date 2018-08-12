/**
 * http://gosspublic.alicdn.com/ram-policy-editor/index.html?spm=a2c63.p38356.a3.19.16d83205dTXfKT
 *  https://www.alibabacloud.com/help/zh/doc-detail/32077.htm?spm=a2c63.p38356.b99.230.48747557eMRsTW */
const OSS = require('ali-oss');
const path = require('path');
const config = require('../ali-oss');

const sts = new OSS.STS(config);

async function getSTSToken() {
  try {
    const arn = 'acs:ram::1646881312224974:role/wlog-role';
    const policy = {
      "Statement": [
        {
          "Action": [
            "oss:GetObject",
            "oss:ListObjects",
            "oss:PutObject",
            "oss:DeleteObject",
          ],
          "Effect": "Allow",
          "Resource": ["acs:oss:*:*:wblogimages/*"] // 最后的"/*"很重要，没有的话实际上是没有上传到该路径的权限的
        }
      ],
      "Version": "1"
    };
    const expireation = 15 * 60;
    const sessionName = 'wlogOssSessionId'

    let token = await sts.assumeRole(arn, policy, expireation, sessionName);
    return token;
    //    let client = new OSS({
    //      region: 'oss-cn-shanghai',
    //      accessKeyId: token.credentials.AccessKeyId,
    //      accessKeySecret: token.credentials.AccessKeySecret,
    //      stsToken: token.credentials.SecurityToken,
    //      bucket: 'wblogimages'
    //    });
    //    const result = await client.put('test_upload', new Buffer('测试上传文件1'));
    //    console.log(result);
    //  } catch (e) {
    //    console.log(e);
    //  }
  } catch (e) {
    return Promise.reject(e);
  }
}

module.exports = {
  getSTSToken,
};