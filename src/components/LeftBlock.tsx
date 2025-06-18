import { useState, useEffect, useRef } from "react";

import fillerSvg from "../assets/filler.svg";
import leftBlock from "../assets/leftBlock.jpg";

const SearchBar = () => {
  const [isShown, setIsShown] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsShown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      ref={containerRef}
    >
      <div className="border border-white flex h-12 text-white justify-between items-center px-2">
        <input
          type="text"
          placeholder="Search"
          aria-label="Search"
          value={search}
          className="bg-transparent outline-none flex-1"
          onFocus={() => setIsShown(true)}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">
          <img src={fillerSvg} className="w-10" alt="Search" />
        </button>
      </div>
      {isShown && (
        <div className="relative">
        <div className="bg-pink-800 text-white mt-2 p-2 rounded shadow absolute w-full">
          <h4 className="text-sm font-semibold mb-1">
            <span>Recent searches</span>
          </h4>
          <div>
            <div
              role="button"
              className="flex items-center justify-between py-1 cursor-pointer"
            >
              <span>deutsch</span>
              <button type="button">
                <img src={fillerSvg} className="w-5" alt="Remove recent" />
              </button>
            </div>
            <div
              role="button"
              className="flex items-center justify-between py-1 cursor-pointer"
            >
              <span>books</span>
              <button type="button">
                <img src={fillerSvg} className="w-5" alt="Remove recent" />
              </button>
            </div>
            <div
              role="button"
              className="flex items-center justify-between py-1 cursor-pointer"
            >
              <span>math</span>
              <button type="button">
                <img src={fillerSvg} className="w-5" alt="Remove recent" />
              </button>
            </div>

            <div className="mt-2">
              <h4 className="text-xs font-semibold">
                <span>Search options</span>
              </h4>
              <div>
                <span className="text-xs">Only available when logged in.</span>
              </div>
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
    <div className="h-screen w-78 gap-3 p-2 text-white flex flex-col justify-between text-sm">
      <div>
        <SearchBar />
        <div className="mt-7 mb-5">
          Contrary to popular belief, Lorem Ipsum is not random text. It
          has roots in a piece of classical Latin literature from 45 BC.
        </div>
        <img src={leftBlock} className="w-[280] h-[150] rounded" />
        <div className="my-5">
          It is a long established fact that a reader will be distracted by the
          readable content.
        </div>
        <div className="grid grid-flow-col gap-2">
          <div className="">
            <span className="text-xs"><b>ADMINISTERED BY</b></span>
            <div className="grid grid-flow-col">
              <img src={fillerSvg} className="w-12 h-12" />
              <div className="grid grid-flow-row">
                <span>Unknown</span>
                <span>@Unknown</span>
              </div>
            </div>
          </div>
          <div className="grid grid-flow-row">
            <span className="text-xs"><b>SERVER STATS</b></span>
            <span>281K</span>
            <span>active users</span>
          </div>
        </div>
      </div>
      <div className="text-xs">
        <div>
          unknown.unknown: <a>Unknown</a> · <a>Unknown</a> · <a>Unknown</a>{" · "}
          <a>Unknown</a> · <a>Unknown</a> · <a>Unknown Unknown</a>
        </div>
        <div className="mt-5">
          Unknown: <a>Unknown</a> · <a>Unknown</a> · <a>Unknown</a> · <a>Unknown</a>{" · "}
          <a>Unknown</a> · <a href="https://github.com/eqsdxr/mastodon-clone-web">View source code</a> · v.999.999.999+pr-99999-ea999e
        </div>
      </div>
    </div>
  );
};

export default LeftBlock;
