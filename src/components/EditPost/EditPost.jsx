import { useContext, useEffect, useRef } from "react";
import { PostList } from "../../store/post-list-store"; // Adjust the import path as needed

export default function EditPost() {
  const { postList, editPost } = useContext(PostList);
  const post = postList.find((post) => post.id === post.postId);
  const userIdRef = useRef();
  const postTitleRef = useRef();
  const postBodyRef = useRef();
  const reactionsRef = useRef();
  const tagsRef = useRef();

  // Pre-fill the form with the existing post data when the component mounts
  useEffect(() => {
    if (post) {
      userIdRef.current.value = post.userId;
      postTitleRef.current.value = post.title;
      postBodyRef.current.value = post.content;
      reactionsRef.current.value = post.reactions;
      tagsRef.current.value = post.tags.join(" "); // assuming tags are an array
    }
  }, [post]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedPost = {
      ...post,
      userId: userIdRef.current.value,
      title: postTitleRef.current.value,
      content: postBodyRef.current.value,
      reactions: reactionsRef.current.value,
      tags: tagsRef.current.value.split(" "), // convert space-separated tags back to an array
    };

    // Call the context method to update the post
    editPost(updatedPost);
    userIdRef.current.value = " ";
    postTitleRef.current.value = "";
    postBodyRef.current.value = "";
    reactionsRef.current.value = "";
    tagsRef.current.value = "";
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          Enter your User Id here
        </label>
        <input
          type="text"
          ref={userIdRef}
          className="form-control"
          id="userId"
          placeholder="Your User Id"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          ref={postTitleRef}
          className="form-control"
          id="title"
          placeholder="How're you feeling today.."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">
          Post Content
        </label>
        <textarea
          ref={postBodyRef}
          rows="4"
          className="form-control"
          id="content"
          placeholder="Tell us more about it..."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
          Number of reactions
        </label>
        <input
          type="text"
          ref={reactionsRef}
          className="form-control"
          id="reactions"
          placeholder="How many people reacted to this post"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Enter your hashtags here
        </label>
        <input
          type="text"
          ref={tagsRef}
          className="form-control"
          id="tags"
          placeholder="Please enter tags using space"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Update Post
      </button>
    </form>
  );
}
