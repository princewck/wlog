const initialState = {
  loading: false,
  cred: null,
}

export default function (state = initialState, action) {
  switch (action && action.type) {
    case 'GET_OSS_CRED_SUCCESS':
      return {
        ...state,
        loading: true,
      }
    case 'GET_OSS_CRED_SUCCESS':
       return {
         ...state,
         cred: action.payload,
         loading: false,
       }
    default:
       break;
  }
}