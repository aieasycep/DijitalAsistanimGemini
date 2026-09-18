export type FeedItemType = 'email' | 'meeting' | 'deadline' | 'followup';
export type PriorityLevel = 'critical' | 'upcoming' | 'deadline' | 'info';

export interface EmailData {
  id: string;
  sender: string;
  senderEmail: string;
  senderInitials: string;
  subject: string;
  time: string;
  date: string;
  priority: PriorityLevel;
  badge: string;
  aiSummary: string;
  keyPoints: string[];
  originalContent: string;
  attachments?: { name: string; size: string }[];
  suggestedAction: string;
}

export interface MeetingData {
  id: string;
  title: string;
  person: string;
  time: string;
  date: string;
  duration: string;
  platform: string;
  minutesLeft: number;
  priority: PriorityLevel;
  badge: string;
  summary: string;
  agenda: string[];
  suggestedAction: string;
}

export interface DeadlineData {
  id: string;
  title: string;
  dueTime: string;
  dueDate: string;
  priority: PriorityLevel;
  badge: string;
  summary: string;
  source: string;
  suggestedAction: string;
}

export interface FollowupData {
  id: string;
  person: string;
  subject: string;
  lastContact: string;
  priority: PriorityLevel;
  badge: string;
  summary: string;
  suggestedAction: string;
}

export interface FeedCardItem {
  id: string;
  type: FeedItemType;
  title: string;
  subtitle: string;
  summary: string;
  source: string;
  time: string;
  priority: PriorityLevel;
  badgeText: string;
  actionText: string;
  emailRefId?: string;
  meetingData?: MeetingData;
  deadlineData?: DeadlineData;
  followupData?: FollowupData;
}

export const MOCK_EMAILS: Record<string, EmailData> = {
  'email-1': {
    id: 'email-1',
    sender: 'Ahmet Yılmaz',
    senderEmail: 'ahmet.yilmaz@teknoas.com',
    senderInitials: 'AY',
    subject: 'Revize Fiyat Teklifi ve Sözleşme Şartları (Acil)',
    time: '08:42',
    date: 'Bugün, 16 Eylül 2026',
    priority: 'critical',
    badge: 'Senden Cevap Bekliyor',
    aiSummary: 'Ahmet Yılmaz, revize fiyat teklifinin ve yeni birim maliyet tablosunun bugün saat 17:00\'ye kadar iletilmesini talep ediyor. Yönetim kurulu onayından geçmesi için PDF formatında olması kritik.',
    keyPoints: [
      'Birim maliyet tablosunda %10 iskonto revizyonu talep ediliyor.',
      'Yönetim Kurulu toplantısı için bugün 17:00 son teslim saati.',
      'Islak/e-imzalı resmi teklif mektubunun PDF formatında gönderilmesi gerekiyor.'
    ],
    originalContent: `Merhaba Yunus Bey,\n\nDünkü görüşmemizde ele aldığımız yazılım lisanslama ve entegrasyon teklifini yönetim kurulumuzla değerlendirdik.\n\nGenel kapsam konusunda mutabıkız ancak ek geliştirme saatleri ve bakım bedellerinde revizyon ihtiyacımız bulunuyor. İlettiğimiz yeni birim maliyet çarpanlarına göre revize edilmiş teklif dosyasını bugün saat 17:00'ye kadar gönderebilirseniz, akşamki bütçe komitesine sunabileceğiz.\n\nLütfen son teklif metnini onaylı PDF olarak ekleyiniz.\n\nİyi çalışmalar,\nAhmet Yılmaz\nSatış & Tedarik Direktörü | TeknoAS A.Ş.`,
    attachments: [
      { name: 'Teklif_Kapsam_Revizyon_Notlari.pdf', size: '1.4 MB' },
      { name: 'Birim_Maliyet_Talep_Formu.xlsx', size: '320 KB' }
    ],
    suggestedAction: 'Yanıtla',
  },
  'email-2': {
    id: 'email-2',
    sender: 'Mehmet Kaya',
    senderEmail: 'mehmet.kaya@alphagrup.com.tr',
    senderInitials: 'MK',
    subject: 'Q4 Stratejik Ortaklık Görüşmesi ve Değerlendirmeler',
    time: '10:20',
    date: 'Bugün, 16 Eylül 2026',
    priority: 'critical',
    badge: 'Önemli',
    aiSummary: 'Mehmet Kaya, Q4 ortaklık modeline yönelik hazırladığınız taslağı incelediğini ve öğleden sonraki toplantı öncesinde SLA maddelerinde netleşmek istediğini belirtiyor.',
    keyPoints: [
      'Ortaklık taslağı olumlu karşılandı, SLA maddelerinde detay isteniyor.',
      '14:30\'daki toplantı öncesi ek bilgi talep ediliyor.',
      'Hukuk ekibinin hazırladığı ek sözleşme taslağı incelenmeli.'
    ],
    originalContent: `Yunus Merhaba,\n\nQ4 stratejik büyüme hedeflerimiz doğrultusunda gönderdiğin taslak protokolü ekibimle gözden geçirdik. Teknik altyapı ve API paylaşım modelleri oldukça net.\n\nSaat 14:30'daki toplantımızda özellikle 7/24 destek SLA garantilerini ve veri saklama protokollerini detaylandırmayı planlıyoruz. Toplantıdan önce ekteki hukuk notlarına göz atabilirsen çok verimli geçer.\n\nGörüşmek üzere,\nMehmet`,
    attachments: [
      { name: 'SLA_Ek_Protokol_Taslak.pdf', size: '2.1 MB' }
    ],
    suggestedAction: 'Görüntüle',
  },
  'email-3': {
    id: 'email-3',
    sender: 'Fatma Şahin',
    senderEmail: 'fatma.sahin@finanskor.com',
    senderInitials: 'FŞ',
    subject: 'Q3 Finansal Rapor ve Bütçe Gerçekleşmesi',
    time: 'Dün',
    date: 'Dün, 15 Eylül 2026',
    priority: 'upcoming',
    badge: 'Senden Cevap Bekliyor',
    aiSummary: 'Fatma Şahin, Q3 bütçe gerçekleşme tablosunu paylaştı ve departman harcamalarındaki sapmalar için Cuma gününe kadar onay/görüş bildirilmesini rica ediyor.',
    keyPoints: [
      'Q3 bütçe gerçekleşme oranı %92 seviyesinde.',
      'Pazarlama ve Ar-Ge kalemlerindeki sapmaların gerekçelendirilmesi bekleniyor.',
      'Cuma mesai bitimine kadar sistem üzerinden onay verilmeli.'
    ],
    originalContent: `Değerli Ekip,\n\nQ3 dönemi finansal gerçekleşme ve maliyet dağılım raporunu ekte bulabilirsiniz. Çeyrek bazında bütçe hedeflerimizin genelinde tutarlıyız.\n\nDepartman yöneticilerinin kendi alt kalemlerindeki durumları kontrol edip onay bildirmeleri gerekmektedir.\n\nSaygılarımla,\nFatma Şahin | Mali İşler`,
    attachments: [
      { name: 'Q3_Konsolide_Butce_Raporu.xlsx', size: '4.2 MB' }
    ],
    suggestedAction: 'İncele',
  },
  'email-4': {
    id: 'email-4',
    sender: 'Ayşe Demir',
    senderEmail: 'ayse.demir@tasarimkolektifi.com',
    senderInitials: 'AD',
    subject: 'Mobil UI Tasarım Sistemi v2.4 Teslimi',
    time: '09:15',
    date: 'Bugün, 16 Eylül 2026',
    priority: 'info',
    badge: 'Bilgilendirme',
    aiSummary: 'Ayşe Demir, mobil uygulamanın yeni renk paleti ve token yapısını içeren Figma dosyasını paylaştı. Geliştirici ekiple uyumluluk kontrolü yapılmasını öneriyor.',
    keyPoints: [
      'Token bazlı renk paleti güncellendi (#5B5CE2 ana marka rengi).',
      'Koyu mod ve erişilebilirlik kontrast testleri tamamlandı.',
      'Figma bağlantısı ekte paylaşıldı.'
    ],
    originalContent: `Selam Yunus,\n\nMobil uygulama için konuştuğumuz yeni Akış ve Mail Detay tasarımlarını Figma üzerinde tamamladım. Token adlandırmalarını kod tarafındaki standartlara tam uyumlu hale getirdik.\n\nVaktin olduğunda göz atıp geri bildirim verirsen sevinirim.\n\nKolay gelsin,\nAyşe`,
    suggestedAction: 'Figma\'da Aç',
  }
};

export const MOCK_FEED_ITEMS: FeedCardItem[] = [
  {
    id: 'feed-1',
    type: 'email',
    title: 'Ahmet Yılmaz — Revize Teklif',
    subtitle: 'Gmail · Ahmet Yılmaz · 08:42',
    summary: 'Bugün 17:00\'ye kadar revize fiyat teklifi ve PDF onayı bekliyor.',
    source: 'Gmail · 08:42',
    time: '08:42',
    priority: 'critical',
    badgeText: 'Senden Cevap Bekliyor',
    actionText: 'Yanıtla',
    emailRefId: 'email-1',
  },
  {
    id: 'feed-2',
    type: 'meeting',
    title: 'Müşteri Değerlendirme Toplantısı',
    subtitle: 'Google Meet · 14:30',
    summary: 'Mehmet Kaya ile Q4 stratejik ortaklık görüşmesi. 18 dakika kaldı.',
    source: 'Google Calendar · 14:30',
    time: '14:30',
    priority: 'upcoming',
    badgeText: '18 dk sonra',
    actionText: 'Hazırlan',
    meetingData: {
      id: 'meet-1',
      title: 'Müşteri Değerlendirme Toplantısı',
      person: 'Mehmet Kaya',
      time: '14:30 - 15:30',
      date: 'Bugün',
      duration: '60 dk',
      platform: 'Google Meet',
      minutesLeft: 18,
      priority: 'upcoming',
      badge: '18 dk sonra',
      summary: 'Q4 ortaklık modeli ve teknik altyapı entegrasyonu müzakeresi.',
      agenda: [
        'Geçmiş çeyrek performans özeti (10 dk)',
        'Yeni SLA garantileri ve teknik destek modeli (25 dk)',
        'Sözleşme şartları ve sonraki adımlar (15 dk)'
      ],
      suggestedAction: 'Toplantıya Katıl',
    },
  },
  {
    id: 'feed-3',
    type: 'deadline',
    title: 'TÜBİTAK Proje Başvuru Teslimi',
    subtitle: 'Resmi Başvuru Portalı',
    summary: 'Proje ek bütçe revizyonu ve başvuru formu bugün 17:00\'de kapanıyor.',
    source: 'Sistem Uyarısı · 17:00',
    time: '17:00',
    priority: 'deadline',
    badgeText: 'Son Tarih: 17:00',
    actionText: 'Tamamla',
    deadlineData: {
      id: 'dl-1',
      title: 'TÜBİTAK Proje Başvuru Teslimi',
      dueTime: '17:00',
      dueDate: 'Bugün',
      priority: 'deadline',
      badge: 'Bugün 17:00',
      summary: '1501 Sanayi Ar-Ge Projeleri Destekleme Programı başvurusu için son onay ve e-imza aşaması.',
      source: 'TÜBİTAK Prodis',
      suggestedAction: 'Başvuru Portalını Aç',
    },
  },
  {
    id: 'feed-4',
    type: 'email',
    title: 'Mehmet Kaya — Ortaklık Değerlendirmesi',
    subtitle: 'Gmail · Mehmet Kaya · 10:20',
    summary: 'SLA maddeleri ve veri saklama protokolleri hakkında ek bilgi talep ediyor.',
    source: 'Gmail · 10:20',
    time: '10:20',
    priority: 'critical',
    badgeText: 'Önemli',
    actionText: 'İncele',
    emailRefId: 'email-2',
  },
  {
    id: 'feed-5',
    type: 'meeting',
    title: 'Haftalık Ekip Senkronizasyonu',
    subtitle: 'Zoom · 16:00',
    summary: 'Mobil sürüm yayın öncesi son kontrol ve görev dağılımı.',
    source: 'Google Calendar · 16:00',
    time: '16:00',
    priority: 'upcoming',
    badgeText: 'Bugün 16:00',
    actionText: 'Katıl',
    meetingData: {
      id: 'meet-2',
      title: 'Haftalık Ekip Senkronizasyonu',
      person: 'Tüm Ürün Ekibi (8 kişi)',
      time: '16:00 - 16:45',
      date: 'Bugün',
      duration: '45 dk',
      platform: 'Zoom',
      minutesLeft: 108,
      priority: 'upcoming',
      badge: 'Bugün 16:00',
      summary: 'Sprint değerlendirmesi ve iOS / Android dağıtım hazırlığı.',
      agenda: ['Sprint kapanış metrikleri', 'Kritik bug taraması', 'QA onay süreci'],
      suggestedAction: 'Notları Gör',
    },
  },
  {
    id: 'feed-6',
    type: 'deadline',
    title: 'Kurumsal Elektrik Faturası',
    subtitle: 'Enerjisa Kurumsal',
    summary: '1.842 TL tutarındaki merkez ofis elektrik faturası için son ödeme günü bugün.',
    source: 'Gmail · Fatura',
    time: 'Bugün',
    priority: 'deadline',
    badgeText: 'Son Gün',
    actionText: 'Ödeme Yap',
    deadlineData: {
      id: 'dl-2',
      title: 'Merkez Ofis Elektrik Faturası',
      dueTime: '23:59',
      dueDate: 'Bugün',
      priority: 'deadline',
      badge: 'Son Gün',
      summary: 'Abone No: 88412953 - Enerjisa Dağıtım A.Ş. Toplam tutar: 1.842,50 TL.',
      source: 'Enerjisa Otomatik Bildirim',
      suggestedAction: 'Banka Uygulamasına Git',
    },
  },
  {
    id: 'feed-7',
    type: 'followup',
    title: 'Can Öztürk — API Dokümantasyonu',
    subtitle: 'Takip Bekliyor · 3 gün önce',
    summary: 'Cuma günü ilettiğin API entegrasyon dokümanına henüz geri dönüş yapılmadı.',
    source: 'Smart Follow-up · 3 gün',
    time: '3 gün',
    priority: 'info',
    badgeText: 'Cevap Bekleniyor',
    actionText: 'Dürt',
    followupData: {
      id: 'fu-1',
      person: 'Can Öztürk',
      subject: 'Dijital Asistan API Entegrasyon Dokümanı',
      lastContact: '13 Eylül Cuma',
      priority: 'info',
      badge: '3 Gün Cevapsız',
      summary: 'Can Öztürk\'e gönderdiğin entegrasyon kılavuzuna yanıt gelmedi. Proje takviminin aksamaması için nazik bir hatırlatma öneriliyor.',
      suggestedAction: 'Hatırlatma Gönder',
    },
  },
  {
    id: 'feed-8',
    type: 'email',
    title: 'Fatma Şahin — Q3 Finans Raporu',
    subtitle: 'Gmail · Fatma Şahin · Dün',
    summary: 'Bütçe gerçekleşme tablosunda sapmaların onayı bekleniyor.',
    source: 'Gmail · Dün',
    time: 'Dün',
    priority: 'upcoming',
    badgeText: 'İnceleme Bekliyor',
    actionText: 'Görüntüle',
    emailRefId: 'email-3',
  },
];
