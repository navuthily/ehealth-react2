import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getUser, signIn as sendSignInRequest } from '../api';

function AuthProvider(props) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const result = await getUser();
      if (result.isOk) {
        setUser(result.data);
      }
      setLoading(false);
    })();
  }, []);

  const signIn = useCallback(async (userName, password) => {
    const result = await sendSignInRequest(userName, password);
    if (result.isOk) {


      console.log("hehehe",result);
      sessionStorage.setItem("user", JSON.stringify(result.data))
      setUser(result.data);
    }
    return result;
  }, []);

  const signOut = useCallback(() => {
    sessionStorage.removeItem('user')
    setUser();
  }, []);


  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }} {...props} />
  );
}

const AuthContext = createContext({});
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

