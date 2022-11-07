import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const BlogDetails = () => {
  const { id } = useParams(); //For using route parameters
  const { data: blog, error, isPending } = useFetch(
    "http://localhost:8000/blogs/" + id
  );
  const navigate = useNavigate(); //hook for re-direct
  const handleClick = () => {
    //Delete blog from JSON database via DELETE request
    fetch("http://localhost:8000/blogs/" + blog.id, {
      method: "DELETE",
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleClick}>delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
