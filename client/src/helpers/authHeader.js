import { getCookie } from './cookie';
import config from '../constants/config';

export default () => {
  const cookie = getCookie(config.authCookie);
  if (cookie) {
    try {
      const { token, user } = JSON.parse(cookie);
      return { token, user };
    } catch(e) {
      return {};
    }
  }

  return {};
};