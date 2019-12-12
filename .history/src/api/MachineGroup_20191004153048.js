import request from '../common/Request';
import { async } from 'q';

export async function list(params) {
  return request.get("/list", pa)
}