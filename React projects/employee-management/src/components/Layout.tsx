import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import {MessageContext} from '../contexts/MessageContext'
import Toast from './Toast/Toast'
import Sidebar from './Sidebar/Sidebar'

interface LayoutProps {
    children: React.ReactNode
}

function Layout({children}:LayoutProps) {
    const [message, setMessage]= React.useState<string>('');
    const [show, setShow] = React.useState<boolean>(false);
    return (
        <MessageContext.Provider value={{message,setMessage}}>
            <Header show={show} setShow={setShow}/>
            <Sidebar show={show} toggleSidebar={setShow}/>
            <main>
            {children}
            </main>
            <Toast/>
            <Footer/>
        </MessageContext.Provider>
    )
}

export default Layout