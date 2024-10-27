/* eslint-disable react-refresh/only-export-components */
import { createContext, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const server = "https://fullstack-taskmate.onrender.com/taskmate/api/v1";

const Context = createContext({ isAuthenticated: false });

export const tempObject = {
  server,
  Context,
};

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
      }}
    >
      <App />
    </Context.Provider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper></AppWrapper>
  </StrictMode>
);
