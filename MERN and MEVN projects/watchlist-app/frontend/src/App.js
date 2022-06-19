import {Routes, Route} from "react-router-dom";
import Home from "./views/Home";
import Create from "./views/Create";
import Edit from "./views/Edit";
import About from "./views/About";
import Details from "./views/Details";
import UserWatchList from "./views/UserWatchList";
import { useState} from "react";
import MessageContext from "./contexts/MessageContext";
import ProtectedRoutes from "./components/custom_routes/ProtectedRoutes";
import AdminRoutes from "./components/custom_routes/AdminRoutes";
import GuestRoutes from "./components/custom_routes/GuestRoutes";
import ResetPassword from "./views/ResetPassword";
import ForgetPasswordPage from "./views/ForgetPasswordPage";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";

function App() {
  const [message, setMessage] = useState("");
  return (
    <MessageContext.Provider value={{message, setMessage}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/movie-series/:id" element={<Details />} />
        <Route element={<ProtectedRoutes/>}>
          <Route path="/watchlist" element={<UserWatchList />} />
        </Route>
        <Route element={<AdminRoutes/>}>
            <Route path="/movie-series/create" element={<Create />} />
            <Route path="/movie-series/:id/edit" element={<Edit />} />
        </Route>
        <Route element={<GuestRoutes/>}>
          <Route path="/forgot-password" element={<ForgetPasswordPage />} />
          <Route path="/reset-password/:token/:id" element={<ResetPassword />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route
          path="*"
          element={
            <main className="text-center text-danger mt-3">
              <h1>404. Page Not Found</h1>
            </main>
          }
        />
      </Routes>
      </MessageContext.Provider>
  );
}

export default App;
