import request from '../common/Request';
import { async } from 'q';

export async function getMachineGroupList(params) {
  return request.get("/list")
}