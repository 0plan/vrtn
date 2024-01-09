import axios from 'axios';

const prefixUrl: string = import.meta.env.BASE_URL;

const request = axios.create({
  baseURL: `${prefixUrl}`,
});
request.defaults.timeout = import.meta.env.VITE_REQUEST_TIMEOUT;

request.interceptors.request.use();

request.interceptors.response.use();
export default request;
