import React, { useState, useEffect } from "react";
import { nonDemonDifficulties } from "../data/difficulties";
import LevelForm from "../components/LevelForm";
import Gallery from "../components/Gallery";
import { nonDemonStore } from "../utils/storage";

function NonDemonPage() {
  const [levels, setLevels] = useState([]);

  // Load all levels from IndexedDB
  useEffect(() => {
    nonDemonStore.keys().then(async (keys) => {
      const all = [];
      for (const key of keys) {
        const level = await nonDemonStore.getItem(key);
        all.push(level);
      }
      setLevels(all);
    });
  }, []);

  // Add a new level
  const addLevel = async (newLevel) => {
    const id = Date.now().toString();
    await nonDemonStore.setItem(id, { id, ...newLevel });
    setLevels([...levels, { id, ...newLevel }]);
  };

  // Clear all levels
  const clearGallery = async () => {
    if (confirm("Clear all Non-Demon levels?")) {
      await nonDemonStore.clear();
      setLevels([]);
    }
  };

  return (
    <div className="page">
      <h2>Non-Demon Levels</h2>
      <LevelForm difficulties={nonDemonDifficulties} onAddLevel={addLevel} />
      <div className="controls">
        <button onClick={clearGallery} className="clear-btn">Clear Gallery</button>
      </div>
      <Gallery levels={levels} />
    </div>
  );
}

export default NonDemonPage;