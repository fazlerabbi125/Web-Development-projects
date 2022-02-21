import Navbar from './Navbar';/*Use components in JSX as either:
1) a self-closing tag: <Navbar/>
2)opening and closing tags: <Navbar></Navbar>
 */
import Home from './Home';
import Create from './Create';
import BlogDetails from './BlogDetails';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";//For react router components
//Components are structured in a way that they form a component tree
function App() { //root component of React app
  /*
  const title="Welcome to the homepage";
  const link="http://www.google.com";
  <p> {title} inside App component</p>
        <p>{[1,2,3,4,5]}</p>
        <p>{Math.random()*10}</p>
        <a href={link}>Google site</a>
  */
  return (
    <Router>
    <div className="App">
    <Navbar/>
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Home/>}/> 
          <Route path="/create" element={<Create/>}/>
          <Route path="/blogs/:id" element={<BlogDetails />}/>
          <Route
          path="*"
          element={
            <main style={{color:"red", padding: "1rem" }}>
            <p>404.Page Not Found</p>
           </main>
           }
          />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
