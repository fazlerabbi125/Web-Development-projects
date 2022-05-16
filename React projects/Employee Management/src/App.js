import Employee from './views/EmployeeDetails.js';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./views/Home";
import Create from "./views/Create";
import Edit from "./views/Edit";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="employee/:id" element={<Employee />} />
          <Route path="employee/create" element={<Create />} />
          <Route path="employee/:id/edit" element={<Edit />} />
          <Route
            path="*"
            element={
              <main style={{color:"white", padding: "1rem",textAlign:"center" }}>
                <h1>404. Page Not Found</h1>
              </main>
            }
          />
        </Routes>
      </Router>      
    </>
  );
}

export default App;
