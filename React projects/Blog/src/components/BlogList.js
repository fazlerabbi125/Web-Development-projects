import { Link } from "react-router-dom";
import styled from "styled-components";

function BlogList(props) {
  //Props example
  return (
    <BlogListWrapper>
      <h2>{props.title}</h2>
      {props.blogs.map((blog) => (
        <Link
          to={`/blogs/${blog.id}`}
          className="blog-list__item"
          key={blog.id}
        >
          <h2>{blog.title}</h2>
          <p>Written by: {blog.author}</p>
          <p>Created: {(new Date(blog.createdAt)).toLocaleString()}</p>
        </Link>
      ))}
    </BlogListWrapper>
  );
}

const BlogListWrapper = styled.div`
  .blog-list__item {
    display: block;
    text-decoration: none;
    padding: 10px 16px;
    margin: 20px 0;
    border: 1px solid #e3e1e1;
    color: #141413;
  }

  .blog-list__item:hover {
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  }

  .blog-list__item h2 {
    font-size: 20px;
    color: #f1356d;
    margin-bottom: 8px;
  }
`;

export default BlogList;
