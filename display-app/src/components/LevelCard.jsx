import React, { useState, useEffect } from "react";
import "../App.css";
import { nonDemonDifficulties, demonDifficulties } from "../data/difficulties";

function findDifficultyAssets(difficulty = "") {
  const all = [...nonDemonDifficulties, ...demonDifficulties];
  return (
    all.find(
      (d) => d.name.toLowerCase().trim() === difficulty.toLowerCase().trim()
    ) || {}
  );
}

function getDifficultyClass(difficulty = "") {
  const d = difficulty.toLowerCase().trim();
  if (d.includes("demon")) return "badge-demon";
  if (d === "insane") return "badge-insane";
  if (d === "harder") return "badge-harder";
  if (d === "hard") return "badge-hard";
  if (d === "normal") return "badge-normal";
  if (d === "easy") return "badge-easy";
  if (d === "auto") return "badge-auto";
  return "badge-default";
}

function LevelCard({ level }) {
  const { icon, text } = findDifficultyAssets(level.difficulty);
  const badgeClass = getDifficultyClass(level.difficulty);
  const [videoURL, setVideoURL] = useState(null);

  useEffect(() => {
    if (level.videoURL) {
      setVideoURL(level.videoURL);
    } else if (level.video) {
      const url = URL.createObjectURL(level.video);
      setVideoURL(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [level.video, level.videoURL]);

  return (
    <div className="level-card">
      <h3>{level.title}</h3>

      <div className={`difficulty-badge ${badgeClass}`}>
        {icon && (
          <img
            src={icon}
            alt={`${level.difficulty} icon`}
            className="diff-icon"
          />
        )}
        {text ? (
          <img
            src={text}
            alt={`${level.difficulty} text`}
            className="diff-text"
          />
        ) : (
          <span className="diff-text">{level.difficulty}</span>
        )}
      </div>

      <p>{level.date}</p>

      {videoURL && (
        <video width="320" controls>
          <source src={videoURL} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

export default LevelCard;