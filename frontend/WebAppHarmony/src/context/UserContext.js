import React from "react";
import { Auth } from 'aws-amplify'

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      return { ...state, isAuthenticated: false };
    }
  }
}

 function  UserProvider({ children }) {

  let [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: false,
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password) {
    setTimeout(() => {
      //localStorage.setItem('id_token', 1)
      setError(null)
      Auth.signIn(login,password).then(user => {
        setIsLoading(false)
        dispatch({ type: 'LOGIN_SUCCESS' })
        history.push('/app/dashboard')
      }).catch(error=> {
        dispatch({ type: "LOGIN_FAILURE" });
        setError(true);
        setIsLoading(false);
      })



    }, 2000);
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {

  Auth.signOut().then(() => {
    dispatch({ type: "SIGN_OUT_SUCCESS" });
    history.push("/login");
  }).catch(()=>{

  })

}

function test(){

}


