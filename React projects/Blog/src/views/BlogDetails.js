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
          <h2 className="details-title">{blog.title}</h2>
          <div className="details-subtitle">Author: {blog.author}</div>
          <div className="details-body">{blog.body}</div>
          <button className="btn btn--red" onClick={handleClick}>
            Delete
          </button>
        </article>
      )}
    </BlogDetailsWrapper>
  );
};

const BlogDetailsWrapper = styled.div`
  .details-title {
    font-size: 25px;
    color: #f1356d;
    margin-bottom: 10px;
    text-align: center;
  }

  .details-subtitle {
    font-style: italic;
    font-weight: 600;
  }

  .details-body {
    margin: 20px 0;
  }
`;

export default BlogDetails;
