import React from 'react'
import { Title } from '@mantine/core';
interface HeaderProps {
    className?: string;
    children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header className='text-center'>
            <Title className={props.className}>
                {props.children}
            </Title>
        </header>
    )
}

export default Header