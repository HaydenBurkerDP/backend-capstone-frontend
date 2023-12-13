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
    <div className="login-container">
      <div className="logo-wrapper"></div>
      <form>
        <h1>Please log in</h1>
        <label>Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />

        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
