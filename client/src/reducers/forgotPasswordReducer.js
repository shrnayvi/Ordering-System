import { USER } from '../constants/actionTypes'

const initialState = { error: null }

export default (state = initialState, action) => {
  switch (action.type) {
    case USER.FORGOT_PASSWORD_REQUEST:
      return { isRequesting: true }

    case USER.FORGOT_PASSWORD_SUCCESS:
      return { hasRequested: true, status: action.payload }

    case USER.FORGOT_PASSWORD_FAILURE:
      return { hasRequested: true, status: action.payload.status, message: action.payload.message }

    default:
      return state;
  }
}