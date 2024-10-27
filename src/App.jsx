import { AllRoutes } from "./routes/AllRoutes";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <AllRoutes></AllRoutes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
