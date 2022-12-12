import React, { ReactElement } from 'react'
import Footer from './Footer';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactElement;
}

function Layout(props: LayoutProps) {
  return (
    <React.Fragment>
      <Navbar />
      {props.children}
      <Footer />
    </React.Fragment>
  )
}

export default Layout