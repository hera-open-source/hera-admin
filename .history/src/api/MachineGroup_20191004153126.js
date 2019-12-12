import request from '../common/Request';

export async function list(p) {
  return request.get('/list', parmas);
}
