import { useAxios } from "../hooks/useAxios";
import EmployeeList from "../components/EmployeeList/EmployeeList";
import { EmployeeType, CustomAxiosResponse } from "../utils/data-types";

type EmployeeListResponse = CustomAxiosResponse<EmployeeType[]>;

function Home() {
  const {
    data: employeeList,
    error,
    isLoading,
  }: EmployeeListResponse = useAxios("");

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
