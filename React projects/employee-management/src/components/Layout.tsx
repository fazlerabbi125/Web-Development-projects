import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import {MessageContext} from '../contexts/MessageContext'
import Toast from './Toast/Toast'
import Sidebar from './Sidebar/Sidebar'
import { LayoutProps } from '../utils/interfaces'


function Layout({children}:LayoutProps) {
    const [message, setMessage]= React.useState<string>('');
    const [showBar, setShowBar] = React.useState<boolean>(false);

    return (
        <MessageContext.Provider value={{message,setMessage}}>
            <Header show={showBar} setShow={setShowBar}/>
            <Sidebar show={showBar} toggleSidebar={setShowBar}/>
            <main>{children}</main>
            <Toast/>
            <Footer/>
        </MessageContext.Provider>
    )
}

export default Layout