import { useRef, useState } from "react";
import { MoreVertical, Play, Pause } from "lucide-react";

function AudioMessage({ audio }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

const audioUrl = audio;
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center gap-3 mt-2 bg-slate-900 px-3 py-2 rounded-xl w-fit">

      {/* ▶️ Play Button */}
      <button
        onClick={togglePlay}
        className="bg-cyan-500 text-white p-2 rounded-full"
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>

      {/* Fake waveform */}
      <div className="flex gap-1">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-cyan-400 rounded"
            style={{ height: `${Math.random() * 15 + 5}px` }}
          />
        ))}
      </div>

      {/* ⋮ MENU */}
      <div className="relative">
        <button onClick={() => setShowMenu(!showMenu)}>
          <MoreVertical size={18} />
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 bg-slate-800 text-white rounded shadow p-2">
            <button
              onClick={togglePlay}
              className="block px-3 py-1 hover:bg-slate-700 w-full text-left"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
        )}
      </div>

      {/* Hidden audio */}
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}

export default AudioMessage;