import { USER } from '../constants/actionTypes'

const initialState = { error: null }

export default (state = initialState, action) => {
   switch(action.type) {
      case USER.FORGOT_PASSWORD_REQUEST:
         return { isRequesting: true }
         
      case USER.FORGOT_PASSWORD_SUCCESS:
         return { isRequested: true, status: action.payload }

      case USER.FORGOT_PASSWORD_ERROR:
         return { isRequested: true, status: action.payload.status, error: action.payload.error }

      case USER.FORGOT_PASSWORD_FAILURE:
         return { isRequested: true, error: action.payload }

      default: 
         return state;
   }
}