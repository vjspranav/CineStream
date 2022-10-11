import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Constants from "./Constants";

// Custom imports
import Layout from "./pages/Layout";

export const CineStreamContext = createContext();

function App() {
  useEffect(() => {
    const init = async () => {
      try {
        let curUser = JSON.parse(localStorage.getItem("user"));
        if (curUser)
          await axios
            .get(`${Constants.BACKEND_URL}`, {
              headers: { "x-access-token": curUser.token },
            })
            .then(() => {
              setUser(curUser);
              setLoggedIn(true);
            })
            .catch((err) => {
              console.log(err);
              setUser({});
              setLoggedIn(false);
            });
      } catch (e) {
        localStorage.setItem("user", "{}");
      }
    };
    init();
  }, []);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  return (
    <CineStreamContext.Provider
      value={{
        loggedIn,
        user,
        setLoggedIn,
        setUser,
      }}
    >
      <div className="App">
        <Layout />
      </div>
    </CineStreamContext.Provider>
  );
}

export default App;
