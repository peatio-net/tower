import {
    GET_CURRENT_USER_DATA,
    GET_CURRENT_USER_FETCH,
    GET_DATA_BY_FILTER_FETCH,
    GET_USERS_BY_LABELS_FETCH,
    GET_USERS_FETCH,
    GET_USERS_SUCCESS,
} from '../../constants';
import { UserInterface, UsersAction } from './actions';

export interface UsersState {
    loading: boolean;
    users: UserInterface[];
    currentUser: UserInterface | undefined;
    loadingCurrentUser: boolean;
    usersTotal: number;
}

export const initialUsersState: UsersState = {
    loading: false,
    currentUser: undefined,
    loadingCurrentUser: false,
    users: [],
    usersTotal: 0,
};

export const usersReducer = (state = initialUsersState, action: UsersAction) => {
    switch (action.type) {
      case GET_USERS_FETCH:
          return {
              ...state,
              loading: true,
          };
      case GET_USERS_SUCCESS:
          return {
              ...state,
              loading: false,
              users: action.payload.users,
              usersTotal: action.payload.total,
          };
      case GET_DATA_BY_FILTER_FETCH:
          return {
              ...state,
              loading: true,
          };
      case GET_USERS_BY_LABELS_FETCH:
          return {
              ...state,
              loading: true,
          };
      case GET_CURRENT_USER_FETCH:
          return {
              ...state,
              loadingCurrentUser: true,
          };
      case GET_CURRENT_USER_DATA:
          return {
              ...state,
              loadingCurrentUser: false,
              currentUser: action.payload,
          };
      default:
          return {
              ...state,
          };
    }
};
