import React, { useState } from 'react';
import LevelCard from './LevelCard';
import { difficultyOrder } from '../data/difficulties';

function Gallery({ levels }) {
  const [sortBy, setSortBy] = useState('date');

  const sortedLevels = [...levels].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'difficulty') {
      return (
        difficultyOrder.indexOf(a.difficulty) -
        difficultyOrder.indexOf(b.difficulty)
      );
    }
    return 0;
  });

  return (
    <div className="gallery-container">
      <div className="sort-bar">
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Date Completed</option>
          <option value="difficulty">Difficulty</option>
        </select>
      </div>

      <div className="gallery">
        {sortedLevels.length === 0 ? (
          <p>No levels uploaded yet.</p>
        ) : (
          sortedLevels.map((level, i) => <LevelCard key={i} level={level} />)
        )}
      </div>
    </div>
  );
}

export default Gallery;