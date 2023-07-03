import { FCProps } from "@/lib/types";

type ContainerProps = FCProps & {
  cns?: string;
};

export default function Container({ cns, children }: ContainerProps) {
  return <div className={`container mx-auto ${cns}`}>{children}</div>
}
