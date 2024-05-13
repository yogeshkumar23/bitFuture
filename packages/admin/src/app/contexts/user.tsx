import * as FirebaseFirestore from "firebase/firestore";
import React from "react";
import * as Hooks from "src/app/hooks";

export const UserContext = React.createContext<userContext.Type | undefined>(
  undefined
);

export const UserProvider = ({ children }: Child) => {
  const [state, updateState] = React.useState(false);
  const { user, country, loading } = Hooks.User.useUser(state);
  const { permissions, loading: permLoading } = Hooks.User.useAdminRights(
    user?.userDetails?.uid as string
  );

  const { data: notifications = [] } =
    Hooks.Firebase.useFireSnapshot<notification>(
      "collection",
      `${import.meta.env.MODE === "development" ? `users` : `users`}/${
        user?.userDetails?.uid
      }/notifications`
    ).collectionSnapshot(
      [
        FirebaseFirestore.orderBy("createdTime", "desc"),
        FirebaseFirestore.limit(100),
      ],
      user?.userDetails?.uid === undefined
    );
  const { data: generalNotifications = [] } =
    Hooks.Firebase.useFireSnapshot<generalNotification>(
      "collection",
      `general_notifications`
    ).collectionSnapshot(
      [
        FirebaseFirestore.orderBy("createdTime", "desc"),
        FirebaseFirestore.limit(100),
      ],
      user?.userDetails?.uid === undefined
    );

  const update = () => updateState(!state);

  return (
    <UserContext.Provider
      value={{
        ...(user?.userDetails as userContext.Type),
        detected_country: country,
        loading: Boolean(loading || permLoading),
        permissions,
        notifications,
        generalNotifications,
        update,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export declare namespace userContext {
  export type Type = Hooks.User.UseUser.User & {
    detected_country?: string;
    loading?: boolean;
    update: () => void;
    permissions: string[];
    notifications: notification[];
    generalNotifications: generalNotification[];
  };
}
