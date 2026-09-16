import { useNavigation } from "../../context/NavigationContext";
import PageHeader from "../../components/layout/PageHeader";

interface LangRowProps {
  code: string;
  label: string;
  nativeLabel: string;
  selected?: boolean;
  comingSoon?: boolean;
}

function LangRow({ label, nativeLabel, selected, comingSoon }: LangRowProps) {
  return (
    <div className={`flex items-center justify-between px-4 py-3.5 border-b border-[#E8E8F0] last:border-0 ${selected ? "bg-[#F3F3FD]" : ""}`}>
      <div className="flex items-center gap-3">
        <div>
          <p className={`text-sm font-semibold ${selected ? "text-[#5B5CE2]" : "text-[#0F0F1A]"}`}>{label}</p>
          <p className="text-xs text-[#6B6B80]">{nativeLabel}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {comingSoon && (
          <span className="text-xs bg-[#FFF3DC] text-[#B45309] px-2 py-0.5 rounded-full font-medium">Yakinda</span>
        )}
        {selected && (
          <div className="w-5 h-5 rounded-full bg-[#5B5CE2] flex items-center justify-center">
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
        {!selected && !comingSoon && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="#C8C8D8" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </div>
    </div>
  );
}

export default function LanguageSettings() {
  useNavigation();

  return (
    <div className="min-h-screen bg-[#F8F8FC]">
      <PageHeader title="Dil Ayarlari" showBack />
      <div className="px-4 pt-4 pb-8">
        <h3 className="text-xs font-semibold text-[#6B6B80] uppercase tracking-wide mb-2 px-1">Uygulama Dili</h3>
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E8F0] overflow-hidden mb-4">
          <LangRow code="tr" label="Türkçe" nativeLabel="Türkçe" selected />
          <LangRow code="en" label="English" nativeLabel="English" comingSoon />
          <LangRow code="de" label="Almanca" nativeLabel="Deutsch" comingSoon />
          <LangRow code="fr" label="Fransizca" nativeLabel="Français" comingSoon />
          <LangRow code="es" label="Ispanyolca" nativeLabel="Español" comingSoon />
        </div>

        <div className="bg-[#FFF8E6] border border-[#F0D88A] rounded-2xl px-4 py-3 flex gap-3 items-start">
          <span className="text-lg flex-shrink-0">ℹ️</span>
          <p className="text-sm text-[#92640C]">Dil degisikligi uygulamayi yeniden baslatir. Kaydedilmemis verileriniz korunur.</p>
        </div>

        <h3 className="text-xs font-semibold text-[#6B6B80] uppercase tracking-wide mt-6 mb-2 px-1">Bölge Ayarlari</h3>
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E8F0] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#E8E8F0]">
            <div>
              <p className="text-sm font-semibold text-[#0F0F1A]">Tarih Formati</p>
              <p className="text-xs text-[#6B6B80]">31.12.2025</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="#C8C8D8" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex items-center justify-between px-4 py-3.5">
            <div>
              <p className="text-sm font-semibold text-[#0F0F1A]">Saat Formati</p>
              <p className="text-xs text-[#6B6B80]">24 saat (14:30)</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="#C8C8D8" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
