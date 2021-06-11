import cuid from "cuid";
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

// Get ALL Events
export const listenToEventsFromFirestore = () =>
  db.collection("events").orderBy("date");

// Get SINGLE Event
export const listenToEventFromFirestore = (id) =>
  db.collection("events").doc(id);

// Add event to db
export const addEventToFirestore = (event) =>
  db.collection("events").add({
    ...event,
    hostedBy: "Jackie",
    hostPhotoURL: "https://randomuser.me/api/portraits/women/50.jpg",
    attendees: firebase.firestore.FieldValue.arrayUnion({
      // This creates an array. .push() .concat() etc. doesn't work with firebase
      id: cuid,
      displayName: "Jackie",
      photoURL: "https://randomuser.me/api/portraits/women/50.jpg",
    }),
  });

// Update existing event by id
export const updateEventInFirestore = (event) =>
  db.collection("events").doc(event.id).update(event);

// Delete event by id
export const deleteEventInFirestore = (id) =>
  db.collection("events").doc(id).delete();
