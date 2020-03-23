import React from 'react';

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore


export const LoginContext = React.createContext({
    isLoggedIn: false,
    user: {},
    signIn: () => {},
});