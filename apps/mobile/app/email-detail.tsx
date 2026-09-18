import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  TextInput,
  Modal,
  Platform,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_EMAILS, EmailData } from '../data/mockFeed';

type ReplyTone = 'Kısa' | 'Profesyonel' | 'Samimi' | 'Detaylı';

export default function EmailDetailScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const emailId = (params.id as string) || 'email-1';
  const email: EmailData = MOCK_EMAILS[emailId] || MOCK_EMAILS['email-1'];

  // State for collapsible original mail
  const [isOriginalOpen, setIsOriginalOpen] = useState(false);

  // Modals for the 4 action buttons
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);

  // AI Reply state
  const [selectedTone, setSelectedTone] = useState<ReplyTone>('Profesyonel');
  const [replyText, setReplyText] = useState(
    generateReplyText(email.sender, 'Profesyonel')
  );

  // Task creation state
  const [taskTitle, setTaskTitle] = useState(
    `${email.sender} için teklif revizyonunu hazırla ve PDF gönder`
  );
  const [taskDueDate, setTaskDueDate] = useState('Bugün 17:00');

  // Calendar event state
  const [eventTitle, setEventTitle] = useState(
    `${email.sender} — Teklif İnceleme & Onay`
  );
  const [eventTime, setEventTime] = useState('Bugün 16:00 - 17:00');

  // Reminder state
  const [selectedReminder, setSelectedReminder] = useState('Bugün 16:00 (1 saat önce)');

  // Toast notice state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Tone switcher
  const handleToneChange = (tone: ReplyTone) => {
    setSelectedTone(tone);
    setReplyText(generateReplyText(email.sender, tone));
  };

  function generateReplyText(sender: string, tone: ReplyTone): string {
    switch (tone) {
      case 'Kısa':
        return `Merhaba ${sender.split(' ')[0]} Bey, revize teklifi hazırlıyoruz. Bugün saat 17:00'ye kadar PDF olarak ileteceğiz. Selamlar.`;
      case 'Profesyonel':
        return `Sayın ${sender},\n\nDünkü görüşmemize istinaden talep ettiğiniz birim maliyet revizyonlarını ve güncel teklif dosyasını tamamladık. Yönetim kuruluna sunulmak üzere hazırlanan e-imzalı PDF teklifimiz saat 17:00'den önce bilginize sunulacaktır.\n\nSaygılarımla,\nYunus Akın`;
      case 'Samimi':
        return `Selamlar ${sender.split(' ')[0]} Bey,\n\nNotlarınızı aldık, revize teklif üzerinde hemen çalışmaya başladık. Saat 17:00'ye kadar PDF formatında iletmiş olacağım. Harika bir gün dilerim!\n\nYunus`;
      case 'Detaylı':
        return `Merhaba ${sender},\n\nİlettiğiniz yeni birim maliyet parametreleri ve ek bakım koşulları ekibimizce incelenmiştir. Talep edilen %10 revizyon yansıtılmış olup, akşamki bütçe komitesi toplantınıza yetiştirilmek üzere onaylı PDF dokümanı saat 17:00'den önce tarafınıza iletilecektir.\n\nEk sorularınız olursa memnuniyetle yanıtlayabilirim.\n\nİyi çalışmalar,\nYunus Akın | Teknoloji Direktörü`;
    }
  }

  // Action: Confirm Send AI Reply
  const handleSendReply = () => {
    Alert.alert(
      'Mail Gönderim Onayı',
      `Alıcı: ${email.senderEmail}\n\nBu e-posta doğrudan Gmail hesabınız üzerinden gönderilecek. Onaylıyor musunuz?`,
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Gönder',
          style: 'default',
          onPress: () => {
            setIsReplyModalOpen(false);
            showToast(`✉️ Yanıtınız ${email.sender} adresine başarıyla gönderildi.`);
          },
        },
      ]
    );
  };

  // Action: Save Task
  const handleSaveTask = () => {
    setIsTaskModalOpen(false);
    showToast(`✅ Görev oluşturuldu: "${taskTitle}"`);
  };

  // Action: Save Calendar Event
  const handleSaveCalendar = () => {
    setIsCalendarModalOpen(false);
    showToast(`📅 Takvime eklendi: "${eventTitle}" (${eventTime})`);
  };

  // Action: Save Reminder
  const handleSaveReminder = (choice: string) => {
    setSelectedReminder(choice);
    setIsReminderModalOpen(false);
    showToast(`🔔 Hatırlatıcı kuruldu: ${choice}`);
  };

  return (
    <View style={styles.container}>
      {/* Custom Header Configuration */}
      <Stack.Screen
        options={{
          headerTitle: 'Mail Detayı',
          headerBackTitle: 'Akış',
          headerTintColor: '#5B5CE2',
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Mail İşlemleri',
                  `${email.subject}\n\nKaynak: ${email.senderEmail}`,
                  [
                    { text: 'Gmail\'de Aç', onPress: () => showToast('Gmail uygulamasında açılıyor...') },
                    { text: 'Yıldızla', onPress: () => showToast('⭐ Mail yıldızlandı.') },
                    { text: 'Kapat', style: 'cancel' }
                  ]
                );
              }}
              style={{ padding: 4 }}
            >
              <Ionicons name="ellipsis-horizontal-circle" size={24} color="#5B5CE2" />
            </TouchableOpacity>
          ),
        }}
      />

      {/* Floating Toast Notice */}
      {toastMessage && (
        <View style={styles.toastCard}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. HEADER SECTION: Sender, Subject, Date */}
        <View style={styles.headerCard}>
          {/* Sender info row */}
          <View style={styles.senderRow}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{email.senderInitials}</Text>
            </View>

            <View style={styles.senderInfo}>
              <View style={styles.senderNameRow}>
                <Text style={styles.senderName}>{email.sender}</Text>
                <Ionicons name="checkmark-circle" size={15} color="#5B5CE2" style={{ marginLeft: 4 }} />
              </View>
              <Text style={styles.senderEmail}>{email.senderEmail}</Text>
              <Text style={styles.dateText}>{email.date} · {email.time} · Gmail</Text>
            </View>

            <View style={styles.priorityPill}>
              <Text style={styles.priorityPillText}>{email.badge}</Text>
            </View>
          </View>

          {/* Subject title */}
          <Text style={styles.subjectTitle}>{email.subject}</Text>
        </View>

        {/* 2. AI SUMMARY SECTION (Madde 25) - Rendered BEFORE original mail */}
        <View style={styles.aiCard}>
          {/* AI Banner Header */}
          <View style={styles.aiHeaderRow}>
            <View style={styles.aiBadge}>
              <Ionicons name="sparkles" size={14} color="#FFFFFF" style={{ marginRight: 5 }} />
              <Text style={styles.aiBadgeText}>AI ÖZETİ</Text>
            </View>
            <Text style={styles.aiConfidenceText}>Gemini Analizi · Yüksek Öncelik</Text>
          </View>

          {/* AI Summary Text */}
          <Text style={styles.aiSummaryText}>{email.aiSummary}</Text>

          {/* 3 Key Points */}
          <View style={styles.keyPointsContainer}>
            <Text style={styles.keyPointsHeader}>ÖNEMLİ NOKTALAR (3)</Text>
            {email.keyPoints.map((point, index) => (
              <View key={index} style={styles.keyPointRow}>
                <View style={styles.keyPointBullet}>
                  <Text style={styles.keyPointBulletNum}>{index + 1}</Text>
                </View>
                <Text style={styles.keyPointText}>{point}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 3. ACTION BUTTONS (4 Functional Buttons) */}
        <View style={styles.actionsSection}>
          <Text style={styles.actionsSectionTitle}>HIZLI AKSİYONLAR</Text>

          <View style={styles.actionGrid}>
            {/* Button 1: Yanıt Hazırla (Primary) */}
            <TouchableOpacity
              style={styles.actionBtnPrimary}
              onPress={() => setIsReplyModalOpen(true)}
              activeOpacity={0.8}
            >
              <View style={styles.actionBtnIconBoxPrimary}>
                <Ionicons name="sparkles" size={20} color="#5B5CE2" />
              </View>
              <Text style={styles.actionBtnTextPrimary}>Yanıt Hazırla</Text>
              <Text style={styles.actionBtnSubtextPrimary}>AI Destekli Taslak</Text>
            </TouchableOpacity>

            {/* Button 2: Görev Oluştur */}
            <TouchableOpacity
              style={styles.actionBtnSecondary}
              onPress={() => setIsTaskModalOpen(true)}
              activeOpacity={0.7}
            >
              <View style={styles.actionBtnIconBox}>
                <Ionicons name="checkbox-outline" size={20} color="#1A1917" />
              </View>
              <Text style={styles.actionBtnTextSecondary}>Görev Oluştur</Text>
              <Text style={styles.actionBtnSubtext}>Plan Listesine Ekle</Text>
            </TouchableOpacity>

            {/* Button 3: Takvime Ekle */}
            <TouchableOpacity
              style={styles.actionBtnSecondary}
              onPress={() => setIsCalendarModalOpen(true)}
              activeOpacity={0.7}
            >
              <View style={styles.actionBtnIconBox}>
                <Ionicons name="calendar-outline" size={20} color="#1A1917" />
              </View>
              <Text style={styles.actionBtnTextSecondary}>Takvime Ekle</Text>
              <Text style={styles.actionBtnSubtext}>Toplantı & Blok Ayır</Text>
            </TouchableOpacity>

            {/* Button 4: Hatırlat */}
            <TouchableOpacity
              style={styles.actionBtnSecondary}
              onPress={() => setIsReminderModalOpen(true)}
              activeOpacity={0.7}
            >
              <View style={styles.actionBtnIconBox}>
                <Ionicons name="notifications-outline" size={20} color="#1A1917" />
              </View>
              <Text style={styles.actionBtnTextSecondary}>Hatırlat</Text>
              <Text style={styles.actionBtnSubtext}>Akıllı Bildirim Kur</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 4. ORIGINAL MAIL SECTION (Collapsible Accordion) */}
        <View style={styles.originalMailCard}>
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => setIsOriginalOpen(!isOriginalOpen)}
            activeOpacity={0.7}
          >
            <View style={styles.accordionTitleRow}>
              <Ionicons name="mail-open-outline" size={18} color="#5B5CE2" />
              <Text style={styles.accordionTitle}>Orijinal Mail Metni</Text>
              <View style={styles.accordionPill}>
                <Text style={styles.accordionPillText}>
                  {isOriginalOpen ? 'Gizle' : 'Genişlet'}
                </Text>
              </View>
            </View>
            <Ionicons
              name={isOriginalOpen ? 'chevron-up' : 'chevron-down'}
              size={18}
              color="#6B6860"
            />
          </TouchableOpacity>

          {isOriginalOpen && (
            <View style={styles.accordionBody}>
              <View style={styles.originalMetaBox}>
                <Text style={styles.originalMetaLine}>
                  <Text style={styles.metaLabelBold}>Kimden: </Text>
                  {email.sender} &lt;{email.senderEmail}&gt;
                </Text>
                <Text style={styles.originalMetaLine}>
                  <Text style={styles.metaLabelBold}>Kime: </Text>
                  Yunus Akın &lt;yunus@dijitalasistanim.com&gt;
                </Text>
                <Text style={styles.originalMetaLine}>
                  <Text style={styles.metaLabelBold}>Tarih: </Text>
                  {email.date}, {email.time}
                </Text>
                <Text style={styles.originalMetaLine}>
                  <Text style={styles.metaLabelBold}>Konu: </Text>
                  {email.subject}
                </Text>
              </View>

              <Text style={styles.originalContentText}>{email.originalContent}</Text>

              {/* Attachments Section */}
              {email.attachments && email.attachments.length > 0 && (
                <View style={styles.attachmentsBox}>
                  <Text style={styles.attachmentsTitle}>EKLER ({email.attachments.length})</Text>
                  {email.attachments.map((att, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.attachmentItem}
                      onPress={() => showToast(`📄 ${att.name} indiriliyor...`)}
                    >
                      <Ionicons
                        name={att.name.endsWith('.pdf') ? 'document-text' : 'document-attach'}
                        size={20}
                        color="#5B5CE2"
                      />
                      <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={styles.attachmentName} numberOfLines={1}>{att.name}</Text>
                        <Text style={styles.attachmentSize}>{att.size}</Text>
                      </View>
                      <Ionicons name="download-outline" size={18} color="#6B6860" />
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Gmail App Button */}
              <TouchableOpacity
                style={styles.openInGmailBtn}
                onPress={() => showToast('Gmail uygulaması açılıyor...')}
              >
                <Ionicons name="logo-google" size={16} color="#4A4843" style={{ marginRight: 6 }} />
                <Text style={styles.openInGmailBtnText}>Gmail Uygulamasında Aç ↗</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* ============================================================ */}
      {/* MODAL 1: AI YANIT HAZIRLA (AI DRAFT REPLY)                    */}
      {/* ============================================================ */}
      <Modal
        visible={isReplyModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsReplyModalOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <Pressable style={styles.modalDismiss} onPress={() => setIsReplyModalOpen(false)} />
          <View style={styles.modalSheet}>
            <View style={styles.sheetHandle} />

            <View style={styles.sheetHeaderRow}>
              <View style={styles.sheetTitleWithIcon}>
                <View style={[styles.sheetIconCircle, { backgroundColor: '#EDEDFC' }]}>
                  <Ionicons name="sparkles" size={18} color="#5B5CE2" />
                </View>
                <View>
                  <Text style={styles.sheetTitle}>AI Yanıt Hazırla</Text>
                  <Text style={styles.sheetSubtitle}>Alıcı: {email.sender}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setIsReplyModalOpen(false)}>
                <Ionicons name="close-circle" size={24} color="#A0A0B2" />
              </TouchableOpacity>
            </View>

            {/* Tone Selector Chips */}
            <Text style={styles.composerLabel}>YANIT TONU</Text>
            <View style={styles.tonePillRow}>
              {(['Kısa', 'Profesyonel', 'Samimi', 'Detaylı'] as ReplyTone[]).map((tone) => (
                <TouchableOpacity
                  key={tone}
                  style={[
                    styles.tonePill,
                    selectedTone === tone && styles.tonePillActive,
                  ]}
                  onPress={() => handleToneChange(tone)}
                >
                  <Text
                    style={[
                      styles.tonePillText,
                      selectedTone === tone && styles.tonePillTextActive,
                    ]}
                  >
                    {tone}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Editable Draft Composer */}
            <Text style={styles.composerLabel}>E-POSTA TASLAĞI (DÜZENLENEBİLİR)</Text>
            <TextInput
              style={styles.replyTextInput}
              value={replyText}
              onChangeText={setReplyText}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              placeholder="Yanıt taslağınızı düzenleyin..."
              placeholderTextColor="#A0A0B2"
            />

            <View style={styles.securityNoticeRow}>
              <Ionicons name="shield-checkmark" size={15} color="#5B5CE2" />
              <Text style={styles.securityNoticeText}>
                AI Güvenlik Kuralı: Onayınız olmadan hiçbir e-posta gönderilmez.
              </Text>
            </View>

            {/* Modal Bottom Actions */}
            <View style={styles.modalActionRow}>
              <TouchableOpacity
                style={styles.sendConfirmButton}
                onPress={handleSendReply}
              >
                <Ionicons name="send" size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.sendConfirmButtonText}>Göndermeyi Onayla</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.copyDraftButton}
                onPress={() => {
                  showToast('📋 Taslak metin panoya kopyalandı.');
                }}
              >
                <Ionicons name="copy-outline" size={16} color="#5B5CE2" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ============================================================ */}
      {/* MODAL 2: GÖREV OLUŞTUR (CREATE TASK)                         */}
      {/* ============================================================ */}
      <Modal
        visible={isTaskModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsTaskModalOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <Pressable style={styles.modalDismiss} onPress={() => setIsTaskModalOpen(false)} />
          <View style={styles.modalSheet}>
            <View style={styles.sheetHandle} />

            <View style={styles.sheetHeaderRow}>
              <View style={styles.sheetTitleWithIcon}>
                <View style={[styles.sheetIconCircle, { backgroundColor: '#E4F5EA' }]}>
                  <Ionicons name="checkbox" size={18} color="#1E7A47" />
                </View>
                <View>
                  <Text style={styles.sheetTitle}>Görev Oluştur</Text>
                  <Text style={styles.sheetSubtitle}>Mail bağlamından otomatik oluşturuldu</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setIsTaskModalOpen(false)}>
                <Ionicons name="close-circle" size={24} color="#A0A0B2" />
              </TouchableOpacity>
            </View>

            <Text style={styles.composerLabel}>GÖREV TANIMI</Text>
            <TextInput
              style={styles.taskInput}
              value={taskTitle}
              onChangeText={setTaskTitle}
              placeholder="Görev başlığı..."
            />

            <Text style={styles.composerLabel}>SON TARİH</Text>
            <View style={styles.taskMetaRow}>
              <TouchableOpacity
                style={[styles.taskDueBtn, taskDueDate === 'Bugün 17:00' && styles.taskDueBtnActive]}
                onPress={() => setTaskDueDate('Bugün 17:00')}
              >
                <Text style={[styles.taskDueBtnText, taskDueDate === 'Bugün 17:00' && styles.taskDueBtnTextActive]}>
                  Bugün 17:00
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.taskDueBtn, taskDueDate === 'Yarın 12:00' && styles.taskDueBtnActive]}
                onPress={() => setTaskDueDate('Yarın 12:00')}
              >
                <Text style={[styles.taskDueBtnText, taskDueDate === 'Yarın 12:00' && styles.taskDueBtnTextActive]}>
                  Yarın 12:00
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.taskDueBtn, taskDueDate === 'Cuma 18:00' && styles.taskDueBtnActive]}
                onPress={() => setTaskDueDate('Cuma 18:00')}
              >
                <Text style={[styles.taskDueBtnText, taskDueDate === 'Cuma 18:00' && styles.taskDueBtnTextActive]}>
                  Cuma 18:00
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.primaryModalBtn} onPress={handleSaveTask}>
              <Ionicons name="checkmark-circle-outline" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.primaryModalBtnText}>Görevi Kaydet & Ekle</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ============================================================ */}
      {/* MODAL 3: TAKVİME EKLE (CALENDAR EVENT)                       */}
      {/* ============================================================ */}
      <Modal
        visible={isCalendarModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsCalendarModalOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <Pressable style={styles.modalDismiss} onPress={() => setIsCalendarModalOpen(false)} />
          <View style={styles.modalSheet}>
            <View style={styles.sheetHandle} />

            <View style={styles.sheetHeaderRow}>
              <View style={styles.sheetTitleWithIcon}>
                <View style={[styles.sheetIconCircle, { backgroundColor: '#E7F0FD' }]}>
                  <Ionicons name="calendar" size={18} color="#2262BE" />
                </View>
                <View>
                  <Text style={styles.sheetTitle}>Takvim Etkinliği</Text>
                  <Text style={styles.sheetSubtitle}>Google Takvim'e işlenecek</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setIsCalendarModalOpen(false)}>
                <Ionicons name="close-circle" size={24} color="#A0A0B2" />
              </TouchableOpacity>
            </View>

            <Text style={styles.composerLabel}>ETKİNLİK BAŞLIĞI</Text>
            <TextInput
              style={styles.taskInput}
              value={eventTitle}
              onChangeText={setEventTitle}
              placeholder="Etkinlik başlığı..."
            />

            <Text style={styles.composerLabel}>ZAMAN DİLİMİ</Text>
            <TextInput
              style={styles.taskInput}
              value={eventTime}
              onChangeText={setEventTime}
              placeholder="Saat dilimi..."
            />

            <TouchableOpacity style={[styles.primaryModalBtn, { backgroundColor: '#2262BE' }]} onPress={handleSaveCalendar}>
              <Ionicons name="calendar-sharp" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.primaryModalBtnText}>Takvime Kaydet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ============================================================ */}
      {/* MODAL 4: HATIRLAT (SMART REMINDER)                           */}
      {/* ============================================================ */}
      <Modal
        visible={isReminderModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsReminderModalOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <Pressable style={styles.modalDismiss} onPress={() => setIsReminderModalOpen(false)} />
          <View style={styles.modalSheet}>
            <View style={styles.sheetHandle} />

            <View style={styles.sheetHeaderRow}>
              <View style={styles.sheetTitleWithIcon}>
                <View style={[styles.sheetIconCircle, { backgroundColor: '#FEF3D6' }]}>
                  <Ionicons name="notifications" size={18} color="#B06000" />
                </View>
                <View>
                  <Text style={styles.sheetTitle}>Akıllı Hatırlatıcı</Text>
                  <Text style={styles.sheetSubtitle}>Bu mail için sana ne zaman haber verelim?</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setIsReminderModalOpen(false)}>
                <Ionicons name="close-circle" size={24} color="#A0A0B2" />
              </TouchableOpacity>
            </View>

            <View style={styles.reminderOptionsList}>
              {[
                { label: '1 saat sonra', desc: '09:42 · Hızlı kontrol için' },
                { label: 'Bugün 16:00', desc: 'Son teslim saatinden 1 saat önce' },
                { label: 'Bu akşam 20:00', desc: 'Günün kapanışında kontrol' },
                { label: 'Yarın sabah 09:00', desc: 'Güne başlarken ilk iş' },
              ].map((item) => (
                <TouchableOpacity
                  key={item.label}
                  style={styles.reminderOptionCard}
                  onPress={() => handleSaveReminder(item.label)}
                >
                  <Ionicons name="alarm-outline" size={20} color="#5B5CE2" />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.reminderOptionLabel}>{item.label}</Text>
                    <Text style={styles.reminderOptionDesc}>{item.desc}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#A0A0B2" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FC',
  },
  toastCard: {
    position: 'absolute',
    top: 14,
    left: 20,
    right: 20,
    zIndex: 9999,
    backgroundColor: '#1E1E4C',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },

  // 1. Header Section
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E8F0',
    shadowColor: '#0F0F1A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  senderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EDEDFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#D4D5F8',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#5B5CE2',
  },
  senderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  senderNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  senderName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F0F1A',
  },
  senderEmail: {
    fontSize: 12,
    color: '#6B6860',
    marginTop: 1,
  },
  dateText: {
    fontSize: 11,
    color: '#9B978E',
    marginTop: 2,
  },
  priorityPill: {
    backgroundColor: '#FCEDE9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F8D3CE',
  },
  priorityPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#C7432F',
  },
  subjectTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F0F1A',
    lineHeight: 24,
    letterSpacing: -0.3,
  },

  // 2. AI Summary Section (Madde 25)
  aiCard: {
    backgroundColor: '#F7F6FD',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#D8D7FA',
    shadowColor: '#5B5CE2',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  aiHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5B5CE2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  aiBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  aiConfidenceText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#5B5CE2',
  },
  aiSummaryText: {
    fontSize: 15,
    color: '#1A1917',
    lineHeight: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
  keyPointsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E8E8F0',
  },
  keyPointsHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#9B978E',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  keyPointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  keyPointBullet: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EDEDFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 1,
  },
  keyPointBulletNum: {
    fontSize: 11,
    fontWeight: '800',
    color: '#5B5CE2',
  },
  keyPointText: {
    fontSize: 13,
    color: '#1A1917',
    flex: 1,
    lineHeight: 19,
    fontWeight: '500',
  },

  // 3. Actions Section
  actionsSection: {
    gap: 8,
  },
  actionsSectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#6B6860',
    letterSpacing: 0.5,
    marginLeft: 4,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  actionBtnPrimary: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: '#5B5CE2',
    borderRadius: 14,
    padding: 14,
    shadowColor: '#5B5CE2',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  actionBtnIconBoxPrimary: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionBtnTextPrimary: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  actionBtnSubtextPrimary: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  actionBtnSecondary: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E8E8F0',
    shadowColor: '#0F0F1A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  actionBtnIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F1F1F8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionBtnTextSecondary: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F0F1A',
  },
  actionBtnSubtext: {
    fontSize: 11,
    color: '#9B978E',
    marginTop: 2,
  },

  // 4. Original Mail Collapsible
  originalMailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E8F0',
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  accordionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  accordionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F0F1A',
  },
  accordionPill: {
    backgroundColor: '#F1F1F8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  accordionPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B6860',
  },
  accordionBody: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F8',
  },
  originalMetaBox: {
    backgroundColor: '#F8F8FC',
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
    marginBottom: 14,
    gap: 4,
  },
  originalMetaLine: {
    fontSize: 12,
    color: '#6B6860',
  },
  metaLabelBold: {
    fontWeight: '700',
    color: '#1A1917',
  },
  originalContentText: {
    fontSize: 14,
    color: '#1A1917',
    lineHeight: 22,
    marginBottom: 16,
  },
  attachmentsBox: {
    marginTop: 8,
    marginBottom: 14,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F8',
    paddingTop: 12,
  },
  attachmentsTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#9B978E',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8FC',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E8F0',
    marginBottom: 6,
  },
  attachmentName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F0F1A',
  },
  attachmentSize: {
    fontSize: 11,
    color: '#9B978E',
    marginTop: 1,
  },
  openInGmailBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F1F8',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 6,
  },
  openInGmailBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4A4843',
  },

  // Modal / BottomSheet Styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 15, 26, 0.55)',
    justifyContent: 'flex-end',
  },
  modalDismiss: {
    flex: 1,
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    maxHeight: '90%',
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E8E8F0',
    alignSelf: 'center',
    marginBottom: 14,
  },
  sheetHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sheetTitleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sheetIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F0F1A',
  },
  sheetSubtitle: {
    fontSize: 12,
    color: '#6B6860',
    marginTop: 2,
  },
  composerLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#9B978E',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginTop: 6,
  },
  tonePillRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  tonePill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#F1F1F8',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tonePillActive: {
    backgroundColor: '#EDEDFC',
    borderColor: '#5B5CE2',
  },
  tonePillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B6860',
  },
  tonePillTextActive: {
    color: '#5B5CE2',
    fontWeight: '700',
  },
  replyTextInput: {
    backgroundColor: '#F8F8FC',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E8E8F0',
    fontSize: 14,
    color: '#0F0F1A',
    lineHeight: 20,
    height: 120,
    marginBottom: 10,
  },
  securityNoticeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
    backgroundColor: '#F7F6FD',
    padding: 8,
    borderRadius: 8,
  },
  securityNoticeText: {
    fontSize: 11,
    color: '#5B5CE2',
    fontWeight: '600',
    flex: 1,
  },
  modalActionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  sendConfirmButton: {
    flex: 1,
    backgroundColor: '#5B5CE2',
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5B5CE2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  sendConfirmButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  copyDraftButton: {
    width: 48,
    backgroundColor: '#EDEDFC',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D4D5F8',
  },
  taskInput: {
    backgroundColor: '#F8F8FC',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E8E8F0',
    fontSize: 14,
    color: '#0F0F1A',
    marginBottom: 14,
  },
  taskMetaRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  taskDueBtn: {
    flex: 1,
    backgroundColor: '#F1F1F8',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  taskDueBtnActive: {
    backgroundColor: '#E4F5EA',
    borderWidth: 1,
    borderColor: '#1E7A47',
  },
  taskDueBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B6860',
  },
  taskDueBtnTextActive: {
    color: '#1E7A47',
    fontWeight: '700',
  },
  primaryModalBtn: {
    backgroundColor: '#5B5CE2',
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryModalBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  reminderOptionsList: {
    gap: 8,
    marginTop: 4,
  },
  reminderOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8FC',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8F0',
  },
  reminderOptionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F0F1A',
  },
  reminderOptionDesc: {
    fontSize: 12,
    color: '#6B6860',
    marginTop: 2,
  },
});
