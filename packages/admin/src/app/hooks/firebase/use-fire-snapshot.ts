import * as FirebaseFirestore from "firebase/firestore";
import React from "react";
import * as Providers from "src/app/providers";

export const useFireSnapshot = <T>(
  type: "collection" | "collectionGroup",
  path: string,
  dependency?: string[]
) => {
  const [data, setData] = React.useState<T[]>();
  const firestore = FirebaseFirestore.getFirestore(Providers.secondaryApp);

  const pathModifier = (text: string) => text;

  const collection =
    type === "collection"
      ? FirebaseFirestore.collection(firestore, pathModifier(path))
      : FirebaseFirestore.collectionGroup(firestore, pathModifier(path));

  const collectionSnapshot = (
    queryConstraint?: FirebaseFirestore.QueryConstraint[],
    silent?: boolean
  ) => {
    const query = FirebaseFirestore.query(
      collection,
      ...(queryConstraint || [])
    );
    React.useEffect(() => {
      if (!silent) {
        const unsubscribe = FirebaseFirestore.onSnapshot(query, (docs) => {
          setData(
            docs.docs.map((doc) => ({ id: doc.id, ...(doc.data() as T) }))
          );
          import.meta.env.MODE === "development" &&
            console.info(
              path,
              docs.docs.map((doc) => ({ id: doc.id, ...(doc.data() as T) }))
            );
        });
        return () => unsubscribe();
      } else setData(undefined);
    }, [path, ...(dependency || []), silent]);
    return { data };
  };

  const documentSnapshot = (id: string, silent?: boolean) => {
    React.useEffect(() => {
      if (!silent) {
        const unsubscribe = FirebaseFirestore.onSnapshot(
          FirebaseFirestore.doc(
            collection as FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
            id
          ),
          (doc) => {
            setData([{ id: doc.id, ...(doc.data() as T) }]);
            import.meta.env.MODE === "development" &&
              console.info(path, { id: doc.id, ...(doc.data() as T) });
          }
        );
        return () => unsubscribe();
      } else setData(undefined);
    }, [path, ...(dependency || []), silent]);
    return { data };
  };

  return { collectionSnapshot, documentSnapshot };
};
