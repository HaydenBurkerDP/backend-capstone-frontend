import { useState } from "react";

import { useAuthInfo } from "../../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuthInfo();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password).catch(console.error);
  };

  return (
    <div className="login-page-container">
      <div className="logo-wrapper">
        <h1>LOGO</h1>
      </div>

      <div className="login-wrapper">
        <div className="text-wrapper">
          <h2>Please log in</h2>
        </div>

        <form className="login-form">
          <div className="input-wrapper">
            <label>Email</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="input-wrapper">
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="submit-btn" type="submit" onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
