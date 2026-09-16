import { useState } from "react";
import { useNavigation } from "../../context/NavigationContext";
import PageHeader from "../../components/layout/PageHeader";

type FeedbackType = "bug" | "feature" | "general";

interface FeedbackOption {
  type: FeedbackType;
  label: string;
  desc: string;
  icon: string;
}

const OPTIONS: FeedbackOption[] = [
  { type: "bug", label: "Hata Bildirimi", desc: "Bir sorun veya hata buldum", icon: "🐛" },
  { type: "feature", label: "Özellik Istegi", desc: "Yeni bir özellik önermek istiyorum", icon: "💡" },
  { type: "general", label: "Genel Geri Bildirim", desc: "Genel görüs ve düsüncelerim", icon: "💬" },
];

function StarRating({ rating, onChange }: { rating: number; onChange: (r: number) => void }) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange(star)}
          className="text-2xl transition-transform hover:scale-110"
        >
          <span className={star <= rating ? "text-[#F59E0B]" : "text-[#E8E8F0]"}>★</span>
        </button>
      ))}
    </div>
  );
}

export default function FeedbackScreen() {
  useNavigation();
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("general");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!message.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8F8FC]">
        <PageHeader title="Geri Bildirim" showBack />
        <div className="flex flex-col items-center justify-center px-8 pt-24">
          <div className="w-20 h-20 rounded-full bg-[#ECFDF5] flex items-center justify-center mb-6 animate-bounce">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M7 18L14 25L29 10" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#0F0F1A] mb-2">Tesekkürler!</h2>
          <p className="text-sm text-[#6B6B80] text-center leading-relaxed">Geri bildiriminiz iletildi. En kisa sürede degerlendirip geri dönecegiz.</p>
          <button
            onClick={() => { setSubmitted(false); setMessage(""); setEmail(""); setRating(0); }}
            className="mt-8 px-6 py-2.5 bg-[#5B5CE2] text-white rounded-2xl text-sm font-semibold"
          >
            Yeni Geri Bildirim
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8FC]">
      <PageHeader title="Geri Bildirim" showBack />
      <div className="px-4 pt-4 pb-8">

        <h3 className="text-xs font-semibold text-[#6B6B80] uppercase tracking-wide mb-2 px-1">Bildirim Türü</h3>
        <div className="grid grid-cols-1 gap-3 mb-5">
          {OPTIONS.map((opt) => (
            <button
              key={opt.type}
              onClick={() => setFeedbackType(opt.type)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 text-left transition-all shadow-sm ${feedbackType === opt.type ? "border-[#5B5CE2] bg-[#F3F3FD]" : "border-[#E8E8F0] bg-white"}`}
            >
              <span className="text-2xl">{opt.icon}</span>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${feedbackType === opt.type ? "text-[#5B5CE2]" : "text-[#0F0F1A]"}`}>{opt.label}</p>
                <p className="text-xs text-[#6B6B80]">{opt.desc}</p>
              </div>
              {feedbackType === opt.type && (
                <div className="w-5 h-5 rounded-full bg-[#5B5CE2] flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        <h3 className="text-xs font-semibold text-[#6B6B80] uppercase tracking-wide mb-2 px-1">Puanlamaniz</h3>
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E8F0] px-4 py-4 mb-5">
          <StarRating rating={rating} onChange={setRating} />
          {rating > 0 && (
            <p className="text-xs text-[#6B6B80] mt-2">
              {rating === 5 ? "Mükemmel!" : rating === 4 ? "Çok iyi!" : rating === 3 ? "Iyi" : rating === 2 ? "Gelistirilebilir" : "Kötü"}
            </p>
          )}
        </div>

        <h3 className="text-xs font-semibold text-[#6B6B80] uppercase tracking-wide mb-2 px-1">Mesajiniz</h3>
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E8F0] mb-3 overflow-hidden">
          <textarea
            className="w-full px-4 py-3 text-sm text-[#0F0F1A] outline-none resize-none min-h-[120px] bg-transparent placeholder-[#B0B0C8]"
            placeholder="Görüs ve önerilerinizi buraya yazin..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <h3 className="text-xs font-semibold text-[#6B6B80] uppercase tracking-wide mb-2 px-1">E-posta (istege bagli)</h3>
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E8F0] mb-6 overflow-hidden">
          <input
            className="w-full px-4 py-3 text-sm text-[#0F0F1A] outline-none bg-transparent placeholder-[#B0B0C8]"
            placeholder="e-posta@ornek.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!message.trim() || submitting}
          className={`w-full py-3.5 rounded-2xl text-white font-semibold text-base transition-all ${message.trim() && !submitting ? "bg-[#5B5CE2] shadow-md active:scale-98" : "bg-[#B0B0C8]"}`}
        >
          {submitting ? "Gönderiliyor..." : "Geri Bildirim Gönder"}
        </button>
      </div>
    </div>
  );
}
