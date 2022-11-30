import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import styled from "styled-components";

const BlogDetails = () => {
  const { id } = useParams(); //For using route parameters
  const { data: blog, error, isPending } = useFetch("/blogs/" + id);
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
    <BlogDetailsWrapper>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button className="btn btn--red" onClick={handleClick}>
            Delete
          </button>
        </article>
      )}
    </BlogDetailsWrapper>
  );
};

const BlogDetailsWrapper = styled.div`
  h2 {
    font-size: 20px;
    color: #f1356d;
    margin-bottom: 10px;
    text-align: center;
  }

  div {
    margin: 20px 0;
  }
`;

export default BlogDetails;
