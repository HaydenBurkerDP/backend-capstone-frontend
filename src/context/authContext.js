import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useHistory, useLocation } from "react-router-dom";

import fetchWrapper from "../util/apiWrapper";

const AuthContext = createContext();
const loginPath = "/login";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!Cookies.get("auth")) {
      history.push(loginPath);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    fetchWrapper("/user/me", "GET", null, signal)
      .then((res) => {
        setUser(res.user);
        if (location.pathname === loginPath) history.push("/");
      })
      .catch((e) => {
        if (!signal.aborted) {
          Cookies.remove("auth");
          history.push(loginPath);
        }
      });

    return () => controller.abort();
  }, [location.pathname, history]);

  const login = (email, password) => {
    return fetchWrapper(
      "/user/auth",
      "POST",
      {
        email: email,
        password: password,
      },
      null,
      null,
      false
    ).then((res) => {
      Cookies.set("auth", res.auth_info.auth_token, { expires: 0.5 });
      history.push("/");
      return res;
    });
  };

  const logout = () => {
    return fetchWrapper("/user/logout", "PUT").then((res) => {
      Cookies.remove("auth");
      history.push(loginPath);
      return res;
    });
  };

  const values = { login, logout, user };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuthInfo = () => {
  return useContext(AuthContext);
};
