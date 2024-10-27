import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tempObject } from "../main";
import toast from "react-hot-toast";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(tempObject.Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loginFunc(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const item = await axios.post(
        `${tempObject.server}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      setIsAuthenticated(true);
      toast.success(item.data.message);
      return navigate("/home");
    } catch (error) {
      setIsAuthenticated(false);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <main>
      <form className="login-form" onSubmit={loginFunc}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="enter email"
          required
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="enter Password"
          required
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button id="login-btn" type="submit" disabled={loading}>
          Login
        </button>
        <p>OR</p>
        <Link className="links" to="/register">
          Sign Up
        </Link>
      </form>
    </main>
  );
};

export default Login;
