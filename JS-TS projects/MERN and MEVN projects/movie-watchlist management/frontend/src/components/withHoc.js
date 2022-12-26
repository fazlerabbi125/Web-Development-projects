import Header from "./Header"
import Footer from "./Footer"
import Navbar from "./Navbar"
import Toast from "./Toast"
const withHOC = (header,WrappedComponent) => {
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
export default withHOC;
