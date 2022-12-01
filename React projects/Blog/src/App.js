import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Create from "./views/Create";
import Edit from "./views/Edit";
import Footer from "./components/Footer";
import { useState } from "react";
import MessageContext from "./contexts/MessageContext";
import Navbar from "./components/Navbar";
import BlogDetails from "./views/BlogDetails";
import NotFound from "./views/NotFound";

function App() {
  const [message, setMessage] = useState("");
  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/blogs/:id/edit" element={<Edit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </MessageContext.Provider>
  );
}

export default App;
