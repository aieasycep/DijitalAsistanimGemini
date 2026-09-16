import { useNavigation } from "../../context/NavigationContext";
import { useTheme, ThemeMode } from "../../context/ThemeContext";
import PageHeader from "../../components/layout/PageHeader";

const THEMES: { value: ThemeMode; label: string; icon: string; desc: string }[] = [
  { value: "system", label: "Sistem", icon: "⚙️", desc: "Cihaz ayarına göre" },
  { value: "light", label: "Açık", icon: "☀️", desc: "Her zaman açık" },
  { value: "dark", label: "Koyu", icon: "🌙", desc: "Her zaman koyu" },
];

function ThemePreview({ isDark }: { isDark: boolean }) {
  const bg = isDark ? "#0F0F1A" : "#F8F8FC";
  const surface = isDark ? "#1E1E2E" : "#FFFFFF";
  const text = isDark ? "#EAEAF8" : "#0F0F1A";
  const sub = isDark ? "#9090B8" : "#6B6B80";
  const border = isDark ? "#3A3A50" : "#E8E8F0";
  return (
    <div style={{ background: bg, borderRadius: 16, padding: 12, border: `1px solid ${border}`, marginTop: 12 }}>
      <div style={{ background: surface, borderRadius: 12, padding: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 12, background: "#5B5CE2" }} />
          <div>
            <div style={{ height: 8, borderRadius: 4, background: text, width: 80, marginBottom: 4 }} />
            <div style={{ height: 6, borderRadius: 3, background: sub, width: 56 }} />
          </div>
        </div>
        <div style={{ height: 6, borderRadius: 3, background: sub, opacity: 0.4, marginBottom: 4 }} />
        <div style={{ height: 6, borderRadius: 3, background: sub, opacity: 0.25, width: "65%", marginBottom: 8 }} />
        <div style={{ background: "#5B5CE2", borderRadius: 8, height: 20, width: 60 }} />
      </div>
    </div>
  );
}

export default function AppearanceSettings() {
  useNavigation();
  const { mode, isDark, setMode } = useTheme();

  return (
    <div style={{ minHeight: "100%", background: isDark ? "#0F0F1A" : "#F8F8FC" }}>
      <PageHeader title="Görünüm" showBack />
      <div style={{ padding: "16px 16px 32px" }}>
        <h3 style={{ fontSize: 11, fontWeight: 700, color: "#A0A0B2", letterSpacing: "0.05em", marginBottom: 8 }}>
          TEMA
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 4 }}>
          {THEMES.map((th) => (
            <button
              key={th.value}
              onClick={() => setMode(th.value)}
              style={{
                borderRadius: 16, padding: "12px 8px", border: `2px solid ${mode === th.value ? "#5B5CE2" : "#E8E8F0"}`,
                background: mode === th.value ? "#F3F3FD" : "#fff",
                cursor: "pointer", textAlign: "center",
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 4 }}>{th.icon}</div>
              <p style={{ fontSize: 13, fontWeight: 700, color: mode === th.value ? "#5B5CE2" : "#0F0F1A", marginBottom: 2 }}>{th.label}</p>
              <p style={{ fontSize: 11, color: "#6B6B80" }}>{th.desc}</p>
              {mode === th.value && (
                <div style={{ width: 8, height: 8, borderRadius: 4, background: "#5B5CE2", margin: "6px auto 0" }} />
              )}
            </button>
          ))}
        </div>

        <ThemePreview isDark={isDark} />

        <div style={{ marginTop: 16, background: "#fff", borderRadius: 14, padding: "12px 14px", border: "1px solid #E8E8F0" }}>
          <p style={{ fontSize: 13, color: "#6B6B80" }}>
            Şu an aktif: <span style={{ fontWeight: 700, color: "#5B5CE2" }}>{THEMES.find(th => th.value === mode)?.label}</span> tema
          </p>
        </div>
      </div>
    </div>
  );
}
