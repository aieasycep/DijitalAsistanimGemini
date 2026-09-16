interface Props {
  icon: string;
  title: string;
  detail: string;
  time: string;
  action: string;
  color: string;
  onClick?: () => void;
}

export default function LifeCard({ icon, title, detail, time, action, color, onClick }: Props) {
  return (
    <div
      className="bg-white rounded-[16px] p-4 flex items-center gap-3 active:scale-[0.98] transition-transform cursor-pointer"
      style={{ boxShadow: "0 1px 8px rgba(15,15,26,0.06)" }}
      onClick={onClick}
    >
      <div
        className="w-10 h-10 rounded-[12px] flex items-center justify-center text-[20px] flex-shrink-0"
        style={{ backgroundColor: color + "18" }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-[#0F0F1A] truncate">{title}</p>
        <p className="text-[12px] text-[#6B6B80] truncate">{detail}</p>
        <p className="text-[11px] font-medium mt-0.5" style={{ color }}>{time}</p>
      </div>
      <button
        className="flex-shrink-0 px-3 py-1.5 rounded-[10px] text-[12px] font-semibold transition-opacity active:opacity-70"
        style={{ backgroundColor: color + "18", color }}
        onClick={(e) => { e.stopPropagation(); onClick?.(); }}
      >
        {action}
      </button>
    </div>
  );
}
