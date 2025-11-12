import React, { useEffect, useState } from "react";
import { f, auth } from "../utils/firebase";
import { difficultyOrder } from "../data/difficulties";
import LevelCard from "./LevelCard";

function Gallery({ filter }) {
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("date"); // default sort mode

  const loadLevels = async () => {
    const user = auth.currentUser;
    if (!user) {
      setLevels([]);
      setLoading(false);
      return;
    }

    try {
      const q = f.query(
        f.collection(f.db, "levels"),
        f.where("uid", "==", user.uid),
        f.orderBy("createdAt", "desc")
      );

      const snapshot = await f.getDocs(q);
      const allLevels = snapshot.docs.map((doc) => doc.data());

      // === Apply filtering by route ===
      const filteredLevels = filter
        ? allLevels.filter((lvl) =>
            filter === "demon"
              ? lvl.difficulty.toLowerCase().includes("demon")
              : !lvl.difficulty.toLowerCase().includes("demon")
          )
        : allLevels;

      // === Apply sorting
      const sortedLevels = [...filteredLevels].sort((a, b) => {
        if (sortBy === "difficulty") {
          const aIndex = difficultyOrder.indexOf(a.difficulty);
          const bIndex = difficultyOrder.indexOf(b.difficulty);
          return aIndex - bIndex;
        } else if (sortBy === "date") {
          return b.createdAt - a.createdAt;
        }
        return 0;
      });

      setLevels(sortedLevels);
    } catch (err) {
      console.error("Error loading levels:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLevels();
  }, [filter, sortBy]);

  if (loading)
    return <p style={{ textAlign: "center" }}>Loading your levels...</p>;

  if (levels.length === 0)
    return <p style={{ textAlign: "center" }}>No levels uploaded yet.</p>;

  return (
    <div className="gallery-container">
      <div className="sort-bar">
        Sort by:
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Date Completed</option>
          <option value="difficulty">Difficulty</option>
        </select>
      </div>

      <div className="gallery">
        {levels.map((level, i) => (
          <LevelCard key={i} level={level} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;