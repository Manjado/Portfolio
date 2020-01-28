import axios from 'axios';
import Cookies from 'js-cookie';

import { getCookieFromReq } from '../helpers/utils';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 3000
});
const setAuthHeader = req => {
  const token = req ? getCookieFromReq(req, 'jwt') : Cookies.getJSON('jwt');

  if (token) {
    return { headers: { authorization: `Bearer ${token}` } };
  }
};

export const getSecretData = async req => {
  const url = '/secret';
  return await axiosInstance
    .get(url, setAuthHeader(req))
    .then(respons => respons.data);
};

export const getPortfolios = async req => {
  const url = '/portfolios';
  return await axiosInstance.get(url).then(respons => respons.data);
};

export const createPortfolio = async portfolioData => {
  return await axiosInstance
    .post('/portfolios', portfolioData, setAuthHeader())
    .then(respons => respons.data);
};
