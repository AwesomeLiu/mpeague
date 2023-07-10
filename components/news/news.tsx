import Image from "next/image";
import DateCom from "./dateCom";

type NewsProps = {
  cover: string;
  title: string;
  date: string;
};

export default function News({ cover, title, date }: NewsProps) {
  return (
    <div className="w-[360px]">
      <div className="w-[360px] h-[240px] rounded-[10px] mb-[10px] overflow-hidden cursor-pointer flex items-center justify-center">
        <Image
          src={cover}
          alt="News Cover"
          width={360}
          height={240}
          className="hover:scale-[1.1] transition-transform duration-200 ease-out"
        />
      </div>
      <DateCom dateString={date} />
      <h3 className="text-xl font-bold mt-[10px] hover:underline line-clamp-2 cursor-pointer">{title}</h3>
    </div>
  );
}