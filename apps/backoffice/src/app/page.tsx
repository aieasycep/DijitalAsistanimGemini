export default function DashboardPage() {
  const kpiData = [
    {
      title: "Toplam Kullanıcı",
      value: "124,850",
      change: "+%12.8",
      trend: "up",
      period: "geçen aya göre",
      detail: "118,200 doğrulanmış hesap",
      iconBg: "bg-blue-500/10 text-blue-600",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "Aktif Kullanıcı",
      value: "42,910",
      change: "+%8.4",
      trend: "up",
      period: "bu hafta",
      detail: "DAU: 14,350 | MAU: 42,910",
      iconBg: "bg-emerald-500/10 text-emerald-600",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: "Yeni Kullanıcı",
      value: "3,180",
      change: "+%21.5",
      trend: "up",
      period: "son 7 gün",
      detail: "Kayıt tamamlama oranı: %68.4",
      iconBg: "bg-violet-500/10 text-violet-600",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
    },
    {
      title: "AI Maliyetleri",
      value: "$4,120.85",
      change: "-%5.2",
      trend: "down",
      period: "bu ay (tasarruf)",
      detail: "Ort. $0.032 / aktif kullanıcı",
      iconBg: "bg-amber-500/10 text-amber-600",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const aiModels = [
    { name: "Claude 3.5 Sonnet", role: "Ana Muhakeme & Brifing", calls: "42,810", avgLatency: "640ms", costShare: "58%", status: "Sağlıklı" },
    { name: "OpenAI GPT-4o", role: "Hızlı Sınıflandırma & Niyet", calls: "31,450", avgLatency: "480ms", costShare: "28%", status: "Sağlıklı" },
    { name: "Google Gemini 1.5 Pro", role: "Uzun Doküman & Çoklu Modal", calls: "18,920", avgLatency: "410ms", costShare: "14%", status: "Sağlıklı" },
  ];

  const recentLogs = [
    { id: "LOG-8912", user: "ahmet.y@dijitalasistan.ai", role: "super_admin", action: "Prompt Version v2.4 yayımlandı", target: "ai_pipeline", time: "12 dk önce", status: "Başarılı" },
    { id: "LOG-8911", user: "system_cron", role: "system", action: "OAuth Token senkronizasyonu tamamlandı", target: "google_workspace", time: "28 dk önce", status: "Başarılı" },
    { id: "LOG-8910", user: "zeynep.k@dijitalasistan.ai", role: "operations", action: "Kullanıcı veri dışa aktarım onayı", target: "user_req_4901", time: "1 saat önce", status: "Başarılı" },
    { id: "LOG-8909", user: "system_monitor", role: "ai_ops", action: "Rate limit eşiği güncellendi (120 req/m)", target: "rate_limiter", time: "2 saat önce", status: "Başarılı" },
    { id: "LOG-8908", user: "burak.t@dijitalasistan.ai", role: "support", action: "Kullanıcı hesap durumu incelendi", target: "usr_99214", time: "3 saat önce", status: "Başarılı" },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Genel Bakış (Overview)</h1>
          <p className="text-sm text-slate-500 mt-1">
            Dijital Asistan platform operasyonları, kullanıcı KPI’ları ve AI altyapı metrikleri.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600 shadow-xs">
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Son 30 Gün
          </span>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Rapor İndir
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {kpiData.map((kpi) => (
          <div
            key={kpi.title}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">{kpi.title}</span>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${kpi.iconBg}`}>
                {kpi.icon}
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-slate-900 tracking-tight">{kpi.value}</div>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`inline-flex items-center text-xs font-semibold ${
                    kpi.trend === "up" ? "text-emerald-600" : "text-indigo-600"
                  }`}
                >
                  {kpi.change}
                </span>
                <span className="text-xs text-slate-400">{kpi.period}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2.5 pt-2.5 border-t border-slate-100 truncate">
                {kpi.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* AI Pipeline & Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Model Pipeline Status */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-slate-900">AI Model Dağılımı ve Maliyet Payı</h2>
              <p className="text-xs text-slate-500 mt-0.5">Aktif LLM yönlendirme performansı ve gecikme süreleri</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium">
              3 Model Aktif
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3">Model</th>
                  <th className="pb-3">Rol</th>
                  <th className="pb-3">Toplam Çağrı</th>
                  <th className="pb-3">Ort. Gecikme</th>
                  <th className="pb-3">Maliyet Payı</th>
                  <th className="pb-3 text-right">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {aiModels.map((model) => (
                  <tr key={model.name} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 font-medium text-slate-800">{model.name}</td>
                    <td className="py-3.5 text-slate-500">{model.role}</td>
                    <td className="py-3.5 font-mono text-slate-700">{model.calls}</td>
                    <td className="py-3.5 font-mono text-slate-700">{model.avgLatency}</td>
                    <td className="py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 rounded-full h-1.5">
                          <div
                            className="bg-indigo-600 h-1.5 rounded-full"
                            style={{ width: model.costShare }}
                          ></div>
                        </div>
                        <span className="font-mono text-slate-600 text-[11px]">{model.costShare}</span>
                      </div>
                    </td>
                    <td className="py-3.5 text-right">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {model.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health / Entegrasyonlar */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-slate-900">Entegrasyon Durumu</h2>
              <span className="text-xs text-slate-400 font-mono">99.98% Uptime</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Kullanıcı hesaplarına bağlı harici servis sağlayıcıları ve veri tabanı durumu.
            </p>

            <div className="space-y-3.5">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <div>
                    <p className="text-xs font-medium text-slate-800">Google Workspace (Gmail & Calendar)</p>
                    <p className="text-[10px] text-slate-400">OAuth 2.0 Senkronizasyon</p>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-emerald-600">Aktif</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <div>
                    <p className="text-xs font-medium text-slate-800">Microsoft 365 (Outlook)</p>
                    <p className="text-[10px] text-slate-400">Graph API Webhook</p>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-emerald-600">Aktif</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <div>
                    <p className="text-xs font-medium text-slate-800">Supabase & Vektör Veritabanı</p>
                    <p className="text-[10px] text-slate-400">pgvector & RLS Policy</p>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-emerald-600">Aktif</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <div>
                    <p className="text-xs font-medium text-slate-800">Arka Plan Görevleri (Cron)</p>
                    <p className="text-[10px] text-slate-400">Sabah & Akşam Brifingi</p>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-emerald-600">Aktif</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Son genel kontrol: 2 dk önce</span>
            <span className="text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer">Detaylar &rarr;</span>
          </div>
        </div>
      </div>

      {/* Recent Operations & Audit Logs */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Son Sistem İşlemleri ve Denetim Kayıtları (Audit Logs)</h2>
            <p className="text-xs text-slate-500 mt-0.5">RBAC yetkili personel ve sistem tarafından gerçekleştirilen kritik operasyonlar</p>
          </div>
          <button
            type="button"
            className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
          >
            Tüm Logları Görüntüle &rarr;
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-3">İşlem ID</th>
                <th className="pb-3">Kullanıcı</th>
                <th className="pb-3">RBAC Rolü</th>
                <th className="pb-3">Açıklama / Aksiyon</th>
                <th className="pb-3">Hedef</th>
                <th className="pb-3">Zaman</th>
                <th className="pb-3 text-right">Sonuç</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {recentLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 font-mono text-slate-500 text-[11px]">{log.id}</td>
                  <td className="py-3 font-medium text-slate-800">{log.user}</td>
                  <td className="py-3">
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono font-medium">
                      {log.role}
                    </span>
                  </td>
                  <td className="py-3 text-slate-700">{log.action}</td>
                  <td className="py-3 font-mono text-[11px] text-slate-500">{log.target}</td>
                  <td className="py-3 text-slate-400 text-[11px]">{log.time}</td>
                  <td className="py-3 text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

