import Header from "./Header"
import Footer from "./Footer"
import Navbar from "./Navbar"

const withHOC = (header,WrappedComponent) => {
  return (props)=>{
    return (
    <>
    <Header header={header}/>
    <Navbar/>
    <WrappedComponent {...props} />
    <Footer/>
    </>
    );
  };
};
export default withHOC;
