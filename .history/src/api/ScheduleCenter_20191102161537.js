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
  return request.post('http://localhost:8080/hera/scheduleCenter/generateVersion', params);
}
export async function getJobImpactOrProgress(params) {
  return request.post('http://localhost:8080/hera/scheduleCenter/getJobImpactOrProgress', params);
}
export async function getJobVersion(params) {
  return request.post('http://localhost:8080/hera/scheduleCenter/getJobVersion', params);
}
export async function manual(params) {
  return request.post('http://localhost:8080/hera/scheduleCenter/manual', params);
}

export async function addMonitor(params) {
  return request.post('http://localhost:8080/hera/scheduleCenter/manual', params);
}
// http://localhost:8080/hera/scheduleCenter/manual?actionId=201911020300000002&triggerType=1