import {RightBlock} from "../components/RightBlock.tsx";
import {Feed} from "../components/Feed.tsx";
import {LeftBlock} from "../components/LeftBlock.tsx";

function Home() {
  return (
    <>
      <LeftBlock />
      <Feed />
      <RightBlock />
    </>
  );
}

export default Home;
