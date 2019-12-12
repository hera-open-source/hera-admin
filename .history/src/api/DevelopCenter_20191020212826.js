import request from '../common/Request';
import { async } from 'q';

export async function init(params) {
  return request.post('http://localhost:8080/hera/developCenter/init', params);
}

export async function find(params) {
  return request.get('http://localhost:8080/hera/developCenter/find', params);
}

export async function addFile(params) {
  return request.get('http://localhost:8080/hera/developCenter/addFile', params);
}


export async function deleteFile(params) {
  return request.get('http://localhost:8080/hera/developCenter/delete', params);
}

export async function rename(params) {
  return request.get('http://localhost:8080/hera/developCenter/rename', params);
}
export async function executeDebugJob(params) {
  return request.post('http://localhost:8080/hera/developCenter/debug', params);
}
export async function debugSelectCode(params) {
  return request.post('http://localhost:8080/hera/developCenter/debugSelectCode', params);
}
export async function findDebugHistory(params) {
  return request.get('http://localhost:8080/hera/developCenter/findDebugHistory', params);
}
export async function cancelJob(params) {
  return request.get('http://localhost:8080/hera/developCenter/cancelJob', params);
}
export async function getLog(params) {
  return request.get('http://localhost:8080/hera/developCenter/getLog', params);
}
export async function check(params) {
  return request.get('http://localhost:8080/hera/developCenter/check', params);
}
export async function moveNode(params) {
  return request.get('http://localhost:8080/hera/developCenter/check', params);
}

