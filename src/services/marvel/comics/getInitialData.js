import axios from 'axios';
import { url } from '../index'

const call = function() {
  return axios.get(url + '&limit=12')
}

export default {
  call: call
}