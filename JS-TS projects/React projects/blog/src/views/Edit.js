import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { API_route_prefix } from "../hooks/useFetch";
import BlogForm from "../components/BlogForm";

function Edit() {
    const navigate = useNavigate(); //hook for re-direct
    const {
        state: { blog },
    }= useLocation(); // get blog post passed via Link or useNavigate

    const handleEdit = (post) => {
        //Edit blog in JSON database via PUT/PATCH request (PUT performs upsert whereas PATCH only updates).
        fetch(`${API_route_prefix}/blogs/${blog.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post),
        }).then(() => {
            navigate(`/blogs/${blog.id}`); //for re-direct
        });
    };

    return (
        <BlogEditWrapper>
            <h2 className="page-title">Edit Blog Post</h2>
            <BlogForm post={blog} handleSubmit={handleEdit} mode="edit" />
        </BlogEditWrapper>
    );
}

const BlogEditWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  text-align: center;

  .page-title {
    font-size: 25px;
    color: #f1356d;
    margin-bottom: 30px;
  }
`;

export default Edit;
