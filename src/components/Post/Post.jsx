import PropTypes from "prop-types";
import { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { CiCircleList } from "react-icons/ci";
import { PostList } from "../../store/post-list-store";

export default function Post({ post }) {
  const { deletePost, editPost } = useContext(PostList);
  return (
    <div className="card post-card" style={{ width: "30rem" }}>
      <div className="card-body">
        <h5 className="card-title d-flex align-items-center justify-content-between">
          {post.title}
          <div className="dropdown ms-auto">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid #ccc",
              }}
            >
              <CiCircleList />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={() => editPost(post.id)}
                >
                  Edit Post <CiEdit />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => deletePost(post.id)}
                >
                  Delete Post <AiFillDelete />
                </button>
              </li>
            </ul>
          </div>
        </h5>
        <p className="card-text">{post.body}</p>
        {Array.isArray(post.tags) && post.tags.length > 0 ? (
          post.tags.map((tag) => (
            <span key={tag} className="badge text-bg-primary hashtag">
              {tag}
            </span>
          ))
        ) : (
          <p>No tags available</p>
        )}
        <div className="alert alert-success reactions" role="alert">
          This post has {post.reactions.likes} likes and{" "}
          {post.reactions.dislikes} dislikes.
        </div>
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    reactions: PropTypes.shape({
      likes: PropTypes.number.isRequired,
      dislikes: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
