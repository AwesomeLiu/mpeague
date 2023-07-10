"use client"

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import Spinner from "../icons/spinner";

export default function SaveButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-center mt-[32px] mb-[10px]">
      {
        pending ?
          <button
            className="btn btn-primary w-[200px] inline-flex justify-center items-center"
            disabled={pending}
          >
            <Spinner className="h-5 w-5 mr-3" />
            更新中...
          </button>
          :
          <button
            className="btn btn-primary w-[200px]"
            type="submit"
            disabled={disabled}
          >
            更新
          </button>
      }
    </div>
  );
}