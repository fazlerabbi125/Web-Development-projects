import React from 'react'

interface HeaderProps {
    className?: string;
    children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header className={`text-zinc-50 ${props.className||""}`}>
            {props.children}
        </header>
    )
}

export default Header