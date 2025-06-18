import Filler from "../assets/filler.svg";
import React, { useState, useEffect } from "react";

type Media = {
  type: "image" | "video";
  url: string;
};

type PostProps = {
  username: string;
  avatarUrl: string;
  content: string;
  fetchMedia: () => Promise<Media[]>;
  timestamp: string;
};

export const Post: React.FC<PostProps> = ({
  username,
  avatarUrl,
  content,
  fetchMedia,
  timestamp,
}) => {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;
    setLoading(true);
    fetchMedia()
      .then((medias) => {
        if (!canceled) {
          setMedia(medias);
          setError(null);
        }
      })
      .catch((e) => !canceled && setError("Failed to fetch media."))
      .finally(() => !canceled && setLoading(false));
    return () => {
      canceled = true;
    };
  }, [fetchMedia]);

  //        <div className="flex flex-wrap gap-2">
  //          {media.map((m, idx) =>
  //            m.type === "image" ? (
  //              <img
  //                key={idx}
  //                src={m.url}
  //                alt={m.alt || `image-${idx}`}
  //                className="max-w-[200px] max-h-[200px] rounded-lg object-cover"
  //              />
  //            ) : (
  //              <video
  //                key={idx}
  //                src={m.url}
  //                controls
  //                poster={m.alt}
  //                className="max-w-[200px] max-h-[200px] rounded-lg object-cover"
  //              />
  //            ),
  //          )}
  //        </div>

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto border-b-1 border-x-1 border-gray-200 shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={avatarUrl}
            className="w-11 h-11 rounded-full object-cover border border-gray-200"
          />
          <span className="font-semibold text-base">
            @{username}
          </span>
        </div>
        <span className="text-xs"><a>{timestamp}</a></span>
      </div>
      <div className="leading-snug mb-3 whitespace-pre-line mt-5">
        {content}
      </div>
      {loading && (
        <div className="text-xs mb-1 animate-pulse">
          Loading media…
        </div>
      )}
      {error && <div className="text-xs text-red-500 mb-1">{error}</div>}
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
