import { useNotificationContext } from "@/app/NotificationProvider";
import { showNotification } from "@/lib/notification";
import { InboxOutlined } from "@ant-design/icons";
import { Upload, UploadFile, UploadProps } from "antd";
import React from "react";

const { Dragger } = Upload;

type Props = {
  type: "sign" | "certificate";
  sendFile: (file: UploadFile) => Promise<void>;
};

export default function DragAndDrop({ type, sendFile }: Props) {
  const { apiNotification } = useNotificationContext();

  const props: UploadProps = {
    name: "file",
    multiple: false,
    showUploadList: false,
    //action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        //sendFile(info.file);
      }
      if (status === "done") {
      } else if (status === "error") {
        showNotification(apiNotification, "error", "Ошибка загрузки");
      }
    },
    beforeUpload(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = btoa(
          //@ts-ignore
          new Uint8Array(e.target.result).reduce((data, byte) => data + String.fromCharCode(byte), "")
        );
        sendFile(base64String);
        console.log(base64String); // Здесь вы можете использовать base64String
      };
      reader.readAsArrayBuffer(file);
      return false;
    },
  };

  return (
    <div className={`${type === "sign" ? "verify__drop" : "certificate__drop"} drop`}>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Нажмите или перенесите файл в эту область для проверки</p>
      </Dragger>
    </div>
  );
}
