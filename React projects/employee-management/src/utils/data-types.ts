export interface EmployeeType {
    readonly id: number | string;
    name: string;
    phone: string;
    email: string;
    address: string;
    date_of_birth: Date;
    role: string;
    dept: string;
    gender: string;
}

export type API_Error = string | null;

export type DataLoad = boolean;
