import React from 'react'
import routes from "../../utils/routes";
import { useRouter } from 'next/router';
import { NextComponentType, NextPageContext } from 'next';

export interface RouteControlProps {
    children: NextComponentType<NextPageContext, any, any>;
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
    return props.children
}
