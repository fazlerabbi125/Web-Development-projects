import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const navigate = useNavigate(); //hook for re-direct

  const handleSubmit = (event) => {
    event.preventDefault(); //To prevent default event behavior
    const blog = { title, body, author };
    //Insert blog into JSON database via POST request
    fetch("http://localhost:8000/blogs/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      navigate("/"); //for re-direct
    });
  };

  return (
    <BlogCreateWrapper>
      <h2>Add a New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <label className="form-label">Blog title:</label>
        <input
          type="text"
          required
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="form-label">Blog body:</label>
        <textarea
          required
          className="form-textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label className="form-label">Blog author:</label>
        <select
          className="form-select"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
          <option value="luigi">luigi</option>
        </select>
        <button className="btn btn--red">Add Blog</button>
      </form>
    </BlogCreateWrapper>
  );
};

const BlogCreateWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  text-align: center;

  h2 {
    font-size: 20px;
    color: #f1356d;
    margin-bottom: 30px;
  }
`;

export default Create;
