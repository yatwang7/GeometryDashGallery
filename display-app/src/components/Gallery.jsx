import React, { useEffect, useState } from "react";
import { f, auth, listenAuth } from "../utils/firebase";

function Gallery() {
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLevels = async () => {
    const user = auth.currentUser;
    if (!user) return setLevels([]);

    const q = f.query(
      f.collection(f.db, "levels"),
      f.where("uid", "==", user.uid),
      f.orderBy("createdAt", "desc")
    );

    const snapshot = await f.getDocs(q);
    setLevels(snapshot.docs.map((doc) => doc.data()));
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = listenAuth(() => loadLevels());
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading your levels...</p>;

  return (
    <div className="gallery">
      {levels.length === 0 ? (
        <p>No levels uploaded yet.</p>
      ) : (
        levels.map((level, i) => (
          <div className="level-card" key={i}>
            <h3>{level.title}</h3>
            <p>{level.difficulty}</p>
            <p>{level.date}</p>
            {level.videoURL && (
              <video width="320" controls>
                <source src={level.videoURL} type="video/mp4" />
              </video>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Gallery;