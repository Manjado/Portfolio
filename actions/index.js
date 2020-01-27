import axios from 'axios';
import Cookies from 'js-cookie';

import { getCookieFromReq } from '../helpers/utils';

const setAuthHeader = req => {
  const token = req ? getCookieFromReq(req, 'jwt') : Cookies.getJSON('jwt');

  if (token) {
    return { headers: { authorization: `Bearer ${token}` } };
  }
};

export const getSecretData = async req => {
  const url = req ? 'http://localhost:3000/api/v1/secret' : '/api/v1/secret';
  return await axios.get(url, setAuthHeader(req)).then(respons => respons.data);
};

export const getPortfolios = async req => {
  const url = req
    ? 'http://localhost:3000/api/v1/portfolios'
    : '/api/v1/portfolios';
  return await axios.get(url, setAuthHeader(req)).then(respons => respons.data);
};
