import React, { useState, useRef } from "react";

function LevelForm({ difficulties, onAddLevel }) {
  const [formData, setFormData] = useState({
    title: "",
    difficulty: "",
    date: "",
    video: null,
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.difficulty) return;

    const level = {
      title: formData.title,
      difficulty: formData.difficulty,
      date: formData.date,
      video: formData.video || null,
    };

    await onAddLevel(level);

    setFormData({ title: "", difficulty: "", date: "", video: null });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form className="level-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Level Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <select
        name="difficulty"
        value={formData.difficulty}
        onChange={handleChange}
        required
      >
        <option value="">Select Difficulty</option>
        {difficulties.map((d) => (
          <option key={d.name} value={d.name}>{d.name}</option>
        ))}
      </select>

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />

      <input
        type="file"
        name="video"
        accept="video/*"
        ref={fileInputRef}
        onChange={handleChange}
      />

      <button type="submit">Upload Level</button>
    </form>
  );
}

export default LevelForm;