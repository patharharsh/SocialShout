import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
 
export const AccontContext = createContext();

const UserContext = (props) => { 
  const [user, setUser] = useState({ loggedIn: null });
  const navigate = useNavigate();
  useEffect(() => { 
    axios
      .get("http://localhost:9000/users/login", {
        withCredentials: true, // should be there 
        credentials: "include", // should be there
      })
      .catch((error) => { 
        setUser({ loggedIn: false }); 
        return; 
      })
      .then((response) => {
          if (!response || response.status >= 400) {
              setUser({ loggedIn: false });
              return;
            }  
            const data =  response.data;
            return data;
        }).then((data) => {
        if (!data) {
            setUser({ loggedIn: false });
            return;
        }
        setUser(data)
        navigate('/home')
      });
  },[]);

  return (
    <AccontContext.Provider value={{ user, setUser }}>
      {props.children}
    </AccontContext.Provider>
  );
};

export default UserContext;
