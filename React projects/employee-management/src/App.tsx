import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Home  from './views/Home';
import EmployeeDetails from './views/EmployeeDetails/EmployeeDetails';
import CreateEmployee from './views/CreateEmployee';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="employee/:id/details" element={<EmployeeDetails/>}/>
        <Route path="employee/create" element={<CreateEmployee/>}/>
        <Route
          path="*"
          element={
            <main className="error">
              <h1>404. Page Not Found</h1>
            </main>
          }
        />
      </Routes>
  );
}

export default App;
