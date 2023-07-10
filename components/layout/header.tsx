import Link from "next/link";
import Image from "next/image";
import { tMenu } from "@/lib/types";
import { getMenu } from "@/lib/api";
import Container from "../container";
import Menu from "./menu";
import Popover from "../popover/popover";
import LOGO from "../../public/logo.svg";
import QRCode from "../../public/qr-code.jpg";

export default async function Header() {
  const menu: tMenu[] = await getMenu();

  return (
    <header className="sticky top-[20px] bg-white z-10 shadow-md">
      <Container cns="w-[1280px]">
        <div className="flex h-[100px] items-center justify-between gap-[20px]">
          <div className="flex basis-[200px] shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src={LOGO}
                alt="M-Peague Logo"
                className="w-[100%]"
              />
            </Link>
          </div>
          <nav className="flex items-center">
            <Menu menu={menu} />
          </nav>
          <div className="relative">
            <Popover
              position="bottom"
              content={(
                <div className="w-[300px]">
                  <Image
                    src={QRCode}
                    alt="sd"
                    width={300}
                    height={300}
                  />
                </div>
              )}
            >
              <button className="btn btn-primary">立即加入</button>
            </Popover>
          </div>
        </div>
      </Container>
    </header>
  );
}
