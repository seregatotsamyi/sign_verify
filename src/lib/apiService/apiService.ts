import { instance } from "./axios";

export const verifyAPI = {
  getReport({ file, fileType }: { fileType: number; file: string }) {
    return instance.post("https://dss.cryptopro.ru/verify/rest/api/signatures/", {
      SignatureType: fileType,
      Content: file,
    });
  },
};
