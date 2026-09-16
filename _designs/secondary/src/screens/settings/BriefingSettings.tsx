import { useState } from "react";
import { useNavigation } from "../../context/NavigationContext";
import PageHeader from "../../components/layout/PageHeader";

const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const DEFAULT_SILENT = [true, true, true, true, true, false, false];

interface TimePickerProps {
  label: string;
  hour: number;
  minute: number;
  enabled: boolean;
  onHourChange: (h: number) => void;
  onMinuteChange: (m: number) => void;
  onToggle: () => void;
}

function TimePicker({ label, hour, minute, enabled, onHourChange, onMinuteChange, onToggle }: TimePickerProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E8F0] mb-3">
      <div className="flex items-center justify-between mb-3">
        <span className="font-semibold text-[#0F0F1A] text-sm">{label}</span>
        <button
          onClick={onToggle}
          className={`w-11 h-6 rounded-full transition-colors relative ${enabled ? "bg-[#5B5CE2]" : "bg-[#E8E8F0]"}`}
        >
          <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${enabled ? "translate-x-5" : "translate-x-0.5"}`} />
        </button>
      </div>
      {enabled && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button onClick={() => onHourChange((hour - 1 + 24) % 24)} className="w-8 h-8 rounded-full bg-[#F8F8FC] flex items-center justify-center text-[#5B5CE2] font-bold text-lg">-</button>
            <span className="text-2xl font-bold text-[#0F0F1A] w-10 text-center">{String(hour).padStart(2, "0")}</span>
            <button onClick={() => onHourChange((hour + 1) % 24)} className="w-8 h-8 rounded-full bg-[#F8F8FC] flex items-center justify-center text-[#5B5CE2] font-bold text-lg">+</button>
          </div>
          <span className="text-2xl font-bold text-[#6B6B80]">:</span>
          <div className="flex items-center gap-2">
            <button onClick={() => onMinuteChange((minute - 15 + 60) % 60)} className="w-8 h-8 rounded-full bg-[#F8F8FC] flex items-center justify-center text-[#5B5CE2] font-bold text-lg">-</button>
            <span className="text-2xl font-bold text-[#0F0F1A] w-10 text-center">{String(minute).padStart(2, "0")}</span>
            <button onClick={() => onMinuteChange((minute + 15) % 60)} className="w-8 h-8 rounded-full bg-[#F8F8FC] flex items-center justify-center text-[#5B5CE2] font-bold text-lg">+</button>
          </div>
        </div>
      )}
      {!enabled && <p className="text-xs text-[#6B6B80]">Devre dışı</p>}
    </div>
  );
}

export default function BriefingSettings() {
  useNavigation();
  const [morningHour, setMorningHour] = useState(7);
  const [morningMin, setMorningMin] = useState(30);
  const [morningOn, setMorningOn] = useState(true);
  const [middayHour, setMiddayHour] = useState(13);
  const [middayMin, setMiddayMin] = useState(0);
  const [middayOn, setMiddayOn] = useState(true);
  const [eveningHour, setEveningHour] = useState(19);
  const [eveningMin, setEveningMin] = useState(0);
  const [eveningOn, setEveningOn] = useState(true);
  const [weekend, setWeekend] = useState(false);
  const [silentDays, setSilentDays] = useState(DEFAULT_SILENT);

  const toggleDay = (i: number) => {
    const copy = [...silentDays];
    copy[i] = !copy[i];
    setSilentDays(copy);
  };

  return (
    <div className="min-h-screen bg-[#F8F8FC]">
      <PageHeader title="Brifing Ayarları" showBack />
      <div className="px-4 pt-4 pb-8">
        <p className="text-xs text-[#6B6B80] mb-4 px-1">Günlük brifing saatlerinizi kişiselleştirin.</p>

        <h3 className="text-xs font-semibold text-[#6B6B80] uppercase tracking-wide mb-2 px-1">Brifing Saatleri</h3>
        <TimePicker label="Sabah Brifing" hour={morningHour} minute={morningMin} enabled={morningOn} onHourChange={setMorningHour} onMinuteChange={setMorningMin} onToggle={() => setMorningOn(!morningOn)} />
        <TimePicker label="Gün Ortası Nabzı" hour={middayHour} minute={middayMin} enabled={middayOn} onHourChange={setMiddayHour} onMinuteChange={setMiddayMin} onToggle={() => setMiddayOn(!middayOn)} />
        <TimePicker label="Akşam Kapanış" hour={eveningHour} minute={eveningMin} enabled={eveningOn} onHourChange={setEveningHour} onMinuteChange={setEveningMin} onToggle={() => setEveningOn(!eveningOn)} />

        <h3 className="text-xs font-semibold text-[#6B6B80] uppercase tracking-wide mt-5 mb-2 px-1">Genel</h3>
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E8F0] overflow-hidden mb-3">
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-[#0F0F1A]">Hafta sonu brifing</p>
              <p className="text-xs text-[#6B6B80]">Cumartesi ve Pazar dahil et</p>
            </div>
            <button onClick={() => setWeekend(!weekend)} className={`w-11 h-6 rounded-full transition-colors relative ${weekend ? "bg-[#5B5CE2]" : "bg-[#E8E8F0]"}`}>
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${weekend ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
          <div className="border-t border-[#E8E8F0] px-4 py-3">
            <p className="text-sm font-semibold text-[#0F0F1A] mb-1">Saat Dilimi</p>
            <p className="text-sm text-[#6B6B80]">Istanbul (GMT+3)</p>
          </div>
        </div>

        <h3 className="text-xs font-semibold text-[#6B6B80] uppercase tracking-wide mt-5 mb-2 px-1">Sessiz Günler</h3>
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E8F0] p-4">
          <p className="text-xs text-[#6B6B80] mb-3">Brifing almak istediginiz günleri seçin</p>
          <div className="flex gap-2 flex-wrap">
            {DAYS.map((day, i) => (
              <button
                key={day}
                onClick={() => toggleDay(i)}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${silentDays[i] ? "bg-[#5B5CE2] text-white" : "bg-[#F8F8FC] text-[#6B6B80] border border-[#E8E8F0]"}`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
