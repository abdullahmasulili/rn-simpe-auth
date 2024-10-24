import React, { createContext, useCallback, useReducer } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  currentUser: null,
  loading: false,
  accessToken: null,
  handleSetCurrentUser: () => {},
  handleSetIsAuthenticated: () => {},
  handleSetLoading: () => {},
  handleSetAccessToken: () => {},
});

const ACTION_TYPE = {
  SET_USER: 'SET_USER',
  SET_IS_AUTHENTICATED: 'SET_IS_AUTHENTICATED',
  SET_LOADING: 'SET_LOADING',
  SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN',
};

function AuthReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPE.SET_USER:
      const currentUser = payload;

      return {
        ...state,
        currentUser,
      };
    case ACTION_TYPE.SET_IS_AUTHENTICATED:
      const isAuthenticated = payload;

      return {
        ...state,
        isAuthenticated,
      };
    case ACTION_TYPE.SET_LOADING:
      const loading = payload;

      return {
        ...state,
        loading,
      };
    case ACTION_TYPE.SET_ACCESS_TOKEN:
      const accessToken = payload;

      return {
        ...state,
        accessToken,
      };
  }

  return state;
}

export default function AuthProvider({ children }) {
  const [authState, authDispatch] = useReducer(AuthReducer, {
    isAuthenticated: false,
    currentUser: null,
    loading: false,
    accessToken: null,
  });

  function handleSetCurrentUser(user) {
    authDispatch({
      type: ACTION_TYPE.SET_USER,
      payload: user,
    });
  }

  const handleSetIsAuthenticated = useCallback(
    function handleSetIsAuthenticated(bool) {
      authDispatch({
        type: ACTION_TYPE.SET_IS_AUTHENTICATED,
        payload: bool,
      });
    },
    [authDispatch],
  );

  const handleSetLoading = useCallback(
    function handleSetLoading(bool) {
      authDispatch({
        type: ACTION_TYPE.SET_IS_AUTHENTICATED,
        payload: bool,
      });
    },
    [authDispatch],
  );

  const handleSetAccessToken = useCallback(
    function handleSetAccessToken(bool) {
      authDispatch({
        type: ACTION_TYPE.SET_IS_AUTHENTICATED,
        payload: bool,
      });
    },
    [authDispatch],
  );

  const contextValue = {
    currentUser: authState.currentUser,
    isAuthenticated: authState.isAuthenticated,
    loading: authState.loading,
    accessToken: authState.accessToken,
    handleSetCurrentUser,
    handleSetIsAuthenticated,
    handleSetLoading,
    handleSetAccessToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
