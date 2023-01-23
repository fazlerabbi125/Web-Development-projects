import React from 'react'
import Navbar from '../organisms/Navbar'

interface AuthLayoutProps {
    children: React.ReactNode
}

export default function AuthLayout(props: AuthLayoutProps) {
    return (
        <div>{props.children}</div>
    )
}
