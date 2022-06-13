import {Routes, Route} from "react-router-dom";
import Home from "./views/Home";
import Create from "./views/Create";
import Edit from "./views/Edit";
import About from "./views/About";
import Details from "./views/Details";
import UserWatchList from "./views/UserWatchList";
import { useState} from "react";
import MessageContext from "./contexts/MessageContext";

function App() {
  const [message, setMessage] = useState("");
  return (
    <MessageContext.Provider value={{message, setMessage}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="movie-series/create" element={<Create />} />
        <Route path="movie-series/:id" element={<Details />} />
        <Route path="movie-series/:id/edit" element={<Edit />} />
        <Route path="watchlist" element={<UserWatchList />} />
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
