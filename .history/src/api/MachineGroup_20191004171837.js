import request from '../common/Request';

export async function list(params) {
  return request.get('http://127.0.0.1:8080/hera/hostGroup/list', params);
}
