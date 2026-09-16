interface Props {
  source: string;
  onClick?: () => void;
}

const sourceColors: Record<string, string> = {
  Gmail: "#EA4335",
  Outlook: "#0078D4",
  "Google Calendar": "#4285F4",
  "Apple Calendar": "#FF3B30",
  Trendyol: "#FF6B00",
  Google: "#4285F4",
  "E-Fatura": "#34C759",
  Netflix: "#E50914",
};

export default function SourceTag({ source, onClick }: Props) {
  const color = sourceColors[source.split(" · ")[0]] ?? "#6B6B80";
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md transition-colors active:opacity-70"
      style={{ backgroundColor: "#F1F1F8" }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-[11px] font-medium text-[#6B6B80]">{source}</span>
    </button>
  );
}
