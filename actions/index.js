import axios from "axios";
import Cookies from "js-cookie";

import { getCookieFromReq } from "../helpers/utils";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 3000
});
const setAuthHeader = req => {
  const token = req ? getCookieFromReq(req, "jwt") : Cookies.getJSON("jwt");

  if (token) {
    return { headers: { authorization: `Bearer ${token}` } };
  }
};

const rejectPromis = resError => {
  let error = {};
  console.log(resError, "resError");
  if (resError && resError.response && resError.response.data) {
    error = resError.response.data;
  } else {
    error = resError;
  }

  return Promise.reject(error);
};

export const getSecretData = async req => {
  const url = "/secret";
  return await axiosInstance
    .get(url, setAuthHeader(req))
    .then(respons => respons.data);
};

export const getPortfolios = async req => {
  const url = "/portfolios";
  return await axiosInstance.get(url).then(respons => respons.data);
};

export const getPortfolioById = async id => {
  return await axiosInstance
    .get(`/portfolios/${id}`)
    .then(respons => respons.data);
};

export const createPortfolio = async portfolioData => {
  return await axiosInstance
    .post("/portfolios", portfolioData, setAuthHeader())
    .then(respons => respons.data)
    .catch(error => rejectPromis(error));
};

export const updatePortfolio = async portfolioData => {
  return await axiosInstance
    .patch(`/portfolios/${portfolioData._id}`, portfolioData, setAuthHeader())
    .then(respons => respons.data)
    .catch(error => rejectPromis(error));
};

export const deletePortfolio = portfolioId => {
  return axiosInstance
    .delete(`/portfolios/${portfolioId}`, setAuthHeader())
    .then(response => response.data);
};

// ------ BLOG ACTIONS -------

export const createBlog = (blogData, lockId) => {
  return axiosInstance
    .post(`/blogs?lockId=${lockId}`, blogData, setAuthHeader())
    .then(response => response.data)
    .catch(error => rejectPromis(error));
};

export const updateBlog = (blogData, blogId) => {
  return axiosInstance
    .patch(`/blogs/${blogId}`, blogData, setAuthHeader())
    .then(response => response.data)
    .catch(error => rejectPromis(error));
};

export const getBlogbyId = blogId => {
  return axiosInstance.get(`/blogs/${blogId}`).then(response => response.data);
};
