import axios from 'axios';
import { url } from '../index'

const call = function(data) {
  let new_url = ''
  if (data.date_range == '') {
    new_url = url + '&titleStartsWith=' + data.title
  } else if (data.title == '') {
    new_url = url + '&dateRange=' + data.date_range
  } else {
    new_url = url + '&titleStartsWith=' + data.title + '&dateRange=' + data.date_range
  }

  return axios.get(new_url)
}

export default {
  call: call
}