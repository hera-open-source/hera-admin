import request from '../common/Request';

export async function init(params) {
  return request.post('http://localhost:8080/hera/developCenter/init', params);
}


export a