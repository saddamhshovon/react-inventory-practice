import { useReducer } from "react";

const initialResponse = {
  loading: false,
  success: false,
  status: null,
  message: null,
  data: null,
  errors: null,
};

const initialAction = {
  loading: false,
  status: null,
  message: null,
  data: null,
  errors: null,
};

const reducer = (state, action = initialAction) => {
  if (action.loading === true) return { ...state, loading: action.loading };
  switch (action.status) {
    case 200:
    case 201:
    case 204:
      return {
        ...state,
        loading: action.loading,
        success: true,
        status: action.status,
        message: action?.message,
        data: action?.data,
      };
    case 400:
    case 401:
    case 403:
    case 404:
    case 409:
    case 422:
    case 429:
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
      return {
        ...state,
        loading: action.loading,
        success: false,
        status: action.status,
        message: action.message,
        errors: action?.errors,
      };
    default:
      return { ...state, loading: action.loading };
  }
};

const useResponse = () => {
  const [state, dispatch] = useReducer(reducer, initialResponse);
  return [state, dispatch];
};

export default useResponse;
