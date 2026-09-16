Mevcut Dijital Asistan tasarımını YENİDEN TASARLAMA.

Görsel dili değiştirme.

Today, Morning Briefing, Meeting Prep, Flow, Plan ve Assistant başta olmak üzere mevcut başarılı ekranları koru.

Bu son görev sadece:

FINAL PRODUCT QA + DEAD ACTION CLEANUP + PLATFORM COMPLETION

görevidir.

Önceki iki turda ekranların büyük bölümü tamamlandı. Ancak yapılan ikinci bağımsız kod ve navigation audit'inde hâlâ kullanıcıya tıklanabilir görünen fakat hiçbir şey yapmayan elementler, gerçek akışa bağlanmamış Approval Center, eksik Dark Mode ve Android tasarımları bulundu.

Bu sefer yeni özellik icat etme.

Aşağıdaki hataları eksiksiz kapat.

---

## 1. EN ÖNEMLİ KURAL

Gerçek uygulama prototype'ında kullanıcıya tıklanabilir görünen HİÇBİR buton işlevsiz kalmayacak.

Bir UI elementi button görünümündeyse:

* bir ekran açmalı,
* bottom sheet açmalı,
* state değiştirmeli,
* confirmation göstermeli,
* gerçek bir prototype aksiyonu gerçekleştirmeli

veya eğer gerçekten interaction gerekmiyorsa button görünümünden çıkarılmalıdır.

Marketing mockup'larındaki dekoratif elementler hariç.

Projeyi tamamladığını söylemeden önce tüm `<button>`, clickable card, CTA, toggle ve setting row'ları tek tek denetle.

---

# 2. APPROVAL CENTER'I GERÇEK AKIŞA BAĞLA

Approval Center şu anda ekran olarak mevcut fakat navigation açısından orphan.

Bunu düzelt.

Today header veya Profile içinde:

“Onay Bekleyenler”

erişim noktası oluştur.

Bekleyen işlem varsa küçük badge göster:

3

Ayrıca aşağıdaki write action'lar approval flow kullanmalıdır:

Mail gönderme

Görev oluşturma

Takvim etkinliği oluşturma

Takvim etkinliği taşıma

Hatırlatıcı oluşturma

AI tarafından önerilen planlama

Universal Capture action

Akış:

Suggested Action

→ Approval Sheet veya Approval Center

→ kullanıcı tam olarak ne yapılacağını görür

→ Onayla / Düzenle / Reddet

→ Success

Approval Center içindeki:

“Düzenle”

butonunu da gerçekten çalıştır.

Edit sheet aç ve ilgili action'ın alanlarını değiştirilebilir yap.

---

# 3. TODAY DEAD ACTION CLEANUP

Today ekranındaki Life Intelligence kartlarının bütün action'larını bağla.

Kargo:

“Takibi Gör”

→ detay bottom sheet/page.

Uçuş:

“Detayı Gör”

→ flight detail.

Reservation:

“Detayı Gör”

→ reservation detail.

Payment:

“Hatırlat”

→ SmartReminderSheet.

Subscription:

“Yenileme Detayı”

→ detail.

Security:

“Kaynağı Aç”

→ source detail.

Today ekranında mevcut eski custom reminder bottom sheet'i kaldır.

Bütün uygulamada TEK canonical:

SmartReminderSheet

kullan.

“Kendin seç”

date/time picker açmalı.

“Uygun zamanda”

AI açıklaması göstermeli.

Final action confirmation göstermeli.

---

# 4. EMAIL DETAIL

“Orijinal Maili Aç”

çalışmalı.

Prototype'ta external-mail opening state veya uygun confirmation göster.

“Görev Oluştur”

doğrudan görev oluşturmasın.

Task details

→ Approval

→ Created

akışı kullan.

“Hatırlat”

SmartReminderSheet

→ Approval/confirmation

→ Created.

---

# 5. AI DRAFT

“Gmail'de Aç”

çalışmalı.

Prototype external app handoff state göster.

“Göndermeyi Onayla”

mevcut confirmation mekanizmasını koruyabilir.

---

# 6. PLAN

AI önerisi içindeki:

“Planla”

butonunu çalıştır.

Tıklandığında:

Proposed time block

14:00–16:30

Task:

“Teklif hazırla”

göster.

Actions:

Onayla

Saati Değiştir

İptal

Onay sonrası timeline'a AI task block eklenmiş state göster.

---

# 7. COMMITMENT TRACKER

“Tamamlandı” çalışıyor, koru.

“Ertele”

→ date/time reschedule sheet.

“Kaynağı Gör”

→ ilgili email/source detail.

Her iki butonu da çalıştır.

---

# 8. MEETING PREP

“Toplantıyı Başlat”

external Google Meet / Teams handoff state açmalı.

Meeting participant isimleri:

→ Person Intelligence.

Related email:

→ Email Detail.

Not alma:

çalışan mevcut deneyimi koru.

Meeting sonrası:

Post Meeting

akışını koru.

---

# 9. UNIVERSAL CAPTURE'I GERÇEKTEN TAMAMLA

Şu an:

Fotoğraf

PDF

Link

butonları görünüyor fakat hiçbir şey yapmıyor.

Düzelt.

Fotoğraf:

camera / photo picker prototype.

Screenshot:

photo picker.

PDF:

file picker prototype.

Link:

URL entry sheet.

Text:

mevcut text input.

Dosya seçildikten sonra:

Analyze

→ detected content

→ suggested actions.

Örnek event:

12 Eylül

20:00

Zorlu PSM

Actions:

Takvime Ekle

Görev Oluştur

Hatırlatıcı Kur

Bu action'ların üçü de doğrudan Today'e dönmemeli.

Her biri gerçek ilgili flow:

Action detail

→ Approval

→ Success

→ Today

kullanmalı.

---

# 10. AI PERSONALIZATION

Metinde “düzenleyebilirsin” yazıyorsa gerçekten düzenlenebilmeli.

Her learned preference için:

Edit

Disable

Delete

destekle.

Örnek:

“Mehmet Yılmaz yüksek öncelikli.”

Edit:

Priority

High

Normal

Low

Save.

“Etkileşimlerimden öğren”

toggle'ını gerçek state ile çalıştır.

---

# 11. PRIVACY / DATA RETENTION

Veri Saklama seçenekleri gerçek selection state kullanmalı.

Options:

30 gün

90 gün

1 yıl

Ben silene kadar

Bir tanesi gerçekten selected state'te olmalı.

Başka seçeneğe basıldığında selected state değişmeli.

“Sistem Ayarlarına Git”

button gerçek prototype handoff state göstermeli; yalnızca sheet'i kapatmamalı.

---

# 12. VIP PEOPLE

VIP People listesindeki kişi satırı veya avatar/name:

→ Person Intelligence

açmalı.

VIP Ekle/Kaldır mevcut functionality korunsun.

---

# 13. SEARCH

Search sonucu olan hiçbir anlamlı item sebepsiz yere dead olmamalı.

Flight result:

→ Flight detail.

Payment result:

→ Payment detail.

Subscription:

→ Subscription detail.

Person:

→ Person Intelligence.

Mail:

→ Email Detail.

Meeting:

→ Meeting Prep/Event Detail.

Eğer ayrı detail ekran oluşturmak gereksizse reusable Life Detail bottom sheet kullan.

---

# 14. DARK MODE'U BU KEZ GERÇEKTEN YAP

Appearance ekranında yalnızca preview yeterli değildir.

Gerçek representative Dark Mode ekranları oluştur:

Today

Morning Briefing

Flow

Plan

Meeting Prep

Assistant

Profile

Bunları ayrı preview gallery olarak veya çalışan global theme state olarak uygula.

Mümkünse Appearance'da Dark seçildiğinde uygulamanın ana ekranları gerçekten dark theme'e geçsin.

Dark tokens:

Background

Surface 1

Surface 2

Border

Primary text

Secondary text

Muted

Primary Indigo

Critical

Warning

Success

olarak tanımlansın.

Sadece arka planı siyaha çevirme.

---

# 15. ANDROID REPRESENTATIVE UI

Mevcut tek frame:

393 px iPhone + Dynamic Island.

Bu yeterli değildir.

Ayrıca:

412 px Android representative frame

oluştur.

En az:

Today

Morning Briefing

Flow

Plan

Meeting Prep

Assistant

Profile

için Android preview göster.

Android frame'de:

Dynamic Island kullanma.

Android status/navigation bar kullan.

Back behaviour düşün.

Core design aynı kalsın.

---

# 16. LANDING PAGE RESPONSIVE DESKTOP

Landing artık MobileFrame dışında olsa bile hâlâ mobile-column tasarım gibi davranıyor.

Bunu gerçek responsive marketing page yap.

Desktop breakpoint:

1200–1440 px content area.

Desktop nav:

Logo

Özellikler

Güvenlik

Fiyatlandırma

Giriş

Ücretsiz Başla

Hero desktop:

Sol:

Headline

Subheadline

CTA

Trust text

Sağ:

premium phone mockup.

Sonraki desktop sections:

Integrations

How It Works

Morning Briefing

Mail Intelligence

Meeting Prep

Smart Planning

AI Memory

Security

Pricing

Final CTA

Tablet ve mobile responsive versiyonları da düşün.

---

# 17. SOCIAL ADS

Metadata'da “9:16” yazmak yeterli değildir.

Gerçek visual container aspect ratio:

9 / 16

olmalıdır.

Üç ana reklamı gerçek 1080×1920 proportional layout mantığında oluştur.

AD 1:

284 unread mail

6 calendar event

14 tasks

↓

“Bugün gerçekten bilmen gereken 4 şey var.”

AD 2:

“Bir maili cevaplamayı unuttuğun oldu mu?”

Smart Follow-Up.

AD 3:

“Ben artık sabah Gmail açmıyorum.”

Morning Briefing.

---

# 18. FUTURE / YAKINDA METİNLERİNİ KALDIR

Ürünü V2/future olarak göstermiyoruz.

Appearance ekranındaki:

“Ek ikon seçenekleri yakında eklenecek.”

metnini kaldır.

Bunun gibi:

yakında

coming soon

future

sonraki sürümde

ifadelerini bütün projede ara ve kaldır veya mevcut ürün deneyimine dönüştür.

---

# 19. GEREKSİZ ACCENT COLOR CUSTOMIZATION

Dijital Asistan'ın marka rengi indigo olmalıdır.

Appearance ekranındaki kullanıcıya:

Mavi
Yeşil
Sarı
Kırmızı

gibi brand accent değiştirme sistemi gerekli değildir.

Bunu kaldır.

Appearance:

System

Light

Dark

odaklı olsun.

Marka kimliğini koru.

---

# 20. GLOBAL DEAD BUTTON AUDIT

Kod/prototype genelinde sistematik tarama yap.

Özellikle kontrol et:

Today

Morning Briefing

Midday

Evening

Weekly Review

Flow

Mail Intelligence

Email Detail

AI Draft

Smart Follow-Up

Waiting Reply

Plan

Conflict

Meeting Prep

Post Meeting

Commitments

Assistant

Voice

Search

Universal Capture

Person Intelligence

VIP

Approval Center

Profile

Settings

Integrations

Privacy

Paywall

Referral.

Her visible button için:

ACTION = ?

TARGET = ?

SUCCESS STATE = ?

belirle.

Action veya target yoksa bunu düzelt.

---

# 21. FINAL ACCEPTANCE TEST

Tamamladığını söylemeden önce aşağıdaki flow'ları prototype üzerinde baştan sona test et:

FLOW A

Onboarding

→ Gmail

→ Calendar

→ Permissions

→ Analysis

→ Aha

→ Notification

→ Today.

FLOW B

Today Important Email

→ Email Detail

→ Draft Reply

→ Approval

→ Success.

FLOW C

Email

→ Create Task

→ Approval

→ Success.

FLOW D

Email

→ Reminder

→ Smart Reminder

→ Approval

→ Success.

FLOW E

Plan AI Suggestion

→ Planla

→ Approval

→ Timeline updated.

FLOW F

Meeting Prep

→ Person

→ Email

→ Note

→ Post Meeting

→ Commitment.

FLOW G

Universal Capture

→ Photo/PDF/Link/Text

→ Analyze

→ Action

→ Approval

→ Success.

FLOW H

Search

→ Person/Mail/Flight/Payment

→ Correct detail.

FLOW I

Profile

→ Appearance

→ Dark Mode

→ real application dark preview.

FLOW J

Approval Center

→ Edit

→ Approve

→ Success.

---

# 22. SON ÇIKTI RAPORU

İşi tamamladıktan sonra bana yalnızca “tamamlandı” deme.

Bir QA tablosu üret:

Element / Flow

Status

How to reach it

What it does

PASS / FAIL

Özellikle bütün clickable elementleri kontrol ettiğini belirt.

FAIL kalan hiçbir kritik application action olmadan işi bitir.

Mevcut ürünün görsel dilini değiştirme.

Yeni redesign yapma.

Yeni büyük özellik icat etme.

Bu tur yalnızca ürünün gerçekten TAM ve TIKLANABİLİR hale gelmesini sağlamalıdır.
