import request from '../common/Request';

export async function list(params) {
  return request.get('/hera/hostGroup/list', params);
}
