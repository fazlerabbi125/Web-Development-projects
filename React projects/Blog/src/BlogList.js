import { Link } from "react-router-dom";
function BlogList(props){
    //Props example
    return (
      <div className="blog-list">
        <h2>{ props.title }</h2>
        {props.blogs.map(blog => (
          <div className="blog-preview" key={blog.id} >
            <Link to={`/blogs/${blog.id}`}>
            <h2>{ blog.title }</h2>
            <p>Written by { blog.author }</p>
          </Link>
          </div>
        ))}
      </div>
    );
  }
   
  export default BlogList;