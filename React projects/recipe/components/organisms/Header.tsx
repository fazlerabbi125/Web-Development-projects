import React from 'react'

interface HeaderProps {
    className?: string;
    children: string | React.ReactElement | React.ReactElement[];
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header className={`text-zinc-50 text-center ${props.className||""}`}>
            {props.children}
        </header>
    )
}

export default Header