# Dijital Asistan — Tam Üretim Planı

## Context

"Dijital Asistan" adlı premium consumer AI mobil asistan uygulamasının **eksiksiz high-fidelity web uygulaması** olarak üretilmesi. Ürün, iOS & Android çift platform için tasarlanmış; proaktif AI briefing, mail intelligence, akıllı takvim, meeting prep, commitment tracker, voice assistant ve daha fazlasını kapsar. Kullanıcı tasarım referansı olarak kullanmak istiyor; bu nedenle MVP veya fazlara bölünmeyecek — tüm 75 bölüm eksiksiz üretilecek.

Mevcut proje: React 19 + Vite 8 + Tailwind CSS v4 — tamamen boş canvas.

---

## Mimari Karar

Web'de mobil uygulama simülasyonu:
- **Çerçeve**: 393px genişliğinde iPhone frame, sayfada ortada yüzecek
- **Router**: React Router v6 — her ekran ayrı route
- **State**: React Context + useState (backend yok; tüm veri mock)
- **Stil**: Tailwind CSS v4 + CSS variables ile design token sistemi
- **Font**: Inter (Google Fonts) — SF Pro hissi için en yakın web alternatifi
- **Sayfa yapısı**: `src/screens/` altında her büyük ekran gruplandırılır

---

## Design System Tokens (`src/index.css`)

```
Primary:     #5B5CE2  (indigo)
Primary Dark: #4647C7
Surface:     #FFFFFF
Surface2:    #F8F8FC
Surface3:    #F1F1F8
Border:      #E8E8F0
Text Primary: #0F0F1A
Text Secondary: #6B6B80
Text Tertiary: #A0A0B2
Success:     #34C759  → soft #E8F8EE
Warning:     #FF9F0A  → soft #FFF4E0
Critical:    #FF3B30  → soft #FFEEED
Info:        #007AFF  → soft #E5F2FF
```

Typography scale (CSS variables):
- Display: 34px/Bold
- H1: 28px/Bold
- H2: 22px/Semibold
- H3: 17px/Semibold
- Body: 16px/Regular
- BodyMedium: 15px/Medium
- Caption: 13px/Regular
- MicroLabel: 11px/Medium/Uppercase+tracking

Spacing: 4px base grid (4/8/12/16/20/24/32/40/48px)
Radius: sm=8 md=12 lg=16 xl=20 full=9999
Shadows: xs / sm / md — very soft, warm-tinted

---

## Navigation Yapısı

**Bottom Navigation (4 tab):**
1. **Bugün** (`/`) — ana ekran, briefing hero, priorities
2. **Akış** (`/akis`) — attention feed, mail intelligence
3. **Plan** (`/plan`) — takvim + görevler + taahhütler
4. **Asistan** (`/asistan`) — conversational AI + voice

**Profil/Settings** → sağ üst avatar → `/profil`

**Modal/Sheet Routes (overlay üzerine açılır):**
- `/sabah-brifing` — Morning Briefing fullscreen
- `/gun-ortasi` — Midday Pulse
- `/aksam-kapanis` — Evening Close
- `/haftalik-rapor` — Weekly Review
- `/toplanti-hazirlik/:id` — Meeting Prep
- `/toplanti-sonrasi/:id` — Post-Meeting
- `/mail/:id` — Email Detail
- `/mail/:id/yanit` — AI Draft Reply
- `/asistan/ses` — Voice Assistant fullscreen
- `/onay-merkezi` — Approval Center
- `/arama` — Global Search
- `/kisi/:id` — Person Intelligence
- `/evrensel-ekle` — Universal Capture

**Onboarding Routes** (`/onboarding/*`):
- `/onboarding/hosgeldin` — Screen 1
- `/onboarding/gurultu` — Screen 2
- `/onboarding/hazirlariz` — Screen 3
- `/onboarding/kontrol` — Screen 4
- `/onboarding/hesap` — Account Creation
- `/onboarding/bagla` — Connect Your World
- `/onboarding/izin/:source` — Permission Explainer
- `/onboarding/tercihler` — Briefing Preferences
- `/onboarding/kisisellestime` — Personalization
- `/onboarding/vip` — VIP People
- `/onboarding/analiz` — First Analysis (animated)
- `/onboarding/hazir` — First Aha Moment
- `/onboarding/bildirim` — Notification Permission

---

## Ekran Envanteri (75 Bölüm → Ekranlar)

### 00 Cover / Splash
- `SplashScreen` — Logo + tagline animasyonu

### 01 Onboarding (Screens 36–47)
- `OnboardingWelcome` — "Dijital hayatın artık tek yerde."
- `OnboardingNoise` — 127 mail → 3 önemli konu visual
- `OnboardingProactive` — Morning briefing visual
- `OnboardingControl` — Read-only/approval security illustration
- `AccountCreation` — Google/Apple/Microsoft/Email sign-in
- `ConnectYourWorld` — Gmail/Outlook/Calendar bağlantı kartları
- `PermissionExplainer` — OAuth öncesi açıklama (Gmail varyantı)
- `CalendarPermission` — Apple Calendar native permission screen
- `BriefingPreferences` — Saat tercihleri + weekend toggle
- `Personalization` — Multi-select category chips
- `VIPOnboarding` — Contact selection
- `FirstAnalysis` — Animated processing screen
- `FirstAhaMoment` — Dramatic reveal + 5 sample cards
- `NotificationPermission` — "Sadece önemli olduğunda haber verelim."

### 02 Bugün Ekranı (Sections 8–14)
- `TodayScreen` — Ana ekran
  - Header: "Günaydın, Yunus / 5 Eylül Cumartesi"
  - AI Briefing Hero Card ("Bugün bilmen gereken 5 şey var." + "Dinle" butonu + mini stats)
  - Top Priorities listesi:
    - CRITICAL card (Ahmet teklif)
    - UPCOMING card (Mehmet toplantı)
    - DEADLINE card (Başvuru kapanıyor)
  - Life Intelligence cards (kargo, uçuş, ödeme)
  - "Neden Önemli?" bottom sheet
- `MorningBriefing` — Fullscreen (Section 12)
  - Audio player (play/pause/15sec/speed)
  - Narrative summary
  - 6 section: Öncelikler / Program / Cevap Bekleyenler / Senden Beklenenler / Son Tarihler / Kişisel Hatırlatmalar
- `MiddayPulse` — Kompakt (Section 13)
- `EveningClose` — Günü Kapat (Section 14)
  - Tamamlananlar / Yarına Kalanlar / Yarın Sabah / Takip

### 03 Akış Ekranı (Sections 16–21)
- `FlowScreen` — Attention feed
  - Filter chips: Tümü / Önemli / Mail / Takvim / Takip / Kişisel
  - Card types: email / meeting / deadline / shipment / reservation / bill / security / subscription
- `MailIntelligence` — (Section 17)
  - Smart categories: Önemli / Cevap Bekleyen / Cevap Beklenen / Son Tarih / Bilgilendirme / Düşük Öncelik
  - "83 mail, 6 dikkat gerektiriyor" header
- `EmailDetail` — (Section 18)
  - AI özet + key points + suggested actions
- `AIDraftReply` — (Section 19)
  - Tone controls + editable composer + Gmail'de Aç / Onayla
- `SmartFollowUp` — (Section 20)
  - Mehmet Yılmaz card + 3 gün önce + action buttons
- `WaitingForReply` — "Senden Beklenenler" (Section 21)
  - Acil / Bugün / Yakında priority grouping

### 04 Plan Ekranı (Sections 23–26)
- `PlanScreen` — (Section 23)
  - Segment: Gün / Hafta
  - Timeline view: events + AI task blocks
  - "2,5 saat boşluğun var" AI suggestion banner
- `CalendarConflict` — (Section 24)
  - Smart conflict alert + AI suggestion card
- `MeetingPrep` — (Section 25)
  - 8 section briefing
  - "18 dakika kaldı" countdown
  - "3 konuşman gereken şey"
  - "2 Dakikalık Özet" + "Not Al" CTA
- `PostMeeting` — (Section 26)
  - "Takip edilecek bir konu var mı?" + commitment capture

### 05 Commitments & Follow-ups (Sections 22, 20)
- `CommitmentTracker` — (Section 22)
  - AI-detected commitments list
  - Taahhüt / Kime / Kaynak / Tarih / Durum

### 06 Life Intelligence (Section 27)
- Life cards integrated in TodayScreen + FlowScreen
  - Kargo, Uçuş, Rezervasyon, Ödeme, Abonelik, Güvenlik — her biri ayrı card variant

### 07 Asistan Ekranı (Sections 28–29)
- `AssistantScreen` — (Section 28)
  - Context-aware suggested questions
  - Chat input + voice button
  - Rich response cards (mail / calendar / person)
- `VoiceAssistant` — (Section 29)
  - Fullscreen premium voice interface
  - Minimal waveform animation
  - Visual confirmation after write actions

### 08 Universal Capture (Section 30)
- `UniversalCapture` — Photo/screenshot/PDF/link/text intake
  - AI extraction: event / task / deadline / contact / note
  - "Takvime ekleyeyim mi?" confirmation

### 09 Smart Reminders (Section 31)
- `SmartReminder` — Bottom sheet
  - 30dk / 1sa / Bu akşam / Yarın sabah / Kendin seç / Uygun zamanda

### 10 People (Sections 32–33)
- `VIPPeopleList` — (Section 32) — settings alt ekranı
- `PersonIntelligence` — (Section 33)
  - Son iletişim / yaklaşan toplantı / open loops / geçmiş konular

### 11 Search & Memory (Section 34)
- `SearchScreen` — Global intelligent search
  - Source-aware results
  - AI summary per result

### 12 Approval Center (Section 35)
- `ApprovalCenter`
  - Pending AI actions: mail gönder / takvim oluştur / taşı / görev / hatırlatıcı
  - Approval card: ne yapılacak / neden / ne değişecek / Onayla / Düzenle / Reddet

### 13 Paywall & Referral (Sections 50–51)
- `Paywall` — Premium güven veren
  - 9 benefit listesi
  - Aylık 199 TL / Yıllık 1.490 TL
  - "7 Gün Ücretsiz" hero CTA
- `Referral` — "Arkadaşını Davet Et"

### 14 Profile & Settings (Sections 52–56)
- `ProfileScreen` — Ana settings list (12 section)
- `Integrations` — (Section 52) — connected accounts + multi-account
- `SecurityPrivacy` — (Section 53) — güven merkezi
- `DataSourceControl` — (Section 54) — per-source toggles
- `AIPersonalization` — (Section 56) — learned preferences edit

### 15 Haftalık Rapor (Section 15)
- `WeeklyReport`
  - Story-like metrics cards
  - En yoğun gün / En çok iletişim / Gelecek haftaya kalanlar
  - Share card "Dijital Haftam"

### 16 States (Sections 57–59)
- `EmptyStates` — showcase page (5+ varyant)
- `ErrorStates` — (6 varyant)
- `LoadingSkeletons` — premium skeleton components

### 17 Android Specific (Section 47)
- `AndroidNotificationSettings` — Notification Intelligence screen

### 18 Widgets (Section 49)
- `WidgetShowcase` — Small / Medium / Large widget mockupları

### 19 App Store Marketing (Section 68)
- `AppStoreScreenshots` — 6 screenshot frame

### 20 Social Ads (Section 69)
- `SocialAdMockups` — 3 adet 9:16 ad

### 21 Landing Page (Section 70)
- `LandingHero` — Responsive hero section

---

## Component Sistemi (`src/components/`)

### Temel UI
```
ui/Button.tsx        — Primary / Secondary / Tertiary / Danger / Icon (5 size)
ui/Input.tsx         — Text / Search / Chat variants
ui/Badge.tsx         — Priority labels: CRITICAL / UPCOMING / DEADLINE / INFO
ui/Chip.tsx          — Filter chips (selected/unselected)
ui/Avatar.tsx        — Person avatar (initials fallback)
ui/Switch.tsx        — Toggle
ui/Tag.tsx           — Source tags (Gmail / Outlook / Calendar)
ui/Skeleton.tsx      — Animated skeleton blocks
ui/Toast.tsx         — Snackbar / toast notifications
```

### Kart Sistemi
```
cards/InsightCard.tsx       — AI insight (CRITICAL / STANDARD / INFO varyantları)
cards/EmailCard.tsx         — Mail item (feed + detail)
cards/MeetingCard.tsx       — Takvim etkinliği
cards/LifeCard.tsx          — Kargo / Uçuş / Ödeme / Abonelik / Güvenlik
cards/PersonCard.tsx        — Kişi intelligence card
cards/CommitmentCard.tsx    — Taahhüt item
cards/FollowUpCard.tsx      — Takip item
cards/ApprovalCard.tsx      — AI action approval
cards/WeeklyMetricCard.tsx  — Haftalık rapor metric
```

### Layout
```
layout/MobileFrame.tsx      — 393px iPhone chrome, safe area simulation
layout/BottomNav.tsx        — 4-tab navigation
layout/BottomSheet.tsx      — Drag-handle sheet overlay
layout/PageHeader.tsx       — Screen header (back button / title / avatar)
layout/SegmentedControl.tsx — Gün / Hafta vs.
```

### Özel
```
special/AudioPlayer.tsx     — Morning briefing audio controls
special/WaveformVoice.tsx   — Voice assistant waveform
special/AITyping.tsx        — AI processing animation
special/ProcessingSteps.tsx — First analysis steps
special/ConflictAlert.tsx   — Takvim çakışması banner
special/SourceTag.tsx       — Gmail · Ahmet Yılmaz · 08:42
```

---

## Dosya Yapısı

```
src/
  index.css              — design tokens + Inter font import
  App.tsx                — Router + MobileFrame wrapper
  main.tsx               — entry
  
  routes/
    onboarding/          — 14 onboarding screen
    today/               — TodayScreen + briefings
    flow/                — FlowScreen + mail screens
    plan/                — PlanScreen + meeting screens
    assistant/           — AssistantScreen + voice
    shared/              — ApprovalCenter, Search, Person, Capture
    settings/            — Profile, Integrations, Security, ...
    marketing/           — Paywall, Referral, Widgets, AppStore, Landing
    states/              — EmptyStates, ErrorStates, LoadingSkeletons
  
  components/
    ui/                  — temel UI bileşenleri
    cards/               — kart sistemi
    layout/              — çerçeve ve navigasyon
    special/             — özel animasyon/interaction bileşenleri
  
  data/
    mock.ts              — tüm Türkçe gerçekçi mock veriler
    navigation.ts        — route tanımları
  
  hooks/
    useBottomSheet.ts
    useAudioPlayer.ts
```

---

## Mock Veri Stratejisi (`src/data/mock.ts`)

Gerçekçi Türkçe veriler:
- Kişiler: Ahmet Yılmaz, Mehmet Kaya, Ayşe Demir, Fatma Şahin, Can Öztürk
- Şirket: [kullanıcı adı: Yunus]
- Tarihler: 5 Eylül Cumartesi baz alınacak
- Mail konuları: "Revize fiyat teklifi", "Proje toplantısı", "Fatura bildirimi"
- Kargo: Trendyol siparişi
- Uçuş: TK2412 İstanbul→Antalya
- Ödeme: Elektrik faturası 1.842 TL

---

## Görsel Dil Kararları

1. **Arka plan**: #F8F8FC (çok hafif cool-gray)
2. **Kartlar**: beyaz, 12px radius, box-shadow: 0 1px 8px rgba(15,15,26,0.06)
3. **CRITICAL badge**: coral soft bg (#FFEEED) + coral text
4. **UPCOMING badge**: amber soft bg (#FFF4E0) + amber text
5. **DEADLINE badge**: indigo soft bg (#EEEEFF) + primary text
6. **Bottom nav**: beyaz, top border, aktif tab primary indigo
7. **Hero card (Today)**: indigo gradient + glassmorphism hint
8. **Typography**: Inter, --font-display: 34px bold, scale aşağıya doğru
9. **Source tag**: küçük pill, gray bg, semibold tiny text

---

## Uygulama Sırası

1. **Foundation** (index.css tokens + Inter + MobileFrame + BottomNav + Router)
2. **Design System Components** (Button, Badge, Chip, Card templates, SourceTag)
3. **Today Screen** — hero card + priorities (ürünün kalbi)
4. **Morning Briefing** — fullscreen + audio player
5. **Flow Screen** — feed + filter chips + mail detail + draft reply
6. **Plan Screen** — timeline + meeting prep + conflict alert
7. **Assistant Screen** — chat + voice
8. **Onboarding** — 14 ekran
9. **Settings/Profile group** — integrations + security + personalization
10. **Supporting screens** — approval center, search, person, capture, reminders
11. **States** — empty / error / loading
12. **Marketing screens** — paywall, referral, widgets, app store, landing, social ads
13. **Midday Pulse + Evening Close + Weekly Report**

---

## Verification

- Dev server zaten çalışıyor; kaydetince hot reload ile görüntülenecek
- Her ekran grubu tamamlandıkça önizleme panelinde kontrol et
- Tüm bottom nav tabları arası geçiş çalışmalı
- Onboarding flow'u (hosgeldin → analiz → hazir → home) test edilmeli
- CRITICAL/UPCOMING/DEADLINE badge renkleri kontrast açısından kontrol edilmeli
- Inter font yüklendiğinde display ve body text render doğrulanmalı
