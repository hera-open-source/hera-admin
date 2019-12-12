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


export default {
  request,
};
