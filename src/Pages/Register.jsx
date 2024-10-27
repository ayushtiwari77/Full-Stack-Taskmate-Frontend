import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { tempObject } from "../main";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(tempObject.Context);
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const item = await axios.post(
        `${tempObject.server}/register`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setIsAuthenticated(true);

      setLoading(false);
      toast.success(item.data.message);
    } catch (error) {
      setLoading(false);
      setIsAuthenticated(false);
      toast.error(error.response.data.message);
    }
  }

  if (isAuthenticated) {
    return navigate("/home");
  }

  return (
    <main>
      <form onSubmit={handleRegister}>
        <label htmlFor="name"> Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          Register
        </button>
        <p>OR</p>
        <Link className="links" to="/">
          Login
        </Link>
      </form>
    </main>
  );
};

export default Register;
