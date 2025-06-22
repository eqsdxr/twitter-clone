import Filler from "../assets/filler.svg";

type Media = {
  type: "img" | "vid";
  link: string;
};

type PostProps = {
  username: string;
  avatarUrl: string;
  content: string;
  timestamp: string;
  postId: string;
  media: Media[];
};

export const Post: React.FC<PostProps> = ({
  username,
  avatarUrl,
  content,
  timestamp,
  media,
}) => {
  console.log(media)
  return (
    <div className="flex flex-col w-full max-w-xl mx-auto border-b-1 border-x-1 border-gray-200 shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={avatarUrl}
            className="w-11 h-11 rounded-full object-cover border border-gray-200"
          />
          <span className="font-semibold text-base">@{username}</span>
        </div>
        <span className="text-xs">
          <a>{timestamp}</a>
        </span>
      </div>
      <div className="leading-snug mb-3 whitespace-pre-line mt-5">
        {content}
      </div>
      {media && (
        <div className="flex flex-wrap gap-2">
          {media.map((m, idx) =>
            m.type === "img" ? (
              <img
                key={idx}
                src={m.link}
                className="max-w-[200px] max-h-[200px] rounded-lg object-cover"
              />
            ) : (
              <video
                key={idx}
                src={m.link}
                controls
                className="max-w-[200px] max-h-[200px] rounded-lg object-cover"
              />
            ),
          )}
        </div>
      )}
      <div className="flex items-center justify-between pt-2 mt-2">
        <button className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1 rounded transition">
          <img src={Filler} alt="Comment" className="w-5 h-5" />
          <span className="text-xs font-medium">3</span>
        </button>
        <button className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1 rounded transition">
          <img src={Filler} alt="Like" className="w-5 h-5" />
          <span className="text-xs font-medium">8</span>
        </button>
        <button className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1 rounded transition">
          <img src={Filler} alt="Share" className="w-5 h-5" />
        </button>
        <button className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1 rounded transition">
          <img src={Filler} alt="Share" className="w-5 h-5" />
        </button>
        <button className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1 rounded transition">
          <img src={Filler} alt="Share" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
