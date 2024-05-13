import * as Hooks from "src/app/hooks";
import * as Providers from "src/app/providers";

export const useGeneralNotification = () => {
  const handler = Providers.useCustomHandler;
  const { add } = Hooks.Firebase.useFirestore(true);

  const sendNotification = async (
    notification: Partial<generalNotification> & { htmlContent: string }
  ) => {
    await add(`general_notifications`, {
      ...notification,
      createdTime: new Date().getTime(),
    });
    handler({ message: "General Update Published", variant: "success" });
  };

  return { sendNotification };
};
