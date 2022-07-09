import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import History from "./pages/History";
import Graphs from "./pages/Graphs";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/redux/hooks";
import { resetAuth } from "./redux/auth/authSlice";
import { resetTransactions } from "./redux/transactions/transactionSlice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(resetAuth());
    dispatch(resetTransactions());
  };

  useEffect(() => {
    window.addEventListener("unload", handleLogout);
    return () => {
      window.removeEventListener("unload", handleLogout);
    };
  }, []);

  return (
    <>
      <Router>
        <div className="margins">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/history" element={<History />} />
            <Route path="/graphs" element={<Graphs />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
