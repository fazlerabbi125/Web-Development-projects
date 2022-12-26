import { AxiosResponse } from "axios";

export interface EmployeeType {
  readonly id: number | string;
  name: string;
  phone: string;
  email: string;
  address: string;
  date_of_birth: Date|string;
  role: string;
  dept: string;
  gender: string;
}

export interface CustomAxiosResponse<T = any> {
  isLoading?: boolean;
  error?: string | null;
  data: AxiosResponse<T>['data']; // data will have type T. Refer to axios/index.ts in node_modules
}