import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [admin, setAdmin] = useState(false); 
  const [isLoading, setIsLoading] = useState(true);
  const [complains, setComplains] = useState("");
  const authorizationToken = `Bearer ${token}`;

  const storeTokenInLocal = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken("");
    setAdmin(false); 
    return localStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    if (!token) return; //  not to run if no token is there
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
        const isAdmin = data.userData.isAdmin;
        setAdmin(isAdmin); // Setting admin 
      } else {
        console.log("Error fetching the data");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); 
    }
  };

  const getComplains = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/api/register/viewcomplain`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setComplains(data);
      }
    } catch (error) {
      console.log(`all complains frontend error: ${error}`);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    if (token) {
      userAuthentication();
      getComplains();
    }
  }, [token]); 

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLocal,
        LogoutUser,
        user,
        authorizationToken,
        isLoading,
        admin,
        complains,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider");
  }
  return authContextValue;
};
