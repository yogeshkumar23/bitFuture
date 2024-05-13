import * as FirebaseFirestore from "firebase/firestore";
import React from "react";
import * as Providers from "src/app/providers";

export const useFirestore = <T>(silent?: boolean) => {
  const [loading, setLoading] = React.useState(false);
  const handler = Providers.useCustomHandler;
  const firestore = FirebaseFirestore.getFirestore(Providers.secondaryApp);

  const pathModifier = (text: string) =>
    import.meta.env.MODE === "production" || true
      ? text
      : `development/testing/${text}`;

  const get = (collectionName: string, id: string) =>
    FirebaseFirestore.getDoc(
      FirebaseFirestore.doc(
        FirebaseFirestore.collection(firestore, pathModifier(collectionName)),
        id
      )
    );

  const add = async (collectionName: string, data: T) => {
    import.meta.env.MODE === "development" &&
      console.info(`${collectionName} input`, data);
    const collection = FirebaseFirestore.collection(
      firestore,
      pathModifier(collectionName)
    );
    setLoading(true);
    const result = await FirebaseFirestore.addDoc(collection, {
      ...data,
      createdAt: new Date().getTime(),
    })
      .then((res) => {
        import.meta.env.MODE === "development" &&
          console.info(`${collectionName} output`, res);
        !silent &&
          handler({
            message: "New doc added",
            variant: "success",
          });
        return res;
      })
      .catch((e) => {
        !silent &&
          handler({
            message: e.message.replace("Firebase :", ""),
            variant: "error",
          });
        return e;
      });
    setLoading(false);
    return result;
  };

  const set = async (collectionName: string, docId: string, data: any) => {
    import.meta.env.MODE === "development" &&
      console.info(`${collectionName}/${docId} input`, data);
    const collection = FirebaseFirestore.collection(
      firestore,
      pathModifier(collectionName)
    );
    setLoading(true);
    const result = await FirebaseFirestore.setDoc(
      FirebaseFirestore.doc(collection, docId),
      { ...data }
    )
      .then((res) => {
        import.meta.env.MODE === "development" &&
          console.info(`${collectionName}/${docId} output`, res);
        !silent &&
          handler({
            message: "Doc updated",
            variant: "success",
          });
        return res;
      })
      .catch((e) => {
        !silent &&
          handler({
            message: e.message.replace("Firebase :", ""),
            variant: "error",
          });
        return e;
      });
    setLoading(false);
    return result;
  };

  const update = async (collectionName: string, docId: string, data: any) => {
    import.meta.env.MODE === "development" &&
      console.info(`${collectionName}/${docId} input`, data);
    const collection = FirebaseFirestore.collection(
      firestore,
      pathModifier(collectionName)
    );
    setLoading(true);
    const result = await FirebaseFirestore.updateDoc(
      FirebaseFirestore.doc(collection, docId),
      { ...data }
    )
      .then((res) => {
        import.meta.env.MODE === "development" &&
          console.info(`${collectionName}/${docId} input`, res);
        !silent &&
          handler({
            message: "Doc updated",
            variant: "success",
          });
        return res;
      })
      .catch((e) => {
        !silent &&
          handler({
            message: e.message.replace("Firebase :", ""),
            variant: "error",
          });
        return e;
      });
    setLoading(false);
    return result;
  };

  const paginatedQuery = async (
    type: "collection" | "collectionGroup",
    path: string,
    limit: number,
    lastDoc: FirebaseFirestore.DocumentData | undefined,
    queryConstraint: FirebaseFirestore.QueryConstraint[]
  ) => {
    const collection =
      type === "collection"
        ? FirebaseFirestore.collection(firestore, pathModifier(path))
        : FirebaseFirestore.collectionGroup(firestore, pathModifier(path));

    let snapshot;

    if (lastDoc) {
      snapshot = await FirebaseFirestore.getDocs(
        FirebaseFirestore.query(
          collection,
          ...(queryConstraint || []),
          FirebaseFirestore.startAfter(lastDoc),
          FirebaseFirestore.limit(limit)
        )
      );
    } else {
      snapshot = await FirebaseFirestore.getDocs(
        FirebaseFirestore.query(
          collection,
          ...(queryConstraint || []),
          FirebaseFirestore.limit(limit)
        )
      );
    }

    if (snapshot.empty) {
      return { data: [] };
    }

    return {
      data: snapshot.docs,
    };
  };

  const getCount = async (
    type: "collection" | "collectionGroup",
    path: string,
    queryConstraint: FirebaseFirestore.QueryConstraint[]
  ) => {
    const collection =
      type === "collection"
        ? FirebaseFirestore.collection(firestore, pathModifier(path))
        : FirebaseFirestore.collectionGroup(firestore, pathModifier(path));

    const queryCount = FirebaseFirestore.query(
      collection,
      ...(queryConstraint || [])
    );

    const count = (
      await FirebaseFirestore.getCountFromServer(queryCount)
    ).data().count;

    // Process fetched items
    return { count };
  };

  return { loading, add, get, set, update, paginatedQuery, getCount };
};
