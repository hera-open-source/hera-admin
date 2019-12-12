import request from '../common/Request';

export async function init(params) {
  return request.post('http://localhost:8080/hera/scheduleCenter/init', params);
}

export async function getJobMessage(params) {
  return request.get('http://localhost:8080/hera/scheduleCenter/getJobMessage', params);
}
export async function getGroupMessage(params) {
  return request.get('http://localhost:8080/hera/scheduleCenter/getGroupMessage', params);
}

export async function getJobHistory(params) {
  return request.get('http://localhost:8080/hera/scheduleCenter/getJobHistory', params);
}
export async function generateVersion(params) {
  return request.get('http://localhost:8080/hera/scheduleCenter/getJobHistory', params);
}
