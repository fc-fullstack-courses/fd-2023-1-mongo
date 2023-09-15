import axios from 'axios';
import CONSTANTS from '../constants';

const httpClient = axios.create({
  baseURL: CONSTANTS.HTTP_SERVER_URL
});

let accessToken = null;

export const clearTokens = () => {
  accessToken = null;
  localStorage.removeItem(CONSTANTS.REFRESH_TOKEN);
}

httpClient.interceptors.request.use(function (config) {
  // Do something before request is sent

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
httpClient.interceptors.response.use(function (response) {

  if (response?.data?.data?.tokenPair) {
    // имеем доступ к токенам
    const { tokenPair } = response.data.data;

    accessToken = tokenPair.accessToken;

    localStorage.setItem(CONSTANTS.REFRESH_TOKEN, tokenPair.refreshToken);
  }

  return response;
}, async function (error) {

  const { response: { status } } = error;

  const refreshTokenFromLS = localStorage.getItem('refreshToken');

  if (refreshTokenFromLS && status === 419) {

    const {
      data: {
        data: {
          tokenPair
        }
      }
    } = await axios.post(`${CONSTANTS.HTTP_SERVER_URL}/auth/refresh`, { refreshToken: refreshTokenFromLS });

    accessToken = tokenPair.accessToken;

    localStorage.setItem(CONSTANTS.REFRESH_TOKEN, tokenPair.refreshToken);

    error.config.headers['Authorization'] = `Bearer ${accessToken}`;

    return httpClient.request(error.config);
  }

  return Promise.reject(error);
});


export const login = (userData) => httpClient.post('/auth/login', userData);

export const registration = (userData) => httpClient.post('/auth/registration', userData);

export const refresh = (refreshToken) => httpClient.post('/auth/refresh', { refreshToken });
