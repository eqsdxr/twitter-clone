import { useState } from "react";
import Feed from "../components/Feed.tsx";

function Home() {
  const [feedType, setFeedType] = useState(0);
  return (
    <div className="flex flex-col">
      <div className="w-140">
        <div className="flex justify-evenly w-full border-1 border-white mt-2 mb-0.5">
          <button
            className="h-12 content-center "
            type="button"
            onClick={() => setFeedType(0)}
          >
            Posts
          </button>
          <button
            className="h-12 content-center"
            type="button"
            onClick={() => setFeedType(1)}
          >
            Hashtags
          </button>
          <button
            className="h-12 content-center"
            type="button"
            onClick={() => setFeedType(2)}
          >
            News
          </button>
        </div>
      </div>
      <Feed feedType={feedType} username="eqsdxr" />
    </div>
  );
}

export default Home;
