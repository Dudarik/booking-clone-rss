export const DB = 'http://194.58.109.204:3000/api/';
export const RESTAS = `${DB}/restaurants`;
export const USERS = `${DB}/users`;
export const COMMENTS = `${DB}/comments`;
export const TABLES = `${DB}/tables`;

import axios from 'axios';

export const service = {
  getRestaurants: async function (rid: number, title: string, address: string) {
    try {
      const res = await axios.get(RESTAS, {
        params: {
          rid: rid,
          title: title,
          address: address,
        },
      });
      return res.data;
    } catch (error) {
      return error;
    }
  },
  getRestaurant: async function (rid: number) {
    try {
      const res = await axios.get(`${DB + 'restaurants/' + rid}`);
      return res.data.data;
    } catch (error) {
      return error;
    }
  },
  signUp: async function (username: string, email: string, password, confirm_password) {
    // eslint-disable-next-line prefer-rest-params
    console.log(arguments);
    try {
      const res = await axios.post(`${DB + 'signup'}`, {
        username: username,
        email: email,
        password: password,
        c_password: confirm_password,
      });
      return res;
    } catch (error) {
      return error;
    }
  },
  logIn: async function (email: string, password) {
    try {
      const res = await axios.post(`${DB + 'signin'}`, {
        email: email,
        password: password,
      });
      console.log(res);
      return res;
    } catch (error) {
      return error;
    }
  },
  logOut: async function (rtoken) {
    try {
      const res = await axios.post(`${DB + 'logout'}`, {
        rtoken: rtoken,
      });
      return res;
    } catch (error) {
      return error;
    }
  },
  checkSession: async function (user) {
    try {
      const res = await axios.get(`${DB + 'refresh'}`, {
        params: { usertoken: user },
      });
      return res;
    } catch (error) {
      return error;
    }
  },
  getUser: async function (uid: number) {
    try {
      const res = await axios.get(`${DB + 'users/' + uid}`);
      return res;
    } catch (error) {
      return error;
    }
  },
};

export default service;
