import React from 'react';
import {Routes, Route, Outlet} from 'react-router-dom'
import Home  from './views/Home';
import EmployeeDetails from './views/EmployeeDetails/EmployeeDetails';
import CreateEmployee from './views/CreateEmployee';
import EditEmployee from './views/EditEmployee';
import About from './views/About';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="employee" element={<Outlet/>}>
          <Route path="create" element={<CreateEmployee/>}/>
          <Route path=":id/details" element={<EmployeeDetails/>}/>
          <Route path=":id/edit" element={<EditEmployee/>}/>
        </Route>
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
