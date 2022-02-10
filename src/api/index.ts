import axios from 'axios';

export default axios.create({
  baseURL: 'http://ortoped-crm.fastweb-tech.ru/api/',
  responseType: 'json',
});
