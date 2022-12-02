import BlogList from "../components/BlogList"; //For props usage and JSX list iteration demo
import useFetch from "../hooks/useFetch"; //import custom hook

const Home = () => {
  const { data: blogs, isPending, error } = useFetch("/blogs"); //custom hook
  return (
    <section className="home">
      {error && <div className="fetch-error">{error}</div>}
      {isPending && <div style={{ textAlign: "center" }}>Loading...</div>}
      {!error && blogs && <BlogList blogs={blogs} title="All Posts" />}
    </section>
  );
};

export default Home;

/*
import {useState,useEffect} from 'react';

    let [count,setCount] = useState(1);//useState hook
    function increaseClick(){ //Event object e not mandatory as parameter if it is not used in function
      //For applying useState hook
        setCount(++count);     
    }
    const [authors, setAuthors] = useState([
        { author: 'mario', id: 1 },
        { author: 'yoshi', id: 2 },
        {author: 'mario', id: 3 }
      ]); //List for output. Use map function and JSX key attribute in template
    function handleClick1(e){
        console.log("Inside handleClick1");
        //Functions with no parameters use event object as first parameter by default 
        console.log(e);//Event object e
    }
    function handleClick2(name){
        console.log("Inside handleClick2");
        console.log(`Hello ${name}`);
    }
    function handleClick3(name,e){
        console.log("Inside handleClick3");
        console.log(`Hello ${name}`);
        //Functions with parameters can use event object after it is passed by the function wrapping the click function
        console.log(e);//Event object e
    }
    const handleDelete = (id) => {
      const newBlogs = blogs.filter(blog => blog.id !== id);//array only consists of elements which do not match the passed id
      setBlogs(newBlogs);
    }
    const [name, setName] = useState('mario');
    useEffect(() => {
      console.log('use effect ran');
    }, [name])//useEffect function trigger every time the value of name changes 
    const {data:blogs,isPending,error} = useFetch('http://localhost:8000/authors');//custom hook
    
    return ( 
        <div className="home">
        <h2>Homepage</h2>
        <p>Count: {count}</p>
        <p>Name: {name}</p>
        <p>
        <button onClick={handleClick1}>Click-1</button>
        <button onClick={()=>handleClick2("world")}>Click-2</button>
        <button onClick={(e)=>handleClick3("world",e)}>Click-3</button>
        <button onClick={increaseClick}>Increase Count</button>
        <button onClick={() =>{
          setName(name.split('').reverse().join(''));
        }
          }>Reverse name</button>
          </p>
          {authors && <div className="blog-list">
        <h2>All authors</h2>
        {authors.map(author => (
          <div className="blog-preview" key={author.id} >
            <p>Written by { author.name }</p>
          </div>
        ))}
      </div>}
        { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { blogs && BlogList blogs={blogs} title="All Blogs" handleDelete={handleDelete}/>
        </div>
    );
}
 */
