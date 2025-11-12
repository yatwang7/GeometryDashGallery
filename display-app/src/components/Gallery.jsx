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
      const allLevels = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

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

  const handleDeleteLevel = async (levelId, videoURL) => {

    if (!window.confirm("Delete this clip?")) return;

    try {
      await f.deleteDoc(f.doc(f.db, "levels", levelId));

      if (videoURL) {
        const fileRef = f.ref(f.storage, videoURL);
        await f.deleteObject(fileRef).catch(() => {});
      }

      setLevels((prev) => prev.filter((lvl) => lvl.id !== levelId));
    } catch (err) {
      console.error("Error deleting level:", err);
      alert("Failed to delete level.");
    }
  };

  const clearAllLevels = async () => {
    if (!window.confirm("Delete ALL clips? This cannot be undone.")) return;
    const user = auth.currentUser;
    if (!user) return;

    try {
      const q = f.query(f.collection(f.db, "levels"), f.where("uid", "==", user.uid));
      const snapshot = await f.getDocs(q);
      const batch = f.writeBatch(f.db);
      const toDelete = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        const isDemon = data.difficulty.toLowerCase().includes("demon");

        // Apply filter: if demon page → only demons, if non-demon → others, else all
        if (
          (!filter) ||
          (filter === "demon" && isDemon) ||
          (filter === "non-demon" && !isDemon)
        ) {
          batch.delete(doc.ref);
          toDelete.push({ id: doc.id, videoURL: data.videoURL });
        }
      });

      if (toDelete.length === 0) {
        alert("No levels to delete on this page.");
        return;
      }

      await batch.commit();

      for (const lvl of toDelete) {
        if (lvl.videoURL) {
          try {
            const fileRef = f.ref(f.storage, lvl.videoURL);
            await f.deleteObject(fileRef);
          } catch (err) {
            console.warn("Error deleting video for:", lvl.id, err);
          }
        }
      }

      setLevels((prev) =>
        prev.filter((lvl) => !toDelete.some((del) => del.id === lvl.id))
      );

      alert(`${toDelete.length} levels deleted from this page.`);
    } catch (err) {
      console.error("Error clearing all levels:", err);
      alert("Failed to delete all levels.");
    }
  };

  useEffect(() => {
    loadLevels();
  }, [filter, sortBy]);

  if (loading)
    return <p style={{ textAlign: "center" }}>Loading your levels...</p>;

  return (
    <div className="gallery-container">
      <div className="sort-bar">
        <div>
          Sort by:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Date Completed</option>
            <option value="difficulty">Difficulty</option>
          </select>
        </div>
        {levels.length > 0 && (
          <button className="clear-btn" onClick={clearAllLevels}>
            Clear All
          </button>
        )}
      </div>

      {levels.length === 0 ? (
        <p style={{ textAlign: "center" }}>No levels uploaded yet.</p>
      ) : (
        <div className="gallery">
          {levels.map((level) => (
            <LevelCard
              key={level.id}
              level={level}
              onDelete={() => handleDeleteLevel(level.id, level.videoURL)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;