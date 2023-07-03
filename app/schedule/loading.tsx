import Skeleton from "@/components/layout/skeleton";

export default function Loading() {
  return (
    <div className="min-h-min space-y-20">
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
}