import { createContext, useEffect, useState } from "react";

export let UserContexet = createContext();

export default function UserContexetProvider(props) {
  const [userLogin, setuserLogin] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("useToken")) {
      setuserLogin(localStorage.getItem("useToken"));
    }
  }, []);
  return (
    <UserContexet.Provider value={{ userLogin, setuserLogin }}>
      {props.children}
    </UserContexet.Provider>
  );
}
