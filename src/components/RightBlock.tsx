import fillerSvg from "../assets/filler.svg";

const RightBlock = () => {
  return (
    <div className="w-74 text-white p-2">
      <div className="flex text-2xl">
        <img src={fillerSvg} className="w-12 h-12 content-center" />
        <span className="content-center">Unknown</span>
      </div>
      <div className="h-24 w-full pl-5 mt-10 border-white border-b-1">
        <a className="flex">
          <img src={fillerSvg} className="w-9 h-9 content-center" />
          <span className="content-center">Trending</span>
        </a>
        <a className="flex">
          <img src={fillerSvg} className="w-9 h-9 content-center" />
          <span className="content-center">Life feeds</span>
        </a>
      </div>
      <div className="inline-grid p-4 text-sm gap-3">
        <span>
          <b>
            The generated Lorem Ipsum is therefore always free from repetition,
            injected humour, or non-characteristic words etc.
          </b>
        </span>
        <span>
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type.
        </span>
      </div>
      <div className="p-4">
        <button
          type="button"
          className="bg-white text-black w-[90%] h-12 rounded content-center mb-3"
        >
          Create account
        </button>
        <button
          type="button"
          className="border-2 border-white text-white w-[90%] h-12 rounded content-center"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default RightBlock;
