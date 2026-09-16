interface Props {
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
  className?: string;
}

export default function Skeleton({ width, height = 16, rounded, className = "" }: Props) {
  return (
    <div
      className={`skeleton ${rounded ? "rounded-full" : "rounded-lg"} ${className}`}
      style={{ width, height }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-[16px] p-4 space-y-3" style={{ boxShadow: "0 1px 8px rgba(15,15,26,0.06)" }}>
      <div className="flex items-center gap-3">
        <Skeleton width={36} height={36} rounded />
        <div className="flex-1 space-y-2">
          <Skeleton width="60%" height={14} />
          <Skeleton width="40%" height={11} />
        </div>
        <Skeleton width={60} height={20} />
      </div>
      <Skeleton width="100%" height={14} />
      <Skeleton width="75%" height={14} />
      <div className="flex gap-2 pt-1">
        <Skeleton width={80} height={32} />
        <Skeleton width={80} height={32} />
      </div>
    </div>
  );
}
