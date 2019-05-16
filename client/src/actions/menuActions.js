import { MENU } from '../constants/actionTypes';

export const changeMenu = (menu) => {
   return {
      type: MENU.CHANGE_MENU,
      payload: menu
   };
};

export const initializeMenu = (menu) => {
   return {
      type: MENU.CHANGE_MENU,
      payload: menu
   };
};

export const removeCurrentMenu = () => {
   return { type: MENU.REMOVE_MENU };
};