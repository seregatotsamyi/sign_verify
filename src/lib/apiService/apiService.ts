import { UploadFile } from "antd";
import { instance } from "./axios";

export const verifyAPI = {
  uploadDoc({ file }: { file: UploadFile }) {
    const formData = new FormData();
    //@ts-ignore
    formData.append("document", file);
    return instance.post("https://dss.cryptopro.ru/verify/rest/api/documents", formData);
  },
  getReport({ idDoc, file }: { idDoc?: string; file: UploadFile }) {
    const formData = new FormData();
    //@ts-ignore
    const file2 = new Blob([file]);
    console.log(file2);
    //@ts-ignore
    formData.append("Content", file);
    formData.append("SignatureType", "3");
    return instance.post("https://dss.cryptopro.ru/verify/rest/api/signatures/", {
      SignatureType: 3,
      Content: file,
    });
  },
};
