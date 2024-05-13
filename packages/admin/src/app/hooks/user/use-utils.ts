import copy from "copy-to-clipboard";
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

  return { inviteCopy, contentCopy };
};
