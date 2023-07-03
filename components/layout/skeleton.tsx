type BoneProps = {
  col?: number;
};

const Bone = ({ col = 1 }: BoneProps): JSX.Element => (
  <div className={`h-2 bg-slate-300 rounded col-span-${col}`}></div>
);

export default function Skeleton() {
  return (
    <div className="animate-pulse flex space-x-4 px-[40px]">
      <div className="flex-1 space-y-6 py-1">
        <div className="grid grid-cols-3 gap-4">
          <Bone />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Bone />
        </div>
        <div className="space-y-3">
          <Bone />
          <Bone />
          <Bone />
          <Bone />
        </div>
        <div className="grid grid-cols-5 gap-4">
          <Bone col={4} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Bone col={2} />
        </div>
      </div>
    </div>
  );
}
