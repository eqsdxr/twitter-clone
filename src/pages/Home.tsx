import Feed from "../components/Feed.tsx";

function Home() {
  return (
    <>
      <div className="overflow-y w-150 bg-pink-800 border-4 border-white">
        <div className="flex justify-evenly w-full border-b-4 border-white">
          <div className="h-12 content-center">Posts</div>
          <div className="h-12 content-center">Hashtags</div>
          <div className="h-12 content-center">News</div>
        </div>
      </div>
      <Feed feedType={0} username="eqsdxr" />
    </>
  );
}

export default Home;
