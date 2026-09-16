import { useState } from "react";
import { useNavigation } from "../../context/NavigationContext";
import PageHeader from "../../components/layout/PageHeader";
import BottomSheet from "../../components/layout/BottomSheet";
import type { ScreenName } from "../../types";

interface HelpItem {
  id: string;
  label: string;
  action?: "navigate" | "email" | "sheet";
  target?: ScreenName | string;
}

interface HelpSection {
  title: string;
  items: HelpItem[];
}

const SECTIONS: HelpSection[] = [
  {
    title: "Baslarken",
    items: [
      { id: "setup", label: "Ilk Kurulum", action: "sheet" },
      { id: "connect", label: "Hesap Baglama", action: "sheet" },
      { id: "briefing-settings", label: "Brifing Ayarlari", action: "sheet" },
    ],
  },
  {
    title: "Özellikler",
    items: [
      { id: "morning", label: "Sabah Brifing Nedir?", action: "sheet" },
      { id: "mail-intel", label: "Mail Zekasi Nasil Çalisir?", action: "sheet" },
      { id: "commitments", label: "Taahhüt Takibi", action: "sheet" },
    ],
  },
  {
    title: "Entegrasyonlar",
    items: [
      { id: "gmail", label: "Gmail Baglama", action: "sheet" },
      { id: "calendar", label: "Takvim Erisimi", action: "sheet" },
      { id: "outlook", label: "Outlook Kurulumu", action: "sheet" },
    ],
  },
  {
    title: "Destek",
    items: [
      { id: "feedback", label: "Hata Bildir", action: "navigate", target: "feedback" },
      { id: "contact", label: "Destek ile Iletisim", action: "email", target: "destek@dijitalasistan.app" },
    ],
  },
];

export default function HelpScreen() {
  const { navigate } = useNavigation();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetTitle, setSheetTitle] = useState("");
  const [emailVisible, setEmailVisible] = useState(false);

  const handleItem = (item: HelpItem) => {
    if (item.action === "navigate" && item.target) {
      navigate(item.target as ScreenName);
    } else if (item.action === "email") {
      setEmailVisible(true);
    } else {
      setSheetTitle(item.label);
      setSheetOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8FC]">
      <PageHeader title="Yardim" showBack />
      <div className="px-4 pt-4 pb-8">

        {SECTIONS.map((section) => (
          <div key={section.title} className="mb-5">
            <h3 className="text-xs font-semibold text-[#6B6B80] uppercase tracking-wide mb-2 px-1">{section.title}</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8E8F0] overflow-hidden">
              {section.items.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => handleItem(item)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 hover:bg-[#F8F8FC] transition-colors ${idx > 0 ? "border-t border-[#E8E8F0]" : ""}`}
                >
                  <span className="text-sm text-[#0F0F1A]">{item.label}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4L10 8L6 12" stroke="#C8C8D8" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        ))}

        {emailVisible && (
          <div className="bg-[#F3F3FD] border border-[#C8C8F0] rounded-2xl px-4 py-4 mb-4 flex items-center gap-3">
            <span className="text-2xl">✉️</span>
            <div>
              <p className="text-sm font-semibold text-[#0F0F1A]">Destek E-postasi</p>
              <p className="text-sm text-[#5B5CE2]">destek@dijitalasistan.app</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E8F0] p-4 text-center">
          <p className="text-xs text-[#6B6B80]">Dijital Asistan v1.0.0</p>
          <p className="text-xs text-[#6B6B80] mt-0.5">Tüm haklar saklidir © 2025</p>
        </div>
      </div>

      <BottomSheet isOpen={sheetOpen} onClose={() => setSheetOpen(false)} title={sheetTitle}>
        <div className="px-4 pb-6">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#F3F3FD] flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📖</span>
              </div>
              <p className="text-sm text-[#6B6B80] leading-relaxed">Bu konuyla ilgili yardim içerigi hazirlaniyor.</p>
              <p className="text-xs text-[#6B6B80] mt-2">Sorulariniz için destek ekibimize yazabilirsiniz.</p>
            </div>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
