import firebase from "../config/firebase";

const db = firebase.firestore();

export const dataFromSnapshot = (snapshot) => {
  if (!snapshot.exists) {
    return undefined;
  }

  const data = snapshot.data();

  // CONVERT FIRESTORE DATE TO JAVASCRIPT DATE
  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  };
};

export const getEventsFromFirestore = (observer) =>
  db.collection("events").onSnapshot(observer);
