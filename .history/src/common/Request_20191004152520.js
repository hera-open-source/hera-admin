import ajax from '@ali/ice-ajax';


function request(url, data, options) {
  // // csrf token,所有ajax请求头必须带这个
  const headers = {
    'X-XSRF-TOKEN': IceCookie.get('XSRF-TOKEN'),
  };

  const reqObj = {
    url: getHost(options) + url,
    data,
    headers,
    dataType: 'json',
    contentType: options.contentType,
    ...options,
  };

  return ajax(reqObj).then((res) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res);
      }, 0);
    });
  }).catch((err) => {
    console.error('ajax请求错误:', err);
    return err;
  });
}

function getHost(options) {
  const host = window.location.hostname;
  // console.log('Host: ', host);

  if (options && options.env === 'daily') {
    return '//127.0.0.1:8080';
  }

  if (host.indexOf('daily.taobao.net') !== -1) {
    // 日常
  } else if (host.indexOf('') !== -1) {
    // 预发
  } else if (host === '') {
    // 线上
  }
  return '';
}

function post(url, data, options) {
  return request(url, JSON.stringify(data), {
    url: getHost(options) + url,
    ...options,
    type: 'post',
    contentType: 'application/json; charset=UTF-8',
  }).then((result) => {
    if (!result.success && result.errCode === '010004') {
      console.log('Redirect to:', result.errMessage);
    }
    return result;
  });
}

function get(url, data, options) {
  return request(url, data, {
    ...options,
    type: 'get'
  }).then((result) => {
    if (!result.success && result.errCode === '010004') {
      console.log('Redirect to:', result.errMessage);
      window.location.href = `#/acl?redirect=${result.errMessage}`;
    }
    return result;
  });
}

export default {
  request,
};
