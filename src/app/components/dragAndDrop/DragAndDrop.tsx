import { InboxOutlined } from "@ant-design/icons";
import { Upload, UploadProps } from "antd";
import { RcFile } from "antd/es/upload/interface";
import React from "react";

const { Dragger } = Upload;

type Props = {
  type: "sign" | "certificate";
  sendFile: (file: any, fileInfo: RcFile) => Promise<void>;
};

export default function DragAndDrop({ type, sendFile }: Props) {
  const props: UploadProps = {
    name: "file",
    multiple: false,
    showUploadList: false,
    onChange() {
      return true;
    },
    beforeUpload(file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const base64String = btoa(
          //@ts-ignore
          new Uint8Array(e.target.result).reduce((data, byte) => data + String.fromCharCode(byte), "")
        );
        sendFile(base64String, file);
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
