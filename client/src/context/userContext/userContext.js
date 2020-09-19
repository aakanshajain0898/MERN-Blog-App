import React, { createContext, useReducer } from 'react';
import { USER, CLEAR, UPDATE, UPDATEPIC, UPDATEPROFILE } from '../types';

const initialState = null;

export const userReducer = (state, { type, payload }) => {
  switch (type) {
    case USER:
      return payload;
    case CLEAR:
      return null;
    case UPDATE:
      return {
        ...state,
        followers: payload.followers,
        following: payload.following,
      };
    case UPDATEPIC:
      return { ...state, pic: payload };
    case UPDATEPROFILE:
      return { ...state, name: payload };
    default:
      return state;
  }
};

export const UserContext = createContext();

const UserState = (props) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
