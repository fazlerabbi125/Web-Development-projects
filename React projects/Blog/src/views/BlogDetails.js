import { useParams, useNavigate, Link } from "react-router-dom";
import useFetch, { API_route_prefix } from "../hooks/useFetch";
import styled from "styled-components";

const BlogDetails = () => {
  const { id } = useParams(); //For using route parameters
  const { data: blog, error, isPending } = useFetch("/blogs/" + id);
  const navigate = useNavigate(); //hook for re-direct
  const handleClick = () => {
    //Delete blog from JSON database via DELETE request
    fetch(API_route_prefix + `/blogs/${blog.id}`, {
      method: "DELETE",
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <BlogDetailsWrapper>
      {isPending && <div style={{ textAlign: "center" }}>Loading...</div>}
      {error && <div className="fetch-error">{error}</div>}
      {!error && blog && (
        <article>
          <h2 className="details-title">{blog.title}</h2>
          <div className="details-subtitle">Author: {blog.author}</div>
          <div>Created: {new Date(blog.createdAt).toLocaleString()}</div>
          <div className="details-actions">
            <Link
              className="btn"
              state={{ blog }}
              to={`/blogs/${blog.id}/edit`}
            >
              Edit
            </Link>
            <button className="btn btn--red" onClick={handleClick}>
              Delete
            </button>
          </div>
          <div className="details-body">{blog.body}</div>
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
    font-weight: 600;
    margin-bottom: 15px;
  }

  .details-body {
    margin: 15px 0;
  }

  .details-actions {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 15px;
    margin-left: auto;
  }
`;

export default BlogDetails;
