import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_route_prefix } from "../hooks/useFetch";
import BlogForm from "../components/BlogForm";

const Create = () => {
  const navigate = useNavigate(); //hook for re-direct

  const handleCreate = (blog) => {
    //Insert blog into JSON database via POST request
    fetch(`${API_route_prefix}/blogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      navigate("/"); //for re-direct
    });
  };

  return (
    <BlogCreateWrapper>
      <h2 className="page-title">Add a New Blog Post</h2>
      <BlogForm post={{}} handleSubmit={handleCreate} mode="create" />
    </BlogCreateWrapper>
  );
};

const BlogCreateWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  text-align: center;

  .page-title {
    font-size: 25px;
    color: #f1356d;
    margin-bottom: 30px;
  }
`;

export default Create;
