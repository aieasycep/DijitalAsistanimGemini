import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dijital Asistan — Bugün bilmen gerekenleri, sen sormadan söyler.",
  description:
    "Yapay zekâ destekli kişisel yönetici asistanınız. 83 mail içinden kritik 4 konuyu, yaklaşan toplantı özetlerini ve açık taahhütlerinizi siz sormadan hazırlar.",
  keywords: [
    "dijital asistan",
    "yapay zeka asistanı",
    "sabah brifingi",
    "mail zekası",
    "toplantı hazırlığı",
    "akıllı planlama",
    "kişisel verimlilik",
  ],
  authors: [{ name: "Dijital Asistan Ekibi" }],
  openGraph: {
    title: "Dijital Asistan — Bugün bilmen gerekenleri, sen sormadan söyler.",
    description:
      "Gününüzü kolaylaştıran yapay zekâ asistanı. Mail, takvim ve açık işlerinizi analiz eder, bilmeniz gerekenleri siz sormadan özetler.",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dijital Asistan — Bugün bilmen gerekenleri, sen sormadan söyler.",
    description:
      "Mail, takvim ve açık işlerinizi analiz eder, bilmeniz gerekenleri siz sormadan özetler.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#090A0F] text-slate-100 antialiased selection:bg-[#5B5CE2]/30 selection:text-indigo-200">
        {/* Header & Navbar */}
        <header className="sticky top-0 z-50 w-full border-b border-white/[0.07] bg-[#090A0F]/85 backdrop-blur-xl">
          <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#4547C9] via-[#5B5CE2] to-[#8687F7] shadow-lg shadow-indigo-500/25 ring-1 ring-white/20 transition-all group-hover:shadow-indigo-500/40">
                <svg
                  className="h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  Dijital Asistan
                  <span className="rounded-full bg-indigo-500/15 px-2 py-0.5 text-[10px] font-semibold text-indigo-400 border border-indigo-500/30">
                    2.0
                  </span>
                </span>
                <span className="text-[11px] text-zinc-400 font-medium hidden sm:inline-block">
                  Yapay Zekâ Yönetici Asistanı
                </span>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
              >
                Nasıl Çalışır?
              </Link>
              <Link
                href="#features"
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
              >
                Özellikler
              </Link>
              <Link
                href="#security"
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
              >
                Güvenlik & Gizlilik
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
              >
                Fiyatlandırma
              </Link>
              <Link
                href="#faq"
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
              >
                SSS
              </Link>
            </nav>

            {/* CTA & Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="#pricing"
                className="hidden sm:inline-flex items-center justify-center text-xs font-semibold text-zinc-300 hover:text-white px-3 py-2 transition-colors"
              >
                Planları İncele
              </Link>
              <Link
                href="#download"
                className="relative group inline-flex items-center justify-center gap-2 rounded-xl bg-[#5B5CE2] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 hover:bg-[#4d4ee0] hover:shadow-indigo-500/35 active:scale-[0.98] transition-all"
              >
                <span>Hemen Başla</span>
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-white/[0.08] bg-[#07070B] text-zinc-400">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
              {/* Brand Column */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#4547C9] to-[#5B5CE2] text-white">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z" />
                    </svg>
                  </div>
                  <span className="text-lg font-bold text-white tracking-tight">
                    Dijital Asistan
                  </span>
                </div>
                <p className="max-w-sm text-sm text-zinc-400 leading-relaxed">
                  Bugün bilmen gerekenleri, sen sormadan söyler. Mail, takvim ve taahhütlerinizi tek bir akıllı brifingde birleştirir.
                </p>
                <div className="flex items-center gap-2 text-xs text-zinc-500 mt-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Cihaz tarafı korumalı, sıfır veri satışı garantisi</span>
                </div>
              </div>

              {/* Column 2: Ürün */}
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                  Ürün
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="#features"
                      className="hover:text-white transition-colors"
                    >
                      Sabah Brifingi
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#features"
                      className="hover:text-white transition-colors"
                    >
                      Mail Zekâsı
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#features"
                      className="hover:text-white transition-colors"
                    >
                      Toplantı Hazırlığı
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#features"
                      className="hover:text-white transition-colors"
                    >
                      Akıllı Planlama
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#pricing"
                      className="hover:text-white transition-colors"
                    >
                      Fiyatlandırma
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3: Güvenlik & Gizlilik */}
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                  Güvenlik & Gizlilik
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="#security"
                      className="hover:text-white transition-colors"
                    >
                      Cihaz Tarafı Güvenlik
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#security"
                      className="hover:text-white transition-colors"
                    >
                      Uçtan Uca Şifreleme
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#security"
                      className="hover:text-white transition-colors"
                    >
                      Veri Saklama & Silme
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#security"
                      className="hover:text-white transition-colors"
                    >
                      KVKK & GDPR Uyumu
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#security"
                      className="hover:text-white transition-colors"
                    >
                      Model Eğitilmeme Taahhüdü
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 4: Platformlar */}
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                  Platformlar
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="#download"
                      className="hover:text-white transition-colors"
                    >
                      iOS için App Store
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#download"
                      className="hover:text-white transition-colors"
                    >
                      Android için Google Play
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#how-it-works"
                      className="hover:text-white transition-colors"
                    >
                      Google Workspace Entegrasyonu
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#how-it-works"
                      className="hover:text-white transition-colors"
                    >
                      Microsoft 365 Entegrasyonu
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-white/[0.08] pt-8 text-xs text-zinc-500 gap-4">
              <p>
                © 2026 Dijital Asistan Inc. Tüm hakları saklıdır.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="#security"
                  className="hover:text-zinc-300 transition-colors"
                >
                  Gizlilik Politikası
                </Link>
                <Link
                  href="#security"
                  className="hover:text-zinc-300 transition-colors"
                >
                  Kullanım Koşulları
                </Link>
                <Link
                  href="#security"
                  className="hover:text-zinc-300 transition-colors"
                >
                  Güvenlik Beyanı
                </Link>
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  <span>Tüm sistemler aktif</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

