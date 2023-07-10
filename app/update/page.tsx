import Link from "next/link";
import { set_fs } from "xlsx";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import Container from "@/components/container";
import Upload from "@/components/upload/upload";

export default async function Page() {
  set_fs(await import("fs"));

  return (
    <Container cns="w-[800px] min-h-full">
      <h1 className="text-[26px] my-[24px] text-center">
        请确保在数据表
        <Link
          href="/help/sheet"
          target="_blank"
          className="mx-[5px] cursor-help hover:underline decoration-rose-600 underline-offset-8"
        >
          <span className="text-[36px] font-bold text-rose-600">
            完整且正确
            <sup>
              <QuestionMarkCircleIcon className="w-[20px] h-[20px] inline text-slate-400" />
            </sup>
          </span>
        </Link>
        的情况下进行更新！
      </h1>
      <Upload />
    </Container>
  );
}