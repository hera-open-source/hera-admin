import ajax from '@ali/ice-ajax';
// import IceCookie from '@ali/ice-cookie';
import axios from 'axios';

const isDebug = false;

/**
 * 封装网络请求，根据当前环境分发，本地用mock
 */
function request(url, data, options) {
  // console.info('request', url, data, options);
  // csrf token,所有ajax请求头必须带这个
  const headers = {
    // 'h-csrf': IceCookie.get('XSRF-TOKEN'),
  };

  url = "127.0.0.1:8080";
  return ajax({
    `$`,
    headers,
    data,
    dataType: 'json',
    contentType: options.contentType,
    ...options,
  })
    .then((res) => {
      // console.log('result', res);
      return res;
    })
    .catch((err) => {
      return err;
    });
}

function post(url, data, options) {
  return request(url, JSON.stringify(data), {
    ...options,
    type: 'post',
    contentType: 'application/json; charset=UTF-8',
  });
}

function formPost(url, data, options) {
  return request(url, data, {
    ...options,
    type: 'post',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    cache: !isDebug,
  });
}

function get(url, data, options) {
  return request(url, data, {
    ...options,
    type: 'get',
  });
}

function mock(data) {
  let cb = null;
  window.setTimeout(() => {
    if (cb) cb(data);
  }, 1000);
  return {
    then: func => (cb = func),
  };
}

function multipartPost(url, data, params) {
  return axios({
    url,
    method: 'post',
    data,
    params,
    xsrfHeaderName: 'h-csrf',
    headers: {
      'Content-Type': 'multipart/form-data',
      'h-csrf': IceCookie.get('XSRF-TOKEN'),
    },
  });
}

export default {
  request,
  post,
  formPost,
  get,
  mock,
  multipartPost,
};
