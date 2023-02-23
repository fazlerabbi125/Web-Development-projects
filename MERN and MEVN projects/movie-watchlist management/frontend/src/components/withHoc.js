import Header from "./Header"
import Footer from "./Footer"
import Navbar from "./Navbar"
import Toast from "./Toast"
const withHOC = (WrappedComponent, header) => {
  return (props) => {
    return (
      <>
        <Navbar />
        {header && <Header header={header} />}
        <WrappedComponent {...props} />
        <Toast />
        <Footer />
      </>
    );
  };
};
export default withHOC;
