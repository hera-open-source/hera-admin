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

export async function getGroupTask(params) {
  return request.get('http://localhost:8080/hera/scheduleCenter/getGroupTask', params);
}
// http://localhost:8080/hera/scheduleCenter/getGroupTask?page=1&limit=10&groupId=group_3&status=all&dt=191103

export async function getJobHistory(params) {
  return request.get('http://localhost:8080/hera/scheduleCenter/getJobHistory', params);
}
// http://localhost:8080/hera/scheduleCenter/getJobHistory?pageSize=10&offset=0&jobId=2&_=1572681480961
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

export async function updateSwitch(params) {
  return request.post('http://localhost:8080/hera/scheduleCenter/updateSwitch', params);
}
export async function deleteJob(params) {
  return request.post('http://localhost:8080/hera/scheduleCenter/deleteJob', params);
}
export async function updatePermission(params) {
  return request.post('http://localhost:8080/hera/scheduleCenter/updatePermission', params);
}
export async function updateGroupMessage(params) {
  return request.post('http://localhost:8080/hera/scheduleCenter/updateGroupMessage', params);
}
// http://localhost:8080/hera/scheduleCenter/updateGroupMessage
export async function upload(params) {
  return request.post('http://localhost:8080/hera/scheduleCenter/addMonitor', params);
}
// http://localhost:8080/hera/uploadResource/upload.do
export async function addMonitor(params) {
  return request.post('http://localhost:8080/hera/scheduleCenter/addMonitor', params);
}
// http://localhost:8080/hera/scheduleCenter/manual?actionId=201911020300000002&triggerType=1

export async function addMonitor(params) {
  return request.post('http://localhost:8080/hera/scheduleCenter/addMonitor', params);
}
http://localhost:8080/hera/scheduleCenter/addGroup