import copy from "copy-to-clipboard";
import * as Api from "src/api";
import * as Providers from "src/app/providers";

export const useUtils = () => {
  const handler = Providers.useCustomHandler;

  const inviteCopy = (uid: string) => {
    copy(`${window.location.origin}/account/register/${uid}`);
    handler({
      message: "Copied!",
      variant: "success",
    });
  };

  const contentCopy = (wid: string) => {
    copy(wid);
    handler({
      message: "Copied!",
      variant: "success",
    });
  };

  const send = (
    toUid: string,
    title: string,
    subject: string,
    message: string
  ) => {
    Api.Server.Request("sendMailNotification", {
      toUid,
      title,
      subject,
      message,
    });
  };

  return { inviteCopy, contentCopy, send };
};
