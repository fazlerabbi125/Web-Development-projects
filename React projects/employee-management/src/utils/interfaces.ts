export interface LayoutProps {
    children: React.ReactNode
}

export interface EmployeeInterface{
    id:number|string;  
    name: string;
    phone: string;
    email: string;
    address: string;
    date_of_birth: Date;
    role: string;
    dept: string;
    gender: string;
}

export interface EmployeeFormInterface{
    employee:any;
    mode:string;
    handleSubmit: (inputs:any)=>void;
}

export interface DeleteModalInterface{
    id:number;  
    toggleModal: ()=>void;
}

export interface SidebarPropTypes {
    show:boolean,
    toggleSidebar:(show:boolean)=>void;
}

export interface HeaderProps{
    show: boolean;
    setShow:(show:boolean) => void;
}