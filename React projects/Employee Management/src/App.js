import Employee from './views/EmployeeDetails/EmployeeDetails.js';
import {Routes, Route} from "react-router-dom";
import Home from "./views/Home";
import Create from "./views/Create";
import Edit from "./views/Edit";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="employee/:id" element={<Employee />} />
        <Route path="employee/create" element={<Create />} />
        <Route path="employee/:id/edit" element={<Edit />} />
        <Route
          path="*"
          element={
            <main className="error">
              <h1>404. Page Not Found</h1>
            </main>
          }
        />
      </Routes>
    </>
  );
}

export default App;
