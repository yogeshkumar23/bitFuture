// import * as FirebaseFirestore from "firebase/firestore";
import React from "react";
import * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";

export const useDataTrigger = () => {
  const { user } = React.useContext(Contexts.UserContext);
  const { data: notifications } = Hooks.Firebase.useFireSnapshot<notification>(
    "collection",
    `users/${user?.uid}/notifications`
  ).collectionSnapshot();

  return {
    trigger: `${notifications?.length}`,
  };
};
