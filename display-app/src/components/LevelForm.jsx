import React, { useState, useRef } from "react";
import { f, auth } from "../utils/firebase";
import { nonDemonDifficulties, demonDifficulties } from "../data/difficulties";

function LevelForm() {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [date, setDate] = useState("");
  const [video, setVideo] = useState(null);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert("Sign in first.");

    if (!title.trim()) return alert("Please enter a title.");
    if (!difficulty) return alert("Please select a difficulty.");
    if (!date) return alert("Please select a date.");
    if (!video) return alert("Please upload a video.");

    setUploading(true);
    let videoURL = null;

    try {
      if (video) {
        const fileRef = f.ref(
          f.storage,
          `videos/${user.uid}/${Date.now()}-${video.name}`
        );
        await f.uploadBytes(fileRef, video);
        videoURL = await f.getDownloadURL(fileRef);
      }

      await f.addDoc(f.collection(f.db, "levels"), {
        uid: user.uid,
        title,
        difficulty,
        date,
        videoURL,
        createdAt: Date.now(),
      });

      // Reset form
      setTitle("");
      setDifficulty("");
      setDate("");
      setVideo(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      alert("Level uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Error uploading level.");
    } finally {
      setUploading(false);
    }
  };

  const allDifficulties = [...nonDemonDifficulties, ...demonDifficulties];

  return (
    <form className="level-form" onSubmit={handleSubmit}>
      <h2>Add a Level</h2>

      <input
        type="text"
        placeholder="Level title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        required>
        <option value="" disabled>
          Select difficulty
        </option>
        {allDifficulties.map((d) => (
          <option key={d.name} value={d.name}>
            {d.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required/>

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideo(e.target.files[0])}
        ref={fileInputRef}/>

      <button type="submit" disabled={uploading}>
        {uploading ? "Uploading..." : "Add Level"}
      </button>
    </form>
  );
}

export default LevelForm;