import { useState, useEffect, useCallback } from "react";
import { Post } from "./Post.tsx";
import LoadingSpinner from "./Loading.tsx";
import { formatPostDate } from "./utils.ts";

const getPostsEndpoint = (feedType: number, username: string) => {
  switch (feedType) {
    case 1:
      return "/api/v1/posts/hashtags";
    case 2:
      return `/api/v1/posts/news`;
    case 3:
      return `/api/v1/posts/following/${username}`;
    default:
      return "http://localhost:9999/v1/posts";
  }
};

const usePosts = (feedType: number, username: string) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const endpoint = getPostsEndpoint(feedType, username);
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.error || "Something went wrong while fetching posts",
        );
      }
      setPosts(data.results);
    } catch (err: any) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [feedType, username]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, isLoading, error};
};

type FeedProps = {
  feedType: number;
  username: string;
};

const Feed: React.FC<FeedProps> = ({ feedType, username }) => {
  const { posts, isLoading, error} = usePosts(feedType, username);
  return (
    <div className="overflow-y-auto max-h-screen no-scrollbar">
      {isLoading && <LoadingSpinner />}

      {!isLoading && posts?.length === 0 && (
        <p className="text-center my-4">No posts</p>
      )}

      {error && <p className="text-center my-4 text-red-500">{error}</p>}

      {!isLoading && posts && posts.map && (
        <>
          {posts.map((post, idx) => (
          <Post
            key={idx}
            avatarUrl={post.user.avatar_url}
            content={post.post.content}
            timestamp={formatPostDate(post.post.timestamp)}
            username={post.user.username}
            postId={post.post.id}
            media={post.post.media}
          />
          ))}
        </>
      )}
    </div>
  );
};

export default Feed;
