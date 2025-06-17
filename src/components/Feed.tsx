import {useState, useEffect, useCallback} from "react";
import {Post} from "./Post.tsx";
import LoadingSpinner from "./Loading.tsx";

const getPostsEndpoint = (feedType: number, username: string) => {
    switch (feedType) {
      case 1:
        return "/api/posts/hashtags";
      case 2:
        return `/api/posts/news/`;
      case 3:
        return `/api/posts/following/${username}`
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
        throw new Error(data.error || "Something went wrong while fetching posts");
      }
      setPosts(data)
    } catch (err: any) {
      setError(err.Message);
    }
    setIsLoading(false);
  }, [feedType, username]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts])

  return { posts, isLoading, error, refetch: fetchPosts}
}

const Feed = (feedType: number, username: string, userID: string) => {
  const {
    posts,
    isLoading,
    error,
    refetch,
  } = usePosts(feedType, username);

  return (
    <>
      {isLoading && (
        <LoadingSpinner />
      )}
      {!isLoading && posts?.length === 0 && (
        <p className='text-center my-4'>No posts</p>
      )}
      {error && <p className="text-center my-4 text-red-500">{error}</p>}
      {!isLoading && posts && (
        <div className="">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
      <div className="overflow-y w-150 bg-pink-800 border-4 border-white">
      <div className="flex justify-evenly w-full border-b-4 border-white">
        <div className="h-12 content-center">Posts</div>
        <div className="h-12 content-center">Hashtags</div>
        <div className="h-12 content-center">News</div>
        </div>
      </div>
    </>
  );
}

export {Feed};
