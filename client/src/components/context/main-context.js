import React, {useState, useEffect} from 'react'

const AuthContext = React.createContext({
  isLoggedIn: null,
  onLogin: () => {},
  onLogout: (email, password) => {}
});

export const AuthContextProvider = (props, {setAlert}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const logsInUser = localStorage.getItem('loggedIn');

    if (logsInUser === 'yes') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = ({email, password}) => async dispatch => {
    localStorage.setItem('loggedIn', 'yes');
    setIsLoggedIn(true);
      }


  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('loggedIn');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler
      }}

        {...props}
    />
  )
}

export default AuthContext
