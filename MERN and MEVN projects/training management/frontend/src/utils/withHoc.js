import Header from "../components/Header"
import Footer from "../components/Footer/Footer"
import Navbar from "../components/Navbar"
import Toast from "../components/Toast/Toast"

const Layout = (header,WrappedComponent) => {
  return (props)=>{
    return (
    <>
    <Header header={header}/>
    <Navbar/>
    <WrappedComponent {...props} />
    <Toast/>
    <Footer/>
    </>
    );
  };
};
export default Layout;
