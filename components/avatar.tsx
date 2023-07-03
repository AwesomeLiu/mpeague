import Image from "next/image";

type AvatarProps = {
  src: string;
  alt: string;
  size: number;
  cns?: string;
};

export default function Avatar({ src, alt, size, cns }: AvatarProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`!rounded-full ${cns}`}
    />
  );
}