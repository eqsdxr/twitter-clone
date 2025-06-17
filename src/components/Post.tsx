import Filler from "../assets/filler.svg";
import React, { useState, useEffect } from "react";

type Media = {
  type: "image" | "video";
  url: string;
  alt?: string;
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

  return (
    <div className="flex border border-gray-200 rounded-lg p-4 mb-4 bg-white max-w-lg">
      <img
        src={avatarUrl}
        alt={`${username} avatar`}
        className="w-12 h-12 rounded-full mr-4 object-cover"
      />
      <div className="flex-1">
        <div className="flex items-center mb-1 text-sm text-gray-500">
          <span className="font-semibold text-gray-900 mr-2">@{username}</span>
          <span className="text-xs">{timestamp}</span>
        </div>
        <div className="text-base mb-2 text-gray-900">{content}</div>
        {loading && <div>Loading media...</div>}
        {error && <div className="text-xs text-red-500">{error}</div>}
        <div className="flex flex-wrap gap-2">
          {media.map((m, idx) =>
            m.type === "image" ? (
              <img
                key={idx}
                src={m.url}
                alt={m.alt || `image-${idx}`}
                className="max-w-[200px] max-h-[200px] rounded-lg object-cover"
              />
            ) : (
              <video
                key={idx}
                src={m.url}
                controls
                poster={m.alt}
                className="max-w-[200px] max-h-[200px] rounded-lg object-cover"
              />
            )
          )}
        </div>
      </div>
      <div className="h-12 flex justify-between">
        <div>
          <img src={Filler} />
          <button className="w-16 h-8 content-center">3</button>
        </div>
        <div>
          <img src={Filler} />
          <button className="w-16 h-8 content-center">148</button>
        </div>
        <div>
          <img src={Filler} />
          <button className="w-16 h-8 content-center">155</button>
        </div>
        <div>
          <img src={Filler} />
          <button className="w-16 h-8 content-center"></button>
        </div>
        <div>
          <img src={Filler} />
          <button className="w-16 h-8 content-center"></button>
        </div>
        <div>
          <img src={Filler} />
          <button className="w-16 h-8 content-center"></button>
        </div>
      </div>
    </div>
  );
};
