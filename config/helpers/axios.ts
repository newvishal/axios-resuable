import axios from 'axios';
import { APP_BASE_URL } from './constants';

export const API = axios.create({
  baseURL: APP_BASE_URL,
  withCredentials: false,
});

export const setHeader = (value: any, key: string = 'X-Auth-Token') => {
  API.defaults.headers.common[key] = value;
};

export const removeHeader = (key) => {
  delete API.defaults.headers.common[key];
};
