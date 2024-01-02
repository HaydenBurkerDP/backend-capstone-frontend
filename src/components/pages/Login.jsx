import { useState } from "react";

import { useAuthInfo } from "../../context/authContext";

import goalLogo from "../../assets/images/Goal.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuthInfo();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password).catch((err) => {
      console.error("Login error", err);
      setPassword("");
    });
  };

  return (
    <div className="login-page-container">
      <div className="logo-wrapper">
        <img className="logo" src={goalLogo} alt="Goal Logo" />
        <h1>GOALS</h1>
      </div>

      <div className="login-wrapper">
        <div className="text-wrapper">
          <h2>Please log in</h2>
        </div>

        <form className="login-form">
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
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
