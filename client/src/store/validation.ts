import { TModifyFunc } from './types';

const modifyName: TModifyFunc = function (this) {
  this.value = this.value.replace(/[0-9]/g, '');
  this.value = this.value.replace(/\s{2,}/g, ' ');
};

const modifyPhone: TModifyFunc = function (this) {
  if (this.value.length > 0 && this.value[0] !== '+') {
    this.value = '+'.concat(this.value);
  }
  this.value = this.value.replace(/[^0-9+\s()-]/g, '');
  this.value = this.value.replace(/\s{2,}/g, ' ');
};

const modifyEmail: TModifyFunc = function (this) {
  this.value = this.value.replace(/\s/g, '');
};

const modifyPassword: TModifyFunc = function (this) {
  this.value = this.value.replace(/\s/g, '');
};

export const validationInfo = {
  username: {
    value: '',
    isValid: false,
    isAlert: false,
    regex: /^[a-zа-я]{2,}\s+[a-zа-я]{2,}/i,
    header: 'Username',
    placeholder: 'Firstname Lastname',
    alert: 'Full name is incorrect. Should be composed no less than two words, at least 2 letters length each',
    modify: modifyName,
  },
  phone: {
    value: '',
    isValid: false,
    isAlert: false,
    regex: /^\+[0-9]([\s\-(]?[0-9][\s)]?){8,}$/,
    header: 'Phone number',
    placeholder: '+XXX XX XXX-XX-XX',
    alert: 'Phone number is incorrect. Should start with +, length isn`t shorter than 9 numbers',
    modify: modifyPhone,
  },
  email: {
    value: '',
    isValid: false,
    isAlert: false,
    regex:
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
    header: 'E-mail',
    placeholder: 'example@mail.com',
    alert: 'Email is incorrect. example@mail.com',
    modify: modifyEmail,
  },
  password: {
    value: '',
    isValid: false,
    isAlert: false,
    regex: /^[A-Za-z]\w{3,14}$/,
    header: 'Password',
    placeholder: '111',
    alert: 'Password is incorrect. Length isn`t shorter than 3',
    modify: modifyPassword,
  },
};
