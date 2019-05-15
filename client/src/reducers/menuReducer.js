import { MENU } from '../constants/actionTypes';

const initialState = {
   currentMenu: {}
}
export default (state = initialState, action) => {
   switch(action.type) {
      case MENU.INITIALIZE_MENU:
         return { currentMenu: action.payload };
      case MENU.CHANGE_MENU:
         return { currentMenu: action.payload };
      default: 
         return state;
   }
}