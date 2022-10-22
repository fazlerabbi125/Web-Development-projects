import React from "react";
import { useAxios } from "../hooks/useAxios";
import EmployeeList from "../components/EmployeeList/EmployeeList";
import { API_Error, DataLoad, EmployeeType } from "../utils/data-types";

function Home() {
  const {
    data: employeeList,
    error,
    isLoading,
  }: {
    data: EmployeeType[];
    error: API_Error;
    isLoading: DataLoad;
  } = useAxios("");

  return (
    <section>
      {isLoading && (
        <h1 className="loading">
          Loading <i className="fa fa-spinner fa-spin"></i>
        </h1>
      )}
      {error && <h1 className="error">{error}</h1>}
      {!isLoading && !error && <EmployeeList employeeList={employeeList} />}
    </section>
  );
}

export default Home;
