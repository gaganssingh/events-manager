import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { dataFromSnapshot } from "../firestore/firestoreService";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../store/asyncReducer";

const useFirestoreDoc = ({ query, data, dependencies }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncActionStart());

    const unsubscribe = query().onSnapshot(
      (snapshot) => {
        // If event with queried id doesn't exist
        if (!snapshot.exists) {
          dispatch(
            asyncActionError({
              code: "not-found",
              message: "Cound not find that event",
            })
          );
          return;
        }

        data(dataFromSnapshot(snapshot));
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

export default useFirestoreDoc;
