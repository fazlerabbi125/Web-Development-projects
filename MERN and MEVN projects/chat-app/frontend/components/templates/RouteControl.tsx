import React from 'react'
import routes from "../../utils/routes";
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import AuthLayout from './AuthLayout';

export interface RouteControlProps {
    children: React.ReactNode;
}

const auth: { isAdmin: boolean } = { isAdmin: false }
export default function RouteControl(props: RouteControlProps) {
    const router = useRouter();
    if (routes.adminRoutes.includes(router.pathname) && !auth.isAdmin) {
        router.push("/sign-in");
    }
    else if (routes.userRoutes.includes(router.pathname) && auth.isAdmin) {
        router.push("/sign-in");
    }
    return (
        <AuthLayout>
            {props.children}
        </AuthLayout>
    )
}
