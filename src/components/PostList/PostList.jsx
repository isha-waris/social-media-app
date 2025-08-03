import { useContext, useEffect, useState } from "react";
import Post from "../Post/Post";
import { PostList as PostListData } from "../../store/post-list-store";
import WelcomeMessage from "../WelcomeMessage";
import LoadingSpinner from "../LoadingSpinner";

export default function PostList() {
  const { postList, addInitialPosts } = useContext(PostListData);
  console.log(postList);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        setFetching(false);
      });
    return () => {
      console.log("Cleaning Up UseEffect");
      controller.abort();
    };
  }, []);
  return (
    <>
      {fetching && <LoadingSpinner />}
      {!fetching && postList.length === 0 && <WelcomeMessage />}
      {!fetching && postList.map((post) => <Post key={post.id} post={post} />)}
    </>
  );
}
