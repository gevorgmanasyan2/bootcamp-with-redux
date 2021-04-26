import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  RESET_START,
  RESET_SUCCESS,
  RESET_FAIL,
  UPDATE_START,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  LOGOUT
} from "../actions/types";
import AuthHeader from '../services/auth-header';

const user = AuthHeader();

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_START:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        registeredUser: payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_START:
      return {
        ...state,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case RESET_START:
      return {
        ...state,
        isLoggedIn: false,
      };
    case RESET_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case RESET_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case UPDATE_START:
      return {
        ...state,
        user: payload
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
      };
    case UPDATE_FAIL:
      return {
        ...state,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}