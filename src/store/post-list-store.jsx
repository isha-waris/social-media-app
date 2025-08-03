import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

// The createContext function is used to create a new context called PostList
export const PostList = createContext({
  // this is the main design or context of implementtaing all the logic
  postList: [],
  addPost: () => {},
  addInitialPosts: () => {},
  editPost: () => {},
  deletePost: () => {},
});
//The postListReducer function is a reducer function that will be used to manage the state of the post list. The reducer function takes two arguments: currPostList (the current state of the post list) and action (an object that describes the action to be performed on the post list). The reducer function currently returns the current state of the post list without modifying it.
const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  switch (action.type) {
    case "DELETE_POST":
      newPostList = currPostList.filter(
        (post) => post.id !== action.payload.postId
      );
      break;

    case "EDIT_POST":
      return newPostList.map((post) =>
        post.id === action.payload.id ? { ...post, ...action.payload } : post
      );

    case "ADD_POST":
      // Add the new post to the list
      newPostList = [action.payload, ...currPostList];
      break;
    case "ADD_INITIAL_POSTS":
      newPostList = action.payload.posts;
      break;
    default:
      newPostList = currPostList; // default case to return the current list if no action matches
  }

  return newPostList;
};
export default function PostListProvider({ children }) {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);
  const addPost = (userId, postTitle, postBody, reactions, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userId: userId,
        tags: tags,
      },
    });
  };
  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      },
    });
  };

  const editPost = (postId, userId, postTitle, postBody, reactions, tags) => {
    dispatchPostList({
      type: "EDIT_POST",
      payload: {
        postId,
        userId: userId,
        title: postTitle,
        body: postBody,
        reactions: reactions,
        tags: tags,
      },
    });
  };
  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };
  return (
    <PostList.Provider
      value={{
        postList,
        addPost,
        addInitialPosts,
        editPost,
        deletePost,
      }}
    >
      {children}
    </PostList.Provider>
  );
}
PostListProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
