"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#090A0F] text-slate-100 selection:bg-[#5B5CE2]/30 selection:text-indigo-200">
      {/* Background Ambience Gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-[#5B5CE2]/20 via-[#4547C9]/10 to-transparent blur-3xl opacity-70" />
        <div className="absolute top-[800px] right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[140px] rounded-full" />
        <div className="absolute top-[1600px] left-0 w-[600px] h-[600px] bg-violet-600/10 blur-[160px] rounded-full" />
      </div>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Eyebrow Pill */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.12] text-xs font-medium text-zinc-300 backdrop-blur-md shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-400 font-semibold tracking-wide uppercase text-[11px]">
              Yapay Zekâ Yönetici Asistanı
            </span>
            <span className="text-white/20">|</span>
            <span className="text-indigo-300 font-medium">7 Gün Ücretsiz Deneme</span>
          </div>
        </div>

        {/* Hero Headline & Slogan */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Bugün bilmen gerekenleri,{" "}
            <span className="bg-gradient-to-r from-[#A5A6F6] via-[#7B7CF4] to-[#5B5CE2] bg-clip-text text-transparent underline decoration-[#5B5CE2]/30 decoration-wavy decoration-2 underline-offset-8">
              sen sormadan söyler.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
            83 gelen e-posta arasından dikkat gerektiren <strong className="text-white font-semibold">4 konuyu</strong>, yaklaşan toplantının kritik 3 maddesini ve kaçırmaman gereken taahhütleri sabah <strong className="text-white font-semibold">08:00&apos;de</strong> önünüze serer.
          </p>

          {/* CTAs: App Store, Google Play & Web */}
          <div id="download" className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {/* App Store Button */}
            <a
              href="#download"
              className="group flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.15] text-white shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              <svg className="w-7 h-7 fill-current text-white" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 1.01-2.87-.96.04-2.13.64-2.79 1.41-.58.68-1.1 1.74-1.02 2.79 1.07.08 2.18-.58 2.8-1.33z" />
              </svg>
              <div className="text-left">
                <div className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400">
                  App Store&apos;dan
                </div>
                <div className="text-sm font-bold tracking-tight text-white">İndirin</div>
              </div>
            </a>

            {/* Google Play Button */}
            <a
              href="#download"
              className="group flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.15] text-white shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              <svg className="w-7 h-7 fill-current text-white" viewBox="0 0 24 24">
                <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.34 0 .66.11.92.31l13.5 8.5c.67.42.88 1.3.46 1.97-.12.19-.28.35-.46.46l-13.5 8.5c-.26.2-.58.31-.92.31-.83 0-1.5-.67-1.5-1.55zM17.5 12L6 4.8v14.4l11.5-7.2z" />
              </svg>
              <div className="text-left">
                <div className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400">
                  Google Play&apos;den
                </div>
                <div className="text-sm font-bold tracking-tight text-white">Edinin</div>
              </div>
            </a>

            {/* Web CTA Primary */}
            <Link
              href="#pricing"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#5B5CE2] to-[#4547C9] hover:from-[#6B6CF4] hover:to-[#5254D8] text-white font-semibold text-sm shadow-xl shadow-indigo-500/25 ring-1 ring-white/20 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <span>Hemen Ücretsiz Başla</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 font-medium">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Kredi kartı gerekmez
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              7 Gün tam özellikli deneme
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Uçtan uca şifreli & gizli
            </span>
          </div>
        </div>

        {/* Hero Visual Mockup: Product Interface in Action */}
        <div className="mt-16 sm:mt-20 relative max-w-4xl mx-auto">
          {/* Subtle Outer Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[32px] blur-xl opacity-70" />

          {/* Main Card Container */}
          <div className="relative rounded-[28px] border border-white/[0.12] bg-[#11121C]/90 p-5 sm:p-8 backdrop-blur-2xl shadow-2xl">
            {/* Top Bar Mockup */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-3 text-xs font-mono text-zinc-400">dijital-asistan.app · Canlı Görünüm</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                  08:00 SABAH BRİFİNGİ
                </span>
              </div>
            </div>

            {/* Inner Dashboard Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Morning Briefing Card */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="rounded-2xl bg-gradient-to-br from-[#1E1E4C] via-[#2A2B70] to-[#14142B] p-6 text-white border border-indigo-500/30 shadow-lg relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-indigo-200">
                      <span className="text-sm">✨</span> BRİFİNG HAZIR · 07:58
                    </span>
                    <span className="text-xs text-indigo-300/80 font-medium">5 Eylül Cumartesi</span>
                  </div>

                  <h3 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    Bugün bilmen gereken <span className="text-indigo-300">5</span> şey var.
                  </h3>
                  <p className="mt-2 text-sm text-indigo-100/80">
                    3 önemli e-posta · 4 takvim etkinliği · 2 bekleyen taahhüt
                  </p>

                  {/* Action Bar */}
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button className="px-4 py-2.5 rounded-xl bg-white text-[#1E1E4C] font-semibold text-xs shadow hover:bg-slate-100 transition-colors">
                      Brifingi İncele
                    </button>
                    <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 text-white font-medium text-xs backdrop-blur-sm border border-white/10">
                      <svg className="w-4 h-4 text-indigo-300 fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span>Dinle · 2 dk</span>
                      <span className="flex gap-0.5 items-end h-3 ml-1">
                        <span className="w-0.5 h-2 bg-indigo-300 animate-pulse" />
                        <span className="w-0.5 h-3 bg-indigo-200 animate-pulse" />
                        <span className="w-0.5 h-1.5 bg-indigo-300 animate-pulse" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Priority Notification Item 1 */}
                <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-4 flex items-start gap-3.5 hover:bg-white/[0.06] transition-colors">
                  <span className="flex-shrink-0 px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-400 border border-rose-500/30 text-[10px] font-bold tracking-wider">
                    ACİL
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-semibold text-zinc-100 truncate">
                        Ahmet revize teklifi bugün 17:00&apos;ye kadar bekliyor.
                      </h4>
                      <span className="text-[11px] text-zinc-500 whitespace-nowrap">08:42</span>
                    </div>
                    <p className="mt-1 text-xs text-zinc-400">
                      Gmail · Ahmet Yılmaz · Ekli revize fiyat PDF&apos;i hazırlanması gerekiyor.
                    </p>
                  </div>
                </div>

                {/* Priority Notification Item 2 */}
                <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-4 flex items-start gap-3.5 hover:bg-white/[0.06] transition-colors">
                  <span className="flex-shrink-0 px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-bold tracking-wider">
                    GÜNDEM
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-semibold text-zinc-100 truncate">
                        14:30 Mehmet ile Müşteri Toplantısı
                      </h4>
                      <span className="text-[11px] text-zinc-500 whitespace-nowrap">14:30</span>
                    </div>
                    <p className="mt-1 text-xs text-zinc-400">
                      Google Meet · Görüşme öncesi konuşulması gereken 3 konu hazırlandı.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Mail Intelligence & Insights */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Mail Zekâsı Filtresi
                    </span>
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      %95 Gürültü Elendi
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-extrabold text-white tracking-tight">83</span>
                    <span className="text-sm text-zinc-400">gelen e-posta</span>
                  </div>
                  <div className="text-sm font-medium text-indigo-300 mb-4">
                    Yalnızca <strong className="text-white underline">4 tanesi</strong> doğrudan aksiyon istiyor.
                  </div>

                  {/* Ratio visual bar */}
                  <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden flex mb-4">
                    <div className="bg-[#5B5CE2] h-full w-[6%]" title="4 Önemli Mail" />
                    <div className="bg-indigo-400/40 h-full w-[34%]" title="Bilgi / Takip" />
                    <div className="bg-zinc-700/50 h-full w-[60%]" title="Bülten & Otomatik" />
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-white/[0.06] text-xs">
                    <div className="flex items-center justify-between text-zinc-300">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#5B5CE2]" />
                        Kritik Onay & Teklifler
                      </span>
                      <span className="font-semibold text-white">4 mail</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-400">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-400/40" />
                        Düzenli İş Bildirimleri
                      </span>
                      <span>28 mail</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-500">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-zinc-700/50" />
                        Bülten & Promosyonlar
                      </span>
                      <span>51 mail (sessize alındı)</span>
                    </div>
                  </div>
                </div>

                {/* Assistant Fast Stats */}
                <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-zinc-400 font-medium">Günlük Zaman Tasarrufu</div>
                    <div className="text-lg font-bold text-white mt-0.5">2 Saat 48 Dakika</div>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                    ⚡️
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Bar */}
        <div className="mt-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-6">
            Mevcut Araçlarınızla Kesintisiz Entegre Olur
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-65 grayscale hover:grayscale-0 transition-all">
            <span className="text-sm font-semibold tracking-tight text-zinc-300">Google Workspace</span>
            <span className="text-sm font-semibold tracking-tight text-zinc-300">Gmail</span>
            <span className="text-sm font-semibold tracking-tight text-zinc-300">Microsoft Outlook</span>
            <span className="text-sm font-semibold tracking-tight text-zinc-300">Google Takvim</span>
            <span className="text-sm font-semibold tracking-tight text-zinc-300">Apple Calendar</span>
            <span className="text-sm font-semibold tracking-tight text-zinc-300">Zoom & Teams</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. HOW IT WORKS (NASIL ÇALIŞIR?) */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/[0.08]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            MİMARİ VE ÇALIŞMA PRENSİBİ
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Dijital Hayatınızı Nasıl Anlar?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            Sürekli bildirim patlamaları yaratmaz. Mailinizi, takviminizi ve açık işlerinizi sessizce analiz eder; tam karar anında en yalın özeti sunar.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1: Mail Intelligence */}
          <div className="relative rounded-3xl bg-white/[0.03] border border-white/[0.08] p-8 hover:border-indigo-500/40 transition-all group">
            <div className="flex items-center justify-between mb-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400 font-bold text-lg border border-indigo-500/20 group-hover:scale-105 transition-transform">
                01
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Mail Filtresi
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Maili Okur ve Ayrıştırır
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              Günde gelen 80+ e-postanın içindeki bültenleri, otomatik sistem bildirimlerini ve promosyonları eler. Teklif, revizyon veya onay bekleyen kritik mailleri tespit eder.
            </p>
            <div className="rounded-xl bg-[#090A0F] p-3.5 border border-white/[0.06] text-xs space-y-1.5 text-zinc-300">
              <div className="flex items-center gap-2 text-rose-400 font-medium">
                <span>⚠️</span> <span>Ahmet Yılmaz: &quot;Revize teklif 17:00&apos;ye kadar şart&quot;</span>
              </div>
              <div className="text-zinc-500 text-[11px] pl-6">
                Aksiyon tespit edildi: PDF revizyonu hazırla
              </div>
            </div>
          </div>

          {/* Step 2: Calendar & Meeting Prep */}
          <div className="relative rounded-3xl bg-white/[0.03] border border-white/[0.08] p-8 hover:border-indigo-500/40 transition-all group">
            <div className="flex items-center justify-between mb-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400 font-bold text-lg border border-indigo-500/20 group-hover:scale-105 transition-transform">
                02
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Takvim Zekâsı
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Takvimi ve Zamanı Hesaplar
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              Etkinlikleri sadece listelemekle kalmaz; yolculuk sürelerini, toplantı hazırlık gereksinimlerini ve çakışmaları anlar. Toplantıdan 20 dk önce konuşulması gereken 3 konuyu hazır eder.
            </p>
            <div className="rounded-xl bg-[#090A0F] p-3.5 border border-white/[0.06] text-xs space-y-1.5 text-zinc-300">
              <div className="flex items-center gap-2 text-amber-400 font-medium">
                <span>🕒</span> <span>14:30 Toplantısı Öncesi: 3 kilit konu hazır</span>
              </div>
              <div className="text-zinc-500 text-[11px] pl-6">
                1. Fiyat onayı · 2. Teslim tarihi · 3. Sözleşme taslağı
              </div>
            </div>
          </div>

          {/* Step 3: Commitment Tracker */}
          <div className="relative rounded-3xl bg-white/[0.03] border border-white/[0.08] p-8 hover:border-indigo-500/40 transition-all group">
            <div className="flex items-center justify-between mb-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400 font-bold text-lg border border-indigo-500/20 group-hover:scale-105 transition-transform">
                03
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Taahhüt Takibi
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Verilen Sözleri Asla Unutmaz
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              Gönderdiğiniz maillerdeki &quot;Cuma gününe kadar döneceğim&quot; gibi taahhütlerinizi ve karşı tarafın henüz yanıtlamadığı kritik soruları izler. Unutulan iş kalmaz.
            </p>
            <div className="rounded-xl bg-[#090A0F] p-3.5 border border-white/[0.06] text-xs space-y-1.5 text-zinc-300">
              <div className="flex items-center gap-2 text-indigo-300 font-medium">
                <span>📌</span> <span>Selin Kaya&apos;dan 2 gündür yanıt bekleniyor</span>
              </div>
              <div className="text-zinc-500 text-[11px] pl-6">
                Konu: Sözleşme 4. maddesi yorumu
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FEATURE SHOWCASE (ÖZELLİK VİTRİNİ) */}
      {/* ========================================================================= */}
      <section id="features" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/[0.08]">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            ÖZELLİK VİTRİNİ
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Yöneticiler ve Profesyoneller İçin Kusursuz Zekâ
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            Gününüzü parçalara bölen dikkat dağınıklığını ortadan kaldıran 4 temel güç.
          </p>
        </div>

        {/* Feature 1: Morning Briefing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/15 text-indigo-300 text-xs font-semibold mb-4 border border-indigo-500/20">
              ☀️ GÜNE 1-0 ÖNDE BAŞLAYIN
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Morning Briefing: Sabah 08:00&apos;de 60 Saniyelik Özet
            </h3>
            <p className="mt-4 text-base text-zinc-400 leading-relaxed">
              Sabah uyanır uyanmaz 15 ayrı bildirim ve onlarca e-posta içinde boğulmayın. Asistan, gece boyunca gelen tüm verileri işler; kahvenizi yudumlarken 60 saniyede okuyabileceğiniz veya 2 dakikada dinleyebileceğiniz net bir brifing sunar.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-zinc-300 font-medium">
              <li className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</span>
                Doğal Türkçe ses senteziyle araba sürerken veya hazırlanırken dinleyin.
              </li>
              <li className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</span>
                Günün en kritik 5 maddesi, takvim çakışmaları ve hava durumu entegrasyonu.
              </li>
              <li className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</span>
                Gereksiz detaylardan arındırılmış, yalnızca eyleme dönüştürülebilir maddeler.
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="rounded-3xl bg-gradient-to-tr from-[#1E1E4C] to-[#121324] p-7 border border-indigo-500/30 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs text-indigo-300">
                <span>08:00 SESLİ BRİFİNG</span>
                <span>🎧 2 dk dinleme</span>
              </div>
              <div className="mt-6">
                <h4 className="text-xl font-bold text-white">“Ben artık sabah Gmail açmıyorum.”</h4>
                <p className="mt-1 text-xs text-zinc-400">Yunus E. · Kurucu, İstanbul</p>
              </div>
              <div className="mt-6 p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-sm text-zinc-200 leading-relaxed font-serif italic">
                &quot;Günaydın Yunus. Öğlene kadar toplantın bulunmuyor. Saat 14:30&apos;da Mehmet ile müşteri toplantın var. Gelen 46 mail arasında 3 konu acil dikkat gerektiriyor.&quot;
              </div>
              <div className="mt-6 flex items-center gap-4 bg-white/10 p-3 rounded-xl backdrop-blur-md">
                <button className="h-10 w-10 rounded-full bg-white text-indigo-900 flex items-center justify-center shadow">
                  <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </button>
                <div className="flex-1">
                  <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white w-2/5 rounded-full" />
                  </div>
                  <div className="flex justify-between text-[10px] text-zinc-300 mt-1">
                    <span>0:48</span>
                    <span>2:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: Mail Intelligence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-white/[0.03] p-7 border border-white/[0.08] shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-semibold text-zinc-400">GELEN KUTUSU ANALİZİ</span>
                <span className="text-xs text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">4 Kritik Konu</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#090A0F] border border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs">AY</span>
                    Ahmet Yılmaz
                  </span>
                  <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">BUGÜN 17:00</span>
                </div>
                <p className="mt-2 text-xs text-zinc-300 font-medium">
                  &quot;Revize fiyat teklifini bugün saat 17:00&apos;ye kadar PDF olarak bekliyoruz.&quot;
                </p>
                <div className="mt-3 flex gap-2">
                  <button className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500">
                    Taslak Yanıt Oluştur
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-white/10 text-zinc-300 text-xs font-semibold hover:bg-white/20">
                    PDF Ekle
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#090A0F] border border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs">SK</span>
                    Selin Kaya
                  </span>
                  <span className="text-[10px] text-zinc-400">Dün</span>
                </div>
                <p className="mt-2 text-xs text-zinc-300">
                  Sözleşme taslağının 4. cezai şart maddesi için yorumunuz bekleniyor.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/15 text-indigo-300 text-xs font-semibold mb-4 border border-indigo-500/20">
              ✉️ GÜRÜLTÜYÜ ELER, GERÇEK İŞİ ÖNE ÇIKARIR
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Mail Intelligence: Önemli 4 Konuyu Önünüze Koyar
            </h3>
            <p className="mt-4 text-base text-zinc-400 leading-relaxed">
              Gelen kutunuzda saatler harcamak yerine işinize odaklanın. Yapay zekâ, tüm e-postaları derinlemesine analiz eder, kimin sizden cevap beklediğini ve aciliyet derecesini anlar.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-zinc-300 font-medium">
              <li className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</span>
                VIP gönderici kuralları ile kritik kişilerden gelen mesajlar anında öne çıkar.
              </li>
              <li className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</span>
                Tek tıkla bağlama uygun, profesyonel Türkçe taslak yanıtlar üretir.
              </li>
              <li className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</span>
                E-posta eklerindeki fatura, sözleşme ve teklif belgelerini otomatik tespit eder.
              </li>
            </ul>
          </div>
        </div>

        {/* Feature 3: Meeting Prep */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/15 text-indigo-300 text-xs font-semibold mb-4 border border-indigo-500/20">
              🤝 TOPLANTIYA HAZIRLIKSIZ GİRMEYİN
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Meeting Prep: 20 Dakika Önce Konuşman Gereken 3 Şey
            </h3>
            <p className="mt-4 text-base text-zinc-400 leading-relaxed">
              Görüşme başlamadan hemen önce katılımcıyla olan son yazışmalarınızı, açık kalan konuları ve toplantı gündemini hatırlatır. Not aramakla vakit kaybetmezsiniz.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-zinc-300 font-medium">
              <li className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</span>
                Geçmiş 6 aydaki tüm e-posta ve notları tarayarak hızlı özet çıkarır.
              </li>
              <li className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</span>
                Kişi hafızası ile &quot;En son ne zaman ve ne konuştuk?&quot; sorusunun cevabı anında elinizde.
              </li>
              <li className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</span>
                Toplantı biter bitmez alınan aksiyon kararlarını otomatik listeler.
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="rounded-3xl bg-[#141522] p-7 border border-white/[0.12] shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
                  <span>✨</span> TOPLANTIYA HAZIRLAN
                </div>
                <span className="text-xs bg-amber-500/15 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  18 dk kaldı
                </span>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center text-base border border-indigo-500/30">
                  MY
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Mehmet Yılmaz</h4>
                  <p className="text-xs text-zinc-400">Müşteri Toplantısı · 14:30 · 60 dk</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-[#0B0C14] p-4 border border-white/[0.08] space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  Konuşman Gereken 3 Şey:
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <span className="h-5 w-5 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0">1</span>
                  <span><strong>Fiyat Revizyonu:</strong> Revize teklif bugün 17:00&apos;ye kadar bekleniyor.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <span className="h-5 w-5 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0">2</span>
                  <span><strong>Teslim Tarihi:</strong> Ekim başı teslimat için onay talep ediliyor.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <span className="h-5 w-5 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0">3</span>
                  <span><strong>Sözleşme Maddesi:</strong> Cezai şart taslağı 2 haftadır açık.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 4: Smart Planning */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-white/[0.03] p-7 border border-white/[0.08] shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                  <span>✨</span> TAKVİM ZEKÂSI
                </span>
                <span className="text-xs text-emerald-400 font-semibold">2.5 Saat Boşluk Tespit Edildi</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#090A0F] border border-white/[0.08]">
                <div className="text-sm font-semibold text-white">
                  Yarın 14:00 – 16:30 arasında 2,5 saat odaklanma boşluğun var.
                </div>
                <p className="mt-1 text-xs text-zinc-400">
                  Teklif hazırlama ve sözleşme revizyon görevini buraya yerleştirebilirim.
                </p>
                <div className="mt-3">
                  <button className="px-4 py-1.5 rounded-lg bg-[#5B5CE2] text-white text-xs font-semibold hover:bg-indigo-500 transition-colors">
                    Otomatik Blokla
                  </button>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-[#090A0F] border border-white/[0.08] flex items-center gap-3">
                <span className="text-xl">🚗</span>
                <div className="text-xs text-zinc-300">
                  <strong>13:30 Doktor randevusu</strong> için saat 12:50&apos;de çıkmanız önerilir (38 dk trafik tahmini).
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/15 text-indigo-300 text-xs font-semibold mb-4 border border-indigo-500/20">
              📅 TAKVİMİNİZİ SADECE GÖSTERMEZ, ANLAR
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Smart Planning: Trafik, Çakışma ve Odaklanma Blokları
            </h3>
            <p className="mt-4 text-base text-zinc-400 leading-relaxed">
              Arka arkaya toplantılar enerjinizi tüketmesin. Asistan, takvim yoğunluğunu ve toplantı aralıklarını analiz ederek nefes alma payları bırakır, yol sürelerini hesaplar ve derin çalışma saatleri yaratır.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-zinc-300 font-medium">
              <li className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</span>
                Canlı trafik verileriyle toplantılara geç kalmayı önler.
              </li>
              <li className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</span>
                Çakışan davetlerde önem derecesine göre alternatif saat önerir.
              </li>
              <li className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</span>
                Yarım kalan görevleri en uygun takvim boşluğuna otomatik yerleştirir.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SECURITY & PRIVACY (GÜVENLİK VE GİZLİLİK) */}
      {/* ========================================================================= */}
      <section id="security" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/[0.08]">
        <div className="rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent p-8 sm:p-14 border border-white/[0.1] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full" />

          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              GÜVENLİK VE GİZLİLİK POLİTİKASI
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Verileriniz Yalnızca Size Aittir. Asla Satılmaz.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed">
              Dijital Asistan bir reklam platformu değil, sizin adınıza çalışan bağımsız bir yöneticidir. Bilgileriniz ticari modeller için kullanılamaz veya üçüncü taraflarla paylaşılamaz.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl bg-[#090A0F]/80 p-6 border border-white/[0.08]">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center text-lg mb-4">
                🔒
              </div>
              <h4 className="text-base font-bold text-white mb-2">Cihaz Tarafı Güvenlik</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Hassas kişisel veriler yerel cihaz hafızasında tutulur. Gereksiz hiçbir veri uzak sunucularda depolanmaz.
              </p>
            </div>

            <div className="rounded-2xl bg-[#090A0F]/80 p-6 border border-white/[0.08]">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center text-lg mb-4">
                🛡️
              </div>
              <h4 className="text-base font-bold text-white mb-2">Uçtan Uca Şifreleme</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Tüm veri transferleri AES-256 ve TLS 1.3 bankacılık düzeyinde şifreleme protokolleriyle güvence altındadır.
              </p>
            </div>

            <div className="rounded-2xl bg-[#090A0F]/80 p-6 border border-white/[0.08]">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center text-lg mb-4">
                🚫
              </div>
              <h4 className="text-base font-bold text-white mb-2">Model Eğitilmez</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                E-postalarınız, görüşmeleriniz veya takviminiz genel yapay zekâ modellerini eğitmek amacıyla asla kullanılmaz.
              </p>
            </div>

            <div className="rounded-2xl bg-[#090A0F]/80 p-6 border border-white/[0.08]">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center text-lg mb-4">
                🗑️
              </div>
              <h4 className="text-base font-bold text-white mb-2">Tek Tıkla Silme</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                KVKK ve GDPR gereğince, dilediğiniz an tüm analiz geçmişinizi ve verilerinizi tek tuşla kalıcı olarak silebilirsiniz.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-400">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                KVKK Tam Uyumlu
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                GDPR Uyumlu
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                SOC-2 Hazır Mimari
              </span>
            </div>
            <div className="text-zinc-500">
              Veri saklama süresi: Standart 90 gün (Kullanıcı tarafından yapılandırılabilir)
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PRICING (FİYATLANDIRMA - MADDE 55) */}
      {/* ========================================================================= */}
      <section id="pricing" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/[0.08]">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            ŞEFFAF VE ADİL FİYATLANDIRMA
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Yatırımınızın Karşılığını İlk Günden Alın
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            7 gün boyunca Dijital Asistan Pro&apos;nun tüm yeteneklerini sınırsız deneyin. Kredi kartı gerekmez.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.1]">
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                billingCycle === "annual"
                  ? "bg-[#5B5CE2] text-white shadow-md shadow-indigo-500/25"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Yıllık Plan (%38 İndirimli)
            </button>
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                billingCycle === "monthly"
                  ? "bg-[#5B5CE2] text-white shadow-md shadow-indigo-500/25"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Aylık Plan
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {/* FREE PLAN */}
          <div className="rounded-3xl bg-white/[0.03] border border-white/[0.08] p-8 sm:p-10 flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Free (Ücretsiz)</h3>
                <span className="text-xs font-semibold text-zinc-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                  Temel Seviye
                </span>
              </div>
              <p className="text-sm text-zinc-400 mb-6">
                Bireysel kullanım ve yapay zekâ asistan deneyimini keşfetmek isteyenler için.
              </p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black text-white tracking-tight">0 TL</span>
                <span className="text-zinc-400 text-sm">/ sonsuza kadar</span>
              </div>

              <div className="space-y-3.5 text-sm text-zinc-300 border-t border-white/[0.08] pt-6 mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>1 Bağlı Mail Hesabı</strong> (Gmail veya Outlook)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>1 Bağlı Takvim Hesabı</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Sabah Brifingi (Temel metin formatında)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Günlük 50 AI analiz limiti</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-500">
                  <span className="text-zinc-600">✕</span>
                  <span>Öğle ve Akşam Brifingleri</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-500">
                  <span className="text-zinc-600">✕</span>
                  <span>Sesli Brifing Dinleme Motoru</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-500">
                  <span className="text-zinc-600">✕</span>
                  <span>Toplantı Hazırlığı & Taahhüt Takibi</span>
                </div>
              </div>
            </div>

            <Link
              href="#download"
              className="w-full py-3.5 px-6 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold text-sm text-center border border-white/[0.1] transition-all"
            >
              Ücretsiz Başla
            </Link>
          </div>

          {/* PRO PLAN */}
          <div className="relative rounded-3xl bg-gradient-to-b from-[#1E1E4C]/90 via-[#181938] to-[#101026] border-2 border-[#5B5CE2] p-8 sm:p-10 flex flex-col justify-between shadow-2xl shadow-indigo-500/20">
            {/* Top Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#5B5CE2] to-[#7B7CF4] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-lg">
              EN ÇOK TERCİH EDİLEN · 7 GÜN ÜCRETSİZ
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 mt-2">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  Dijital Asistan PRO
                  <span className="text-sm">✨</span>
                </h3>
                <span className="text-xs font-bold text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                  {billingCycle === "annual" ? "%38 TASARRUF" : "AYLIK"}
                </span>
              </div>
              <p className="text-sm text-indigo-200/80 mb-6">
                Yöneticiler, kurucular ve yoğun profesyoneller için tam teşekküllü yapay zekâ asistanı.
              </p>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-black text-white tracking-tight">
                  {billingCycle === "annual" ? "1.490 TL" : "199 TL"}
                </span>
                <span className="text-indigo-200 text-sm">
                  {billingCycle === "annual" ? "/ yıl" : "/ ay"}
                </span>
              </div>
              <p className="text-xs text-indigo-300/80 font-medium mb-8">
                {billingCycle === "annual"
                  ? "Aylık sadece 124 TL&apos;ye denk gelir. 7 gün boyunca ücretsiz deneyin."
                  : "Dilediğiniz an iptal edilebilir. 7 gün ücretsiz deneyin."}
              </p>

              <div className="space-y-3.5 text-sm text-white border-t border-white/[0.12] pt-6 mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-indigo-400 font-bold">✓</span>
                  <span><strong>Sınırsız Bağlı Mail Hesabı</strong> (İş ve kişisel tek yerde)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-indigo-400 font-bold">✓</span>
                  <span><strong>Sınırsız Bağlı Takvim Hesabı</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-indigo-400 font-bold">✓</span>
                  <span><strong>Sabah, Öğle Nabzı ve Akşam Kapanış</strong> Brifingleri</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-indigo-400 font-bold">✓</span>
                  <span><strong>Sesli Brifing Dinleme</strong> (Doğal Türkçe ses motoru · 2 dk)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-indigo-400 font-bold">✓</span>
                  <span><strong>Toplantı Hazırlığı:</strong> 20 dk önce konuşulacak 3 kilit konu</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-indigo-400 font-bold">✓</span>
                  <span><strong>Akıllı Takip & Taahhütler:</strong> Senden beklenenler & verilen sözler</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-indigo-400 font-bold">✓</span>
                  <span><strong>AI Belleği & VIP Kişiler:</strong> Seni öğrenen özel hafıza</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-indigo-400 font-bold">✓</span>
                  <span><strong>Sınırsız Derin Analiz</strong> & Otomatik Taslak Yanıtlar</span>
                </div>
              </div>
            </div>

            <div>
              <Link
                href="#download"
                className="w-full block py-4 px-6 rounded-2xl bg-gradient-to-r from-[#5B5CE2] to-[#4547C9] hover:from-[#6D6EF8] hover:to-[#5254D8] text-white font-bold text-sm text-center shadow-xl shadow-indigo-500/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                7 Gün Ücretsiz Dene
              </Link>
              <p className="mt-3 text-center text-[11px] text-zinc-400">
                7 gün sonra {billingCycle === "annual" ? "1.490 TL/yıl" : "199 TL/ay"}. Süre bitmeden 24 saat önce hatırlatırız. Dilediğiniz an tek tıkla iptal.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table (Madde 55) */}
        <div className="mt-20 max-w-4xl mx-auto rounded-3xl bg-white/[0.02] border border-white/[0.08] p-6 sm:p-8">
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            Free vs. Pro Karşılaştırma Tablosu
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead>
                <tr className="border-b border-white/[0.08] text-xs font-bold uppercase text-zinc-400">
                  <th className="py-3 px-4">Özellik</th>
                  <th className="py-3 px-4 text-center">Free Plan</th>
                  <th className="py-3 px-4 text-center text-indigo-400">Pro Plan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                <tr>
                  <td className="py-3 px-4 font-medium">Bağlı Mail Hesabı</td>
                  <td className="py-3 px-4 text-center text-zinc-400">1</td>
                  <td className="py-3 px-4 text-center text-white font-semibold">Sınırsız</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Bağlı Takvim Hesabı</td>
                  <td className="py-3 px-4 text-center text-zinc-400">1</td>
                  <td className="py-3 px-4 text-center text-white font-semibold">Sınırsız</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Sabah Brifingi</td>
                  <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓ (Metin)</td>
                  <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓ (Metin + Ses)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Öğle Nabzı ve Akşam Kapanış</td>
                  <td className="py-3 px-4 text-center text-zinc-600">—</td>
                  <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Toplantı Hazırlığı (20 dk önce)</td>
                  <td className="py-3 px-4 text-center text-zinc-600">—</td>
                  <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Akıllı Takip ve Taahhütler</td>
                  <td className="py-3 px-4 text-center text-zinc-600">—</td>
                  <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Sesli Dinleme Motoru</td>
                  <td className="py-3 px-4 text-center text-zinc-600">—</td>
                  <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">AI Hafızası & VIP Kişiler</td>
                  <td className="py-3 px-4 text-center text-zinc-600">—</td>
                  <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Gelişmiş Planlama & Trafik Analizi</td>
                  <td className="py-3 px-4 text-center text-zinc-600">—</td>
                  <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Günlük AI Analiz Limiti</td>
                  <td className="py-3 px-4 text-center text-zinc-400">50 / gün</td>
                  <td className="py-3 px-4 text-center text-white font-semibold">Sınırsız</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FAQ (SIKÇA SORULAN SORULAR) */}
      {/* ========================================================================= */}
      <section id="faq" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full border-t border-white/[0.08]">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            MERAK EDİLENLER
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Sıkça Sorulan Sorular
          </h2>
          <p className="mt-4 text-base text-zinc-400">
            Dijital Asistan hakkında aklınıza takılabilecek tüm soruların yanıtları.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Dijital Asistan e-postalarımı ve verilerimi nasıl analiz ediyor?",
              a: "Dijital Asistan, e-posta kutunuza resmi ve güvenli OAuth protokolü (Gmail ve Microsoft Graph) ile bağlanır. Asla şifrenizi saklamaz. Yalnızca gelen kutusu özetlerini ve takvim başlıklarını analiz eder; verileriniz model eğitimi için kullanılmaz.",
            },
            {
              q: "7 günlük ücretsiz deneme için kredi kartı gerekiyor mu?",
              a: "Kesinlikle hayır. 7 günlük Pro denemesini kredi kartı bilgisi girmeden başlatabilirsiniz. Süre dolduğunda siz onay vermedikçe herhangi bir ücret tahsil edilmez; hesabınız otomatik olarak Free plana döner.",
            },
            {
              q: "Sabah brifingini sesli olarak nasıl dinleyebilirim?",
              a: "Pro planda her sabah saat 08:00'de hazırlanan brifinginiz yüksek kaliteli doğal Türkçe ses motoruyla seslendirilir. İşe giderken, spor yaparken veya kahvaltınızı yaparken tek tuşla 2 dakikalık brifinginizi dinleyebilirsiniz.",
            },
            {
              q: "Hangi e-posta ve takvim sağlayıcıları destekleniyor?",
              a: "Google Workspace, kişisel Gmail, Microsoft 365, Outlook.com, Exchange, Apple Takvim ve Zoom gibi popüler iş ve kişisel hesapların tümü sorunsuz desteklenmektedir.",
            },
            {
              q: "İstediğim zaman üyeliğimi iptal edebilir veya verilerimi silebilir miyim?",
              a: "Evet. Ayarlar menüsünden tek tıkla üyeliğinizi dilediğiniz an iptal edebilir ve 'Tüm Geçmişimi Sil' butonuyla analiz edilmiş tüm geçmişinizi kalıcı olarak silebilirsiniz.",
            },
            {
              q: "Verilerim reklamverenlerle veya üçüncü partilerle paylaşılır mı?",
              a: "Asla. Dijital Asistan gelirini yalnızca kullanıcılardan aldığı şeffaf abonelik ücretleriyle sağlar. Verileriniz hiçbir reklamverene, veri komisyoncusuna veya üçüncü şahsa satılmaz ve sunulmaz.",
            },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02]"
              >
                <span className="text-base font-bold text-white">{faq.q}</span>
                <span className={`text-indigo-400 text-xl font-bold transition-transform ${openFaq === idx ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-sm text-zinc-400 leading-relaxed border-t border-white/[0.04] pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FINAL CTA */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#1E1E4C] via-[#3B3CA8] to-[#6A6BEB] p-10 sm:p-16 text-center text-white shadow-2xl overflow-hidden">
          {/* Background Decorative Circles */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-900/40 rounded-full blur-2xl pointer-events-none" />

          <div className="relative max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Dijital Hayatını Kontrol Altına Al.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-indigo-100 leading-relaxed font-normal">
              Gereksiz e-posta trafiğinde boğulmayı bırakın. Günün en kritik konularını sabah 08:00&apos;de hazır bulun.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {/* App Store */}
              <a
                href="#download"
                className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white text-zinc-950 font-bold text-sm shadow-xl hover:bg-slate-100 transition-all hover:scale-105 active:scale-95"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 1.01-2.87-.96.04-2.13.64-2.79 1.41-.58.68-1.1 1.74-1.02 2.79 1.07.08 2.18-.58 2.8-1.33z" />
                </svg>
                <span>App Store&apos;dan İndirin</span>
              </a>

              {/* Google Play */}
              <a
                href="#download"
                className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#0F0F1A] text-white border border-white/20 font-bold text-sm shadow-xl hover:bg-[#1A1A2E] transition-all hover:scale-105 active:scale-95"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.34 0 .66.11.92.31l13.5 8.5c.67.42.88 1.3.46 1.97-.12.19-.28.35-.46.46l-13.5 8.5c-.26.2-.58.31-.92.31-.83 0-1.5-.67-1.5-1.55zM17.5 12L6 4.8v14.4l11.5-7.2z" />
                </svg>
                <span>Google Play&apos;den Edinin</span>
              </a>
            </div>

            <p className="mt-6 text-xs text-indigo-200/75">
              Kredi kartı gerekmez · 7 Gün sınırsız deneme · 2 dakikada kurulum
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

