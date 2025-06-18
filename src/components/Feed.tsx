import { useState, useEffect, useCallback } from "react";
import { Post } from "./Post.tsx";
import LoadingSpinner from "./Loading.tsx";

const getPostsEndpoint = (feedType: number, username: string) => {
  switch (feedType) {
    case 1:
      return "/api/posts/hashtags";
    case 2:
      return `/api/posts/news/`;
    case 3:
      return `/api/posts/following/${username}`;
    default:
      return "/api/posts/all";
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
      setPosts(data);
    } catch (err: any) {
      setError(err.Message);
    }
    setIsLoading(false);
  }, [feedType, username]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, isLoading, error, refetch: fetchPosts };
};

type FeedProps = {
  feedType: number;
  username: string;
};

const Feed: React.FC<FeedProps> = ({ feedType, username }) => {
  const { posts, isLoading, error, refetch } = usePosts(feedType, username);

  return (
    <div className="overflow-y-auto max-h-screen no-scrollbar">
      <Post
        key={3}
        avatarUrl="https://boringapi.com/api/v1/photos"
        content="Have you noticed this weird noize from the sky too?"
        timestamp="1h"
        username="eqsdxr"
        fetchMedia={refetch}
      />
      <Post
        key={7}
        avatarUrl="https://boringapi.com/api/v1/photos"
        content="Have you noticed this weird noize from the sky too?"
        timestamp="1h"
        username="eqsdxr"
        fetchMedia={refetch}
      />

      <Post
        key={8}
        avatarUrl="https://boringapi.com/api/v1/photos"
        content="Have you noticed this weird noize from the sky too?"
        timestamp="1h"
        username="eqsdxr"
        fetchMedia={refetch}
      />

      <Post
        key={9}
        avatarUrl="https://boringapi.com/api/v1/photos"
        content="Have you noticed this weird noize from the sky too?"
        timestamp="1h"
        username="eqsdxr"
        fetchMedia={refetch}
      />

      <Post
        key={10}
        avatarUrl="https://boringapi.com/api/v1/photos"
        content="Have you noticed this weird noize from the sky too?"
        timestamp="1h"
        username="eqsdxr"
        fetchMedia={refetch}
      />

      <Post
        key={5}
        avatarUrl="https://boringapi.com/api/v1/photos"
        content="What is this strange noise???"
        timestamp="1h"
        username="gtioje"
        fetchMedia={refetch}
      />
      <Post
        key={4}
        avatarUrl="https://boringapi.com/api/v1/photos"
        content="This day has finally come..."
        timestamp="1h"
        username="rewsefx"
        fetchMedia={refetch}
      />
      {isLoading && <LoadingSpinner />}

      {!isLoading && posts?.length === 0 && (
        <p className="text-center my-4">No posts</p>
      )}

      {error && <p className="text-center my-4 text-red-500">{error}</p>}

      {!isLoading && posts && (
        <div className="">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
