import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  
  const [isLoading,setIsLoading]=useState(true);
  const [token,setToken] = useState(localStorage.getItem("token"));
  const [user,setUser]=useState("");
  const [services,setServices]=useState([])
  const authorisationToken = `Bearer ${token}`
  console.log("authorisationToken",authorisationToken)

  //function to stored the token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken)
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;
  console.log(isLoggedIn)

  const LogoutUser = ()=>{
    setToken("");
    return localStorage.removeItem("token");
  }

  //JWT AUTHENTICATION - to get the currently loggedin user data

  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorisationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();

        // our main goal is to get the user data 👇
        setUser(data.userData);
        setIsLoading(false);
      } else {
        console.error("Error fetching user data");
        setIsLoading(false);
        
      }
    } catch (error) {
      console.error("Error fetching user data");
      console.log(error);
    }
  };

  //to fetch services data from database
  const getServices = async ()=>{
    try {
      const response = await fetch("http://localhost:5000/api/data/service",{
        method:"GET",
      })
      if(response.ok){
        const services = await response.json();
        console.log("services.data",services.msg)
        setServices(services.msg)
      }
    } catch (error) {
      console.log(`services frontend ${error}`)
    }
  }

  useEffect(()=>{
    getServices();
    userAuthentication();
  },[])
  
  return (
    <AuthContext.Provider value={{isLoggedIn, storeTokenInLS,LogoutUser ,user,services,authorisationToken,isLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

//useAuth function now contains the value provided by the AuthContext.Provider higher up in the component tree
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
