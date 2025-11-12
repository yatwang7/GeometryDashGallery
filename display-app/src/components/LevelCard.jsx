import React, { useState, useEffect } from "react";
import { nonDemonDifficulties, demonDifficulties } from "../data/difficulties";

function findDifficultyAssets(difficulty) {
  const all = [...nonDemonDifficulties, ...demonDifficulties];
  return all.find((d) => d.name === difficulty) || {};
}

// 🔥 Determine badge color by difficulty
function getDifficultyClass(difficulty) {
  if (difficulty.includes("Demon")) return "badge-demon";
  if (difficulty === "Insane") return "badge-insane";
  if (difficulty === "Harder") return "badge-harder";
  if (difficulty === "Hard") return "badge-hard";
  if (difficulty === "Normal") return "badge-normal";
  if (difficulty === "Easy") return "badge-easy";
  if (difficulty === "Auto") return "badge-auto";
  return "badge-default";
}

function LevelCard({ level }) {
  const { icon, text } = findDifficultyAssets(level.difficulty);
  const [videoURL, setVideoURL] = useState(null);

  useEffect(() => {
    if (level.video) {
      const url = URL.createObjectURL(level.video);
      setVideoURL(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [level.video]);

  const badgeClass = getDifficultyClass(level.difficulty);

  return (
    <div className="level-card">
      <h3>{level.title}</h3>

      <div className={`difficulty-badge ${badgeClass}`}>
        {icon && <img src={icon} alt={`${level.difficulty} icon`} className="diff-icon" />}
        {text && <img src={text} alt={`${level.difficulty} text`} className="diff-text" />}
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