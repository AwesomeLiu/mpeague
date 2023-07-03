"use client"

import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { FCProps } from "@/lib/types";
import { useEffect } from "react";

type ModalProps = FCProps & {
  title?: string | React.ReactNode;
  width?: number;
  visible: boolean;
  closeFunc: Function;
};

export default function Modal({ title, width = 600, visible, closeFunc, children }: ModalProps) {
  // prevent page scrolling when modal is open
  useEffect(() => {
    if (visible) {
      document.body.setAttribute("style", "overflow: hidden; padding-right: 17px;")
    } else {
      document.body.removeAttribute("style");
    }
  }, [visible]);

  return visible && createPortal(
    <div hidden={!visible}>
      <div className="fixed inset-0 z-[1000] bg-black opacity-40"></div>
      <div className="fixed inset-0 overflow-auto outline-0 z-[1000]">
        <div
          className="relative top-[130px] mx-auto bg-white rounded-[8px] px-[24px] py-[20px]"
          style={{ width: width }}
        >
          {title &&
            <h1 className="h-[40px] leading-[40px] text-[20px] text-left mb-[8px] truncate">
              {title}
            </h1>
          }
          <div className="break-words" role="dialog">
            <div
              className="absolute top-[-28px] right-[-28px] rounded-full border-green border-solid border-[4px] bg-white cursor-pointer"
              onClick={() => closeFunc()}
            >
              <XMarkIcon className="w-[48px] h-[48px] fill-green stroke-2" />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body);
}
