import Header from "./Header"
import Footer from "./Footer"
import Navbar from "./Navbar"
import Toast from "../Toast"
import { useSelector } from "react-redux"

const Layout = ({ children }) => { //HOC
  const auth = useSelector((state) => state.authUser.userData);
  return (
    <>
      <Header />
      {auth && <Navbar />}
      <main>{children}</main>
      <Toast />
      <Footer />
    </>
  );
};

export default Layout;
