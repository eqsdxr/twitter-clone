import { useState } from "react";

import FillerSvg from "../assets/filler.svg";

const SearchBar = () => {
  const [isShown, setIsShown] = useState(false);
  return (
    <form>
      <div className="border-1 border-white flex h-12 text-white justify-between">
        <input
          type="text"
          placeholder="Search"
          aria-label="Search"
          value=""
          className=""
          onClick={() => {
            setIsShown(true ? isShown : false);
          }}
        />
        <button type="button">
          <img src={FillerSvg} />
        </button>
      </div>
      {isShown && (
        <div className="">
          <h4>
            <span>Recent searches</span>
          </h4>
          <div>
            <div role="button">
              <span>deutsch</span>
              <button>
                <img src={FillerSvg} />
              </button>
            </div>
            <div role="button">
              <h4>
                <span>Search options</span>
              </h4>
              <div>
                <span>Only available when logged in.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

const LeftBlock = () => {
  return (
    <div className="h-screen w-72 gap-3 p-3 border-4 border-white">
      <SearchBar />
      <div></div>
      <div className="bg-white text-black w-full h-12 rounded-full content-center">
        Post
      </div>
    </div>
  );
};

export default LeftBlock;
