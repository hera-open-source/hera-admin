import request from '../common/Request';

export async function list(params) {
  return request.get('http://localhost:8080/hera/hostGroup/list', params);
}
