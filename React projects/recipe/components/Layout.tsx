import React, { ReactElement } from 'react'
import Footer from './Footer';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactElement | ReactElement[];
}

export default function Layout(props: LayoutProps) {
  return (
    <React.Fragment>
      <Navbar />
      <main>
        {props.children}
      </main>
      <Footer />
    </React.Fragment>
  )
}