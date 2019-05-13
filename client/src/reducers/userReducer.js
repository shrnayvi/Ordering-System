export default (state = {}, action) => {
   switch(action.type) {
      case 'fetch_user':
         let { payload } = action;
         return { ...state, ...payload };
      default:
         return state;
   }
}