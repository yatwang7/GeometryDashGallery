import React, { useState, useEffect } from "react";
import { demonDifficulties } from "../data/difficulties";
import LevelForm from "../components/LevelForm";
import Gallery from "../components/Gallery";
import { demonStore } from "../utils/storage";

function DemonPage() {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    demonStore.keys().then(async (keys) => {
      const all = [];
      for (const key of keys) {
        const level = await demonStore.getItem(key);
        all.push(level);
      }
      setLevels(all);
    });
  }, []);

  const addLevel = async (newLevel) => {
    const id = Date.now().toString();
    await demonStore.setItem(id, { id, ...newLevel });
    setLevels([...levels, { id, ...newLevel }]);
  };

  const clearGallery = async () => {
    if (confirm("Clear all Demon levels?")) {
      await demonStore.clear();
      setLevels([]);
    }
  };

  return (
    <div className="page">
      <h2>Demon Levels</h2>
      <LevelForm difficulties={demonDifficulties} onAddLevel={addLevel} />
      <div className="controls">
        <button onClick={clearGallery} className="clear-btn">Clear Gallery</button>
      </div>
      <Gallery levels={levels} />
    </div>
  );
}

export default DemonPage;