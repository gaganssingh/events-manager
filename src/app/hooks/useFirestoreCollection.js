import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { dataFromSnapshot } from "../firestore/firestoreService";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../store/asyncReducer";

const useFirestoreCollection = ({ query, data, dependencies }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = query().onSnapshot(
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => dataFromSnapshot(doc));
        data(docs);
        dispatch(asyncActionFinish());
      },
      (error) => dispatch(asyncActionError())
    );
    return () => {
      unsubscribe();
    };

    //
    // useEffect dependencies are password in from the component
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useFirestoreCollection;
