import "./App.css";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="transition-colors duration-300 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
  <Navbar />
  <Outlet />
</div>

  );
}

export default App;
