import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function BlogForm(props) {
    const [title, setTitle] = useState(props?.post.title || "");
    const [body, setBody] = useState(props?.post.body || "");
    const [author, setAuthor] = useState(props?.post.author || "");
    const {id} = useParams();

    const handleSubmit = (event) => {
        event.preventDefault(); //To prevent default event behavior
        const blog = {
            title,
            body,
            author,
            createdAt: props?.post.createdAt || new Date(),
        };
        props.handleSubmit(blog);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label className="form-label">Title:</label>
                <input
                    type="text"
                    required
                    className="form-input"
                    value={title}
                    minLength="3"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label className="form-label">Body:</label>
                <textarea
                    required
                    className="form-textarea"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
            </div>
            <div>
                <label className="form-label">Author:</label>
                <select
                    className="form-select"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="" disabled>
                        Select an author
                    </option>
                    <option value="Mario">Mario</option>
                    <option value="Yoshi">Yoshi</option>
                    <option value="Luigi">Luigi</option>
                </select>
            </div>
            <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
                {props.mode === "edit" && (
                    <Link to={`/blogs/${id}`} className="btn">
                        Back to Post
                    </Link>
                )}
                <button className="btn btn--red">
                    {props.mode === "edit" ? "Edit Post" : "Create Post"}
                </button>
            </div>
        </form>
    );
}

export default BlogForm;
