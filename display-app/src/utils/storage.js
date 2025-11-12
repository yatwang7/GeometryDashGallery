import localforage from "localforage";

// Configure separate stores for demons and non-demons
export const nonDemonStore = localforage.createInstance({
  name: "geometrydash",
  storeName: "nonDemonLevels",
});

export const demonStore = localforage.createInstance({
  name: "geometrydash",
  storeName: "demonLevels",
});