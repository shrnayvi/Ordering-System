import { getCookie } from './cookie';

export default () => {
  const cookie = getCookie('order');
  if (cookie) {
    const { token, user } = JSON.parse(cookie);
    return { token, user };
  }

  return {};
};