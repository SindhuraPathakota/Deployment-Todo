import http from './httpService';
import config from '../config.json';

const apiEndpoint = config.auth;

export function loginUser(email,password)
{
    return http.post(apiEndpoint,{email,password});
}