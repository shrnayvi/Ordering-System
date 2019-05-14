import cookie from 'js-cookie';

export const setCookie = (name, value, opts = {}) => {
   cookie.set(name, value, opts);
};

export const getCookie = (name) => {
   return cookie.get(name);
};

export const destroyCookie = (name, path='/') => {
   cookie.remove(name, path);
};