import { instance } from "./axios";

export const verifyAPI = {
  getReport({ file, fileType }: { fileType: number; file: string }) {
    return instance.post("https://dss.cryptopro.ru/verify/rest/api/signatures/", {
      SignatureType: fileType,
      Content: file,
    });
  },
};

export const userAPI = {
  getStatistics({ id }: { id: string }) {
    return instance.get("/user/info", {
      params: {
        id,
      },
    });
  },
  editUser({ id, login, name }: { id: string; login: string; name: string }) {
    return instance.post("/user/edit", {
      id,
      login,
      name,
    });
  },
  blockUser({ id, block }: { id: string; block: boolean }) {
    return instance.post("/user/block", {
      id,
      block,
    });
  },
};
