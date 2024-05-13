import React from "react";
import * as Api from "src/api";

export const useFileUpload = () => {
  const [link, setLink] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);
  const upload = async (file: File) => {
    var bodyData = new FormData();
    bodyData.append("file", file);
    setLoading(true);
    await Api.Server.Request("fileUpload", bodyData).then((res) =>
      setLink(res.fileUrl)
    );
    setLoading(false);
  };
  return { loading, link, upload, setLink };
};
