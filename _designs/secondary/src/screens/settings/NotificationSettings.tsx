import { useState } from "react";
import { useNavigation } from "../../context/NavigationContext";
import PageHeader from "../../components/layout/PageHeader";

interface ToggleRowProps {
  label: string;
  description?: string;
  value: boolean;
  onChange: () => void;
  accent?: boolean;
}

function ToggleRow({ label, description, value, onChange, accent }: ToggleRowProps) {
  return (
    <div className={`flex items-center justify-between px-4 py-3 ${accent ? "bg-[#F3F3FD]" : ""}`}>
      <div className="flex-1 mr-4">
        <p className={`text-sm font-semibold ${accent ? "text-[#5B5CE2]" : "text-[#0F0F1A]"}`}>{label}</p>
        {description && <p className="text-xs text-[#6B6B80] mt-0.5">{description}</p>}
      </div>
      <button
        onClick={onChange}
        className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${value ? "bg-[#5B5CE2]" : "bg-[#E8E8F0]"}`}
      >
        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}

export default function NotificationSettings() {
  useNavigation();
  const [smartFilter, setSmartFilter] = useState(true);
  const [sabah, setSabah] = useState(true);
  const [gunOrtasi, setGunOrtasi] = useState(true);
  const [aksam, setAksam] = useState(true);
  const [kritik, setKritik] = useState(true);
  const [toplantilar, setToplantilar] = useState(true);
  const [sonTarihler, setSonTarihler] = useState(true);
  const [takip, setTakip] = useState(true);
  const [lifeIntel, setLifeIntel] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F8FC]">
      <PageHeader title="Bildirim Ayarları" showBack />
      <div className="px-4 pt-4 pb-8">

        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E8F0] overflow-hidden mb-5">
          <ToggleRow
            label="Akıllı Filtre"
            description="Yalnızca gerçekten önemliyse bildir"
            value={smartFilter}
            onChange={() => setSmartFilter(!smartFilter)}
            accent
          />
        </div>

        <h3 className="text-xs font-semibold text-[#6B6B80] uppercase tracking-wide mb-2 px-1">Brifing Bildirimleri</h3>
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E8F0] overflow-hidden mb-5">
          <ToggleRow label="Sabah Brifing" description="Her sabah günlük özetiniz" value={sabah} onChange={() => setSabah(!sabah)} />
          <div className="border-t border-[#E8E8F0]" />
          <ToggleRow label="Gün Ortası Nabzı" description="Öğle saati güncelleme" value={gunOrtasi} onChange={() => setGunOrtasi(!gunOrtasi)} />
          <div className="border-t border-[#E8E8F0]" />
          <ToggleRow label="Akşam Kapanış" description="Günün özeti ve yarına hazırlık" value={aksam} onChange={() => setAksam(!aksam)} />
        </div>

        <h3 className="text-xs font-semibold text-[#6B6B80] uppercase tracking-wide mb-2 px-1">Anlık Bildirimler</h3>
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E8F0] overflow-hidden mb-5">
          <ToggleRow label="Kritik E-postalar" description="Yüksek öncelikli mesajlar" value={kritik} onChange={() => setKritik(!kritik)} />
          <div className="border-t border-[#E8E8F0]" />
          <ToggleRow label="Toplantılar" description="Toplantı hatırlatmaları" value={toplantilar} onChange={() => setToplantilar(!toplantilar)} />
          <div className="border-t border-[#E8E8F0]" />
          <ToggleRow label="Son Tarihler" description="Yaklaşan teslim tarihleri" value={sonTarihler} onChange={() => setSonTarihler(!sonTarihler)} />
          <div className="border-t border-[#E8E8F0]" />
          <ToggleRow label="Takip Hatırlatmaları" description="Yanıt bekleyen e-postalar" value={takip} onChange={() => setTakip(!takip)} />
        </div>

        <h3 className="text-xs font-semibold text-[#6B6B80] uppercase tracking-wide mb-2 px-1">Yaşam Zekası</h3>
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E8F0] overflow-hidden">
          <ToggleRow label="Life Intelligence" description="Kargo, uçuş, ödeme takibi" value={lifeIntel} onChange={() => setLifeIntel(!lifeIntel)} />
        </div>
      </div>
    </div>
  );
}
