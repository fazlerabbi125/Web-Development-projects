import Header from "./Header"
import Footer from "./Footer/Footer"
import Navbar from "./Navbar"
import Toast from "./Toast/Toast"
import {useSelector} from "react-redux"
const Layout = ({header, children}) => { //HOC
  const auth= useSelector((state) => state.authUser.userData);
  return (
    <>
      <Header header={header}/>
      {auth && <Navbar/>}
      <main>{children}</main>
      <Toast/>
      <Footer/>
    </>
    );
};

export default Layout;
