import request from '../common/Request';

export async function init(params) {
  return request.post('http://localhost:8080/hera/scheduleCenter/init', params);
}
export async function getJobMessage(params) {
  return request.get('http://localhost:8080/hera/scheduleCenter/getJobMessage', params);
}

