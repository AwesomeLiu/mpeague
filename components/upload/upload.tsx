"use client"

import { useEffect, useState } from "react";
import cn from "classnames";
import { CheckCircleIcon, CloudArrowUpIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { validFileData } from '@/lib/sheet';
import { uploadFile } from "@/lib/serverAction";
import ExcelIcon from "../icons/excel";
import Container from "../container";
import SaveButton from "./saveButton";
import toastr from "toastr";

type UploadInfoProps = {
  status: "success" | "error";
  text?: string;
};

const UploadInfo = ({ status, text }: UploadInfoProps) => {
  const [ELM, color] = status === "success" ?
    [CheckCircleIcon, "text-green"]
    :
    [XCircleIcon, "text-red"];

  return (
    <p className={cn("flex items-center justify-center text-[18px]", color)}>
      <ELM className="inline-block w-[24px] h-[24px] mr-[8px]" />
      <span>{text}</span>
    </p>
  );
};

export default function Upload() {
  const [ready, setReady] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  function reset() {
    const fileInput = document.querySelector("#upload_file") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }

    setReady(false);
    setFileName("");
    setFileSize("");
    setIsValid(null);
  }

  // initate
  useEffect(() => {
    const fileSelector = document.querySelector(".file_selector") as HTMLDivElement;
    const fileInput = document.querySelector("#upload_file") as HTMLInputElement;

    fileSelector.addEventListener("click", function (e: Event) {
      e.preventDefault();
      if (fileInput) {
        reset();
        fileInput.click();
        e.stopPropagation();
      }
    });

    fileInput.addEventListener("change", updateImageDisplay);

    function updateImageDisplay() {
      const curFiles = fileInput.files;
      if (curFiles == null || curFiles.length === 0) {
        setReady(false);
        setFileName("");
        setFileSize("");
        setIsValid(null);
      } else {
        let file = curFiles[0];
        if (validFileType(file)) {
          setReady(true);
          setFileName(file.name);
          setFileSize(getFileSize(file.size));
          setIsValid(null);
        } else {
          setReady(false);
          setFileName(file.name);
          setFileSize("");
          setIsValid(false);
        }
      }
    }

    // https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    function validFileType(file: File): boolean {
      const fileTypes = [
        "application/vnd.ms-excel", // .xls
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      ];
      return fileTypes.includes(file.type);
    }

    function getFileSize(size: number): string {
      if (size < 1024) {
        return `${size} bytes`;
      } else if (size >= 1024 && size < 1048576) {
        return `${(size / 1024).toFixed(1)} KB`;
      } else if (size >= 1048576) {
        return `${(size / 1048576).toFixed(1)} MB`;
      } else {
        return "-";
      }
    }

    return () => {
      reset();
    }
  }, []);

  // client varify
  useEffect(() => {
    const varify = async () => {
      const fileInput = document.querySelector("#upload_file") as HTMLInputElement;
      const curFiles = fileInput.files;
      if (curFiles && curFiles.length > 0) {
        const file = curFiles[0];
        const ab: ArrayBuffer = await file.arrayBuffer();
        const pass: boolean = await validFileData(ab);
        setIsValid(pass);
      }
    };

    if (ready) {
      varify();
    }
  }, [ready]);

  return (
    <form
      action={async (formData) => {
        let res: boolean = await uploadFile(formData);
        if (res) {
          toastr.success("更新成功");
        } else {
          toastr.error("更新失败")
        }
        reset();
      }}
    >
      <Container cns="h-[200px] relative">
        <input
          type="file"
          name="upload_file"
          id="upload_file"
          accept=".xlsx, .xls"
          className="hidden"
        />
        <div
          className={cn("file_selector flex h-full items-center justify-center cursor-pointer rounded-[8px] border-[2px] border-dashed", {
            "border-gray-300": !ready,
            "border-green": ready,
            "hover:border-green": isValid !== false,
            "border-red": isValid === false,
          })}
        >
          <div>
            <p className="icon_preview text-center mb-[8px]">
              {
                ready ?
                  <ExcelIcon size={56} />
                  :
                  <CloudArrowUpIcon className="inline-block w-[56px] h-[56px] text-blue-500" />
              }
            </p>
            <div className="preview text-[18px]">
              {
                ready ?
                  <>
                    <p>
                      <label className="indent-4">文件名:</label>
                      <span className="text-green">{fileName}</span>
                    </p>
                    <p>
                      <label>文件大小:</label>
                      <span className="text-green">{fileSize}</span>
                    </p>
                    {
                      isValid == null ?
                        null
                        :
                        <UploadInfo
                          status={isValid ? "success" : "error"}
                          text={isValid ? "验证通过" : "验证未通过"}
                        />
                    }
                  </>
                  :
                  isValid === false ?
                    <p className="text-red">
                      所选文件 {fileName} 不是 xlsx 或 xls 类型，请重新选择
                    </p>
                    :
                    <p className="text-blue-500">选择文件</p>
              }
            </div>
          </div>
        </div>
        {
          isValid != null &&
          <TrashIcon
            className="absolute inline-block w-[36px] h-[36px] text-red bottom-0 right-[-44px] cursor-pointer"
            onClick={() => reset()}
          />
        }
      </Container>
      <SaveButton disabled={!(ready && isValid)} />
    </form>
  );
}