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

export async function delete (params){
  return request.get('http://localhost:8080/hera/developCenter/delete', params);
}


