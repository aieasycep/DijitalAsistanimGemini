Mevcut “Dijital Asistan” projesini SIFIRDAN YENİDEN YAPMA.

Mevcut tasarımı, ekranları, component sistemini, görsel dili ve çalışan bölümleri koru.

Bu görev bir redesign değildir.

Bu görev:

AUDIT + REPAIR + COMPLETION + PROTOTYPE CONNECTION

görevidir.

Daha önce sana verilen kapsamlı Dijital Asistan ürün spesifikasyonunu uygulamaya çalıştın. Projede çok sayıda ekran oluştu ancak yapılan bağımsız incelemede bazı gereksinimlerin eksik kaldığı, bazı ekranların hiçbir akıştan erişilemediği, bazı butonların işlevsiz olduğu ve onboarding akışında gerçek bir hata bulunduğu tespit edildi.

Şimdi mevcut projeyi baştan sona denetle, aşağıdaki hataların TAMAMINI düzelt ve proje içinde başka benzer eksiklikler varsa onları da kendin tespit ederek gider.

Çalışan hiçbir ekranı veya özelliği kaldırma.

MVP’ye bölme.

Özellik azaltma.

“Future feature” olarak erteleme.

Bütün ürün tek ve tamamlanmış bir sistem olarak kalmalıdır.

---

# 1. KRİTİK ONBOARDING HATASINI DÜZELT

Mevcut onboarding sırası şu mantıkta tamamlanmalıdır:

Welcome

→ Noise / Gürültüyü Azalt

→ Proactive

→ Control

→ Account Creation

→ Connect Accounts

→ Gmail / Outlook Permission Explanation

→ Calendar Permission Explanation

→ Briefing Preferences

→ Personalization

→ VIP People

→ First Analysis

→ Aha Moment / İlk Brifing Hazır

→ Notification Permission Explanation

→ Today / Home

Şu anda “Aha Moment” ekranından sonra doğrudan Today ekranına gidiliyor ve Notification Permission ekranı atlanıyor.

BU HATAYI DÜZELT.

Aha Moment → Notification Permission → Today

olmalıdır.

---

# 2. CALENDAR PERMISSION EKRANI EKSİK

Ayrı bir Calendar Permission ekranı oluştur.

Özellikle Apple Calendar / cihaz takvimi senaryosu için tasarla.

Başlık:

“Takvimine neden erişmemiz gerekiyor?”

Açıklamalar:

✓ Gününü anlayabilmek

✓ Toplantı çakışmalarını fark etmek

✓ Yaklaşan etkinlikleri brifinge eklemek

✓ Uygun zaman önerileri sunmak

Güven mesajı:

“Takviminde değişiklik yapmadan önce senden onay isteriz.”

CTA:

“Takvim Erişimine İzin Ver”

Secondary:

“Şimdi Değil”

Ayrıca permission denied state oluştur:

“Takvim erişimi kapalı”

“Dilersen Ayarlar’dan daha sonra açabilirsin.”

CTA:

“Ayarları Aç”

Bu ekran onboarding akışına gerçek olarak bağlansın.

---

# 3. ORPHAN / ERİŞİLEMEYEN EKRANLARI BAĞLA

Projede aşağıdaki ekranlar hazırlanmış ancak normal kullanıcı deneyiminden erişilemiyor veya yeterince bağlanmamış durumda:

Approval Center

Person Intelligence

Universal Capture

Smart Follow-Up

Waiting Reply

Bunların hepsine mantıklı gerçek giriş noktaları oluştur.

Approval Center:

Today header veya Profile üzerinden “Onay Bekleyenler” olarak erişilebilmeli.

Ayrıca AI write action sonrası otomatik açılabilmeli.

Person Intelligence:

Email sender avatar/name tap

Meeting person tap

VIP People tap

Search result person tap

üzerinden açılabilmeli.

Universal Capture:

Assistant ekranında attachment / plus butonu

ve mümkünse Today üzerinde küçük global capture action

üzerinden erişilebilmeli.

Smart Follow-Up:

Mail Intelligence içindeki “Takip Etmen Gerekenler” alanından açılmalı.

Waiting Reply:

Mail Intelligence içindeki “Senden Beklenenler” / “Cevap Bekleyenler” alanından açılmalı.

Hiçbir ana ürün ekranı navigation açısından orphan kalmasın.

---

# 4. PROFILE / SETTINGS EKSİKLERİNİ TAMAMLA

Şu anda Profile ekranında aşağıdaki seçenekler var ancak çalışmıyor:

Brifing Ayarları

Bildirimler

Öncelik Kuralları

Görünüm

Dil

Yardım

Geri Bildirim

Bunların her biri için gerçek ekran veya gerekli bottom sheet tasarla ve navigasyonu bağla.

## Briefing Settings

Morning Briefing

Midday Pulse

Evening Close

saatleri.

Hafta sonu toggle.

Timezone.

Sessiz günler.

## Notification Settings

Morning Brief

Midday

Evening

Critical Emails

Meetings

Deadlines

Follow-Ups

Life Intelligence

Her biri ayrı toggle.

Ayrıca:

“Yalnızca gerçekten önemliyse bildir.”

seçeneği.

## Priority Rules

VIP People

Domains

Senders

Keywords

Low-priority categories

“Bu kişiden gelenleri her zaman önemli say.”

“Promosyonları düşük öncelikli say.”

gibi kurallar.

## Appearance

System

Light

Dark

seçimi.

## Language

Türkçe

English

ve ileride dil eklenmesine uygun yapı.

## Help

FAQ

Getting Started

Integrations

Privacy

Contact Support

## Feedback

Bug Report

Feature Request

General Feedback

Rating / optional comment.

---

# 5. DARK MODE’U GERÇEKTEN TASARLA

Mevcut projede gerçek uygulama Dark Mode tasarımı bulunmuyor.

Sadece marketing yüzeylerinin koyu olması Dark Mode sayılmaz.

En az şu representative ekranların tam Dark Mode versiyonlarını oluştur:

Today

Morning Briefing

Flow

Plan

Meeting Prep

Assistant

Profile

Dark Mode için ayrı ve tutarlı design tokens kullan.

Dark background’ı sadece siyaha çevirmekle yetinme.

Surface hierarchy:

Background

Surface 1

Surface 2

Border

Primary text

Secondary text

Muted text

Indigo accents

Critical

Warning

Success

renklerini dark environment için yeniden dengeli tasarla.

Accessibility kontrastlarını koru.

Appearance ekranında:

System
Light
Dark

seçimleri bu tasarımları temsil etsin.

---

# 6. ANDROID REPRESENTATIVE DESIGN

Mevcut preview yalnızca sabit 393 px iPhone frame kullanıyor.

Android için ayrıca yaklaşık 412 px genişliğinde representative frame oluştur.

Özellikle şu ekranları hem iOS hem Android representative şekilde göster:

Today

Morning Briefing

Flow

Plan

Meeting Prep

Assistant

Profile

Platform farklarında:

Safe areas

Status bar

Navigation area

Back behaviour

System permissions

gibi native farkları dikkate al.

Core visual identity aynı kalmalıdır.

Android uygulaması iOS uygulamasının kötü bir kopyası gibi görünmemelidir.

---

# 7. RESPONSIVE LANDING PAGE’İ DÜZELT

Mevcut Landing Page telefon frame’i içine sıkıştırılmış.

Bu yanlış.

Landing Page ayrı responsive web tasarımı olmalıdır.

Mobile application MobileFrame component’inin içinde render edilmemelidir.

Responsive breakpoints düşün:

Mobile

Tablet

Desktop

Desktop hero yaklaşık 1200–1440 px canvas mantığında tasarlanmalı.

Hero:

Headline:

“Bugün bilmen gerekenleri, sen sormadan söyler.”

Subheadline:

“Dijital Asistan mailini, takvimini ve açık işlerini anlayıp her gün sana kısa bir brifing hazırlar.”

CTA:

“Ücretsiz Başla”

Secondary:

“Nasıl Çalışır?”

Sağ tarafta veya merkezde premium telefon mockup.

Integration logos:

Gmail
Outlook
Google Calendar
Apple Calendar

Privacy reassurance.

Aşağı doğru:

How it works

Morning Briefing

Mail Intelligence

Meeting Prep

Smart Planning

AI Memory

Security

Pricing

Final CTA

sections oluştur.

Landing Page responsive çalışsın.

---

# 8. MAIL DETAIL AKSİYONLARINI TAMAMLA

Email Detail ekranında aşağıdaki aksiyonların prototip bağlantıları eksik:

Görev Oluştur

Hatırlat

Bunları tamamla.

Görev Oluştur:

AI tarafından çıkarılmış:

Görev başlığı

Due date

Related person

Source

göster.

CTA:

“Görevi Oluştur”

write action olduğu için gerektiğinde Approval Center’a yönlendir.

Hatırlat:

Smart Reminder bottom sheet aç.

Options:

30 dakika önce

1 saat önce

Bu akşam

Yarın sabah

Uygun zamanda

Kendin seç

“Kendin seç” tıklandığında gerçek date/time picker açılmalı.

---

# 9. SMART REMINDER EXPERIENCE’I TAMAMLA

Smart Reminder şu anda bazı ekranlarda kısmen bulunuyor ancak tamamlanmamış.

Reusable component olarak oluştur.

Aşağıdaki bütün içeriklerden çağrılabilsin:

Email

Deadline

Meeting

Commitment

Life Intelligence item

Assistant action

Options:

30 dakika önce

1 saat önce

Bu akşam

Yarın sabah

Uygun zamanda

Kendin seç

“Uygun zamanda” seçildiğinde kısa explanation:

“Takvimindeki boşluklara göre uygun zamanı Dijital Asistan seçer.”

User final confirmation görsün.

---

# 10. APPROVAL CENTER’I GERÇEK ÜRÜN AKIŞINA BAĞLA

Approval Center sadece ayrı tasarlanmış bir ekran olarak kalmasın.

Write action’lardan sonra gerçekten kullanılmalıdır.

Mail gönder

Takvim etkinliği oluştur

Takvim etkinliği taşı

Görev oluştur

Hatırlatıcı oluştur

gibi aksiyonlardan sonra:

Approval Center veya approval sheet aç.

Her approval:

Ne yapılacak?

Neden?

Hangi kaynak nedeniyle?

Tam olarak ne değişecek?

göstermeli.

Actions:

Onayla

Düzenle

Reddet

Onay sonrası success state göster.

---

# 11. AI PERSONALIZATION’I TAMAMLA

Şu anda learned preference silinebiliyor fakat gerçek düzenleme experience’ı eksik.

Kullanıcı:

Edit

Delete

Disable

yapabilsin.

Örnek preference:

“Mehmet Yılmaz yüksek öncelikli.”

Edit:

Priority:

High / Normal / Low

Ayrıca “Etkileşimlerimden öğren” toggle gerçekten interactive state’e sahip olsun.

---

# 12. PRIVACY CENTER’DAKİ ÖLÜ AKSİYONLARI TAMAMLA

Şu anda aşağıdaki satırlar hiçbir yere gitmiyor:

İzinler

Veri Saklama

Geçmişi Sil

Verilerimi İndir

Hesabımı Sil

Bunların tasarımlarını oluştur ve bağla.

## Permissions

Her integration’ın permission durumu.

## Data Retention

30 gün
90 gün
1 yıl
Ben silene kadar

gibi örnek options.

## Delete History

Confirmation modal.

## Export My Data

Export request confirmation + preparing state + ready state.

## Delete Account

Multi-step confirmation.

Danger zone.

Yanlışlıkla silmeye karşı açık confirmation.

---

# 13. GÜVENLİK METNİNİ DÜZELT

Mevcut Privacy/Security ekranında:

“End-to-end şifreleme kullanılır.”

ifadesi bulunuyor.

Backend mimarisi kesinleşmeden bu teknik iddiayı YAPMA.

Bunu daha güvenli ve doğru bir ifadeyle değiştir:

“Veriler aktarım sırasında ve saklanırken şifrelenir.”

veya:

“Verilerin güvenli bağlantılar üzerinden işlenir ve saklanırken şifrelenir.”

“End-to-end encryption” ifadesini ancak gerçek teknik mimari bunu doğruluyorsa kullan.

---

# 14. LIFE INTELLIGENCE CARD AKSİYONLARI

Life Intelligence kartları sadece görsel olmamalı.

Kargo:

“Takibi Gör”

Uçuş:

“Detayı Gör”
“Takvime Ekle”

Reservation:

“Detayı Gör”
“Hatırlat”

Payment:

“Hatırlat”

Subscription:

“Yenileme Detayı”

Security Alert:

“Kaynağı Aç”

gibi gerçek prototype actions ekle.

---

# 15. MEETING PREP ETKİLEŞİMLERİNİ TAMAMLA

Meeting Prep signature feature’dır.

“Not Al” aksiyonu çalışmalı.

Notes bottom sheet / page aç.

Voice veya text note eklenebilsin.

Meeting sonrası:

Post Meeting Capture

akışına geçilebilsin.

Meeting participant adına tıklanınca:

Person Intelligence

açılsın.

İlgili mail tıklanınca:

Email Detail

açılsın.

---

# 16. FOLLOW-UP VE WAITING REPLY AKIŞLARINI BAĞLA

Mail Intelligence ekranında:

Takip Etmen Gerekenler

Senden Beklenenler

Senin Cevap Beklediklerin

alanlarını gerçekten ayrı smart views olarak bağla.

Smart Follow-Up ekranında:

Takip Mesajı Hazırla

→ AI Draft Reply

Yarın Hatırlat

→ Smart Reminder

Takibi Kapat

→ success state

çalışsın.

Waiting Reply ekranında:

İlgili maili aç

Yanıt Hazırla

Hatırlat

gibi uygun actions prototip olarak çalışsın.

---

# 17. UNIVERSAL CAPTURE’I BAĞLA

Universal Capture ekranı tasarlanmış fakat ana kullanıcı deneyiminden kolay erişilemiyor.

Assistant input yanında:

*

button oluştur.

Tıklanınca:

Fotoğraf

Screenshot

PDF / Dosya

Link

Text

seçenekleri.

Today ekranında da zarif bir quick capture access düşünülebilir.

Universal Capture sonucu:

Detected Type

Extracted Information

Suggested Action

göstermeli.

Örnek:

Screenshot →

“Etkinlik tespit edildi.”

12 Eylül
20:00
Zorlu PSM

CTA:

Takvime Ekle

Write action olduğu için confirmation / approval flow’u koru.

---

# 18. GLOBAL SEARCH / MEMORY BAĞLANTILARI

Search result içindeki:

kişi

mail

event

flight

payment

gibi item’lar ilgili gerçek detail ekranına açılmalı.

Person result:

Person Intelligence

Email result:

Email Detail

Meeting result:

Meeting Prep / event detail

gibi.

AI Memory yalnızca sonuç listesi görünümü olmamalı.

---

# 19. SOCIAL ADS FORMATINI DÜZELT

3 adet social ad istemiştik.

Üçünün de representative formatı:

9:16

olmalıdır.

Mevcut 1:1 reklamı ayrıca bonus olarak tutabilirsin ancak 3 ana reklamın hepsinin 9:16 versiyonunu oluştur.

Required:

AD 1

284 unread
6 calendar events
14 tasks

↓

“Bugün gerçekten bilmen gereken 4 şey var.”

AD 2

“Bir maili cevaplamayı unuttuğun oldu mu?”

Smart Follow-Up.

AD 3

“Ben artık sabah Gmail açmıyorum.”

Morning Briefing.

---

# 20. APP STORE MARKETING EKRANLARINI MASTER SPEC İLE KARŞILAŞTIR

6 ekran bulunmalı.

1.

“Bugün bilmen gerekenleri, sen sormadan söyler.”

Today / Morning Briefing.

2.

“83 mail. Gerçekten önemli olan 4.”

Mail Intelligence.

3.

“Toplantıya hazırlıksız girme.”

Meeting Prep.

4.

“Kim senden cevap bekliyor?”

Follow-Up / Waiting Reply.

5.

“Takvimini sadece göstermez. Anlar.”

Smart Planning.

6.

“Dijital hayatına sor.”

Assistant.

Mevcut marketing ekranları bunlardan farklıysa eksik olanları düzelt.

---

# 21. PROTOTYPE CONNECTION AUDIT

TÜM PROJEDE kullanıcı tarafından tıklanabilir görünen butonları denetle.

Ana ürün ekranlarında hiçbir:

dead button

dead setting row

dead CTA

dead card

orphan screen

bırakma.

Marketing mockup içindeki dekoratif CTA’lar hariç, gerçek app prototype içindeki kullanıcı aksiyonları mantıklı sonuç vermeli.

Özellikle kontrol et:

Today

Flow

Mail Intelligence

Email Detail

AI Draft

Plan

Meeting Prep

Commitments

Assistant

Search

Universal Capture

Approval Center

Profile

Settings

Privacy

Paywall

Referral

---

# 22. CRITICAL USER FLOWS GERÇEKTEN ÇALIŞSIN

Aşağıdaki akışlar yalnızca diyagram olarak gösterilmemeli.

Prototype içinde gerçekten yapılabilmeli.

FLOW 1:

Install

→ Sign In

→ Connect Gmail

→ Connect Calendar

→ Permissions

→ Analysis

→ First Brief

→ Notification Permission

→ Home

FLOW 2:

Important Email

→ AI Summary

→ Draft Reply

→ Approval

→ Success

FLOW 3:

Calendar Event

→ Meeting Prep

→ Related Email

→ Note

→ Post Meeting

→ Commitment

FLOW 4:

Detected Deadline

→ Smart Reminder

→ Approval

→ Created

FLOW 5:

Assistant Query

→ AI Answer

→ Suggested Action

→ Approval

→ Complete

FLOW 6:

Free Feature Limit

→ Paywall

→ Trial

→ Pro Success

---

# 23. DESIGN SYSTEM TEMİZLİĞİ

Mevcut component sistemini koru ama duplicate veya yarım kalmış component tanımları varsa temizle.

Özellikle SourceTag gibi duplicate component kullanımını tek canonical component’e indir.

Design tokens:

Colors

Typography

Spacing

Radius

Shadow

State colors

Light mode

Dark mode

olarak sistematik olsun.

---

# 24. RESPONSIVE / PLATFORM TOKENS

Tek sabit 393 px tasarıma bağımlı kalma.

Representative:

iOS 393

Android 412

kullan.

Auto Layout / responsive layout mantığını koru.

Text expansion ve localization düşün.

---

# 25. ACCESSIBILITY PASS

Tüm ana ekranları tekrar kontrol et:

Minimum touch target

Text contrast

Critical status sadece renkle anlatılmamalı

Icon + label

Dynamic text tolerance

Button contrast

Disabled state

Focus/pressed states

---

# 26. FINAL SELF-AUDIT

Tamamladığını söylemeden önce proje üzerinde KENDİN sistematik bir audit yap.

Bir requirement matrix oluştur.

Her gereksinimi şu üç durumdan biriyle işaretle:

DONE

FIXED NOW

NOT APPLICABLE + reason

“Done” demeden önce dosyada gerçekten bulunduğunu ve ilgili kullanıcı akışından erişilebildiğini doğrula.

Sadece ekranın kodda bulunmasını “done” kabul etme.

Ekran gerekli navigation’dan erişilemiyorsa TAMAMLANMAMIŞ kabul et.

Bir buton görünüp hiçbir şey yapmıyorsa TAMAMLANMAMIŞ kabul et.

Bir setting satırı tıklanamıyorsa TAMAMLANMAMIŞ kabul et.

Bir user flow yalnızca diyagram olarak gösterilip gerçek prototype bağlantısı yoksa TAMAMLANMAMIŞ kabul et.

---

# SON KURAL

Mevcut başarılı tasarım dilini bozma.

Today, Morning Briefing ve Meeting Prep ekranlarında mevcut kaliteli yönleri koru ve gerekiyorsa rafine et.

Projeyi sıfırdan yeniden üretme.

Mevcut dosyaların üzerine kontrollü şekilde düzeltme yap.

Hiçbir mevcut önemli özelliği kaldırma.

İşi tamamladıktan sonra:

1. düzelttiğin hataları,
2. eklediğin eksik ekranları,
3. bağladığın orphan ekranları,
4. tamamladığın prototype flow’ları,
5. hâlâ varsa teknik olarak çözülemeyen noktaları

ayrı ayrı raporla.

Ve en son bir kez daha bütün ürünü baştan sona test ederek eksiksiz olduğundan emin ol.
