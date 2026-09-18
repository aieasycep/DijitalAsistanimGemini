import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Modal,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// --- THEME TOKENS (Master Design System) ---
const COLORS = {
  primary: '#5B5CE2',
  primaryDark: '#4647C7',
  primarySoft: '#EDEDFC',
  primaryLight: '#F5F5FF',
  background: '#F1F1F8',
  surface: '#FFFFFF',
  surfaceSoft: '#F8F8FC',
  surfaceCard: '#FFFFFF',
  ink: '#0F0F1A',
  inkSecondary: '#6B6860',
  inkTertiary: '#9B978E',
  border: '#E8E8F0',
  borderLight: '#F2F2F8',
  critical: '#C7432F',
  criticalSoft: '#FCEDE9',
  criticalBorder: '#FAD4CE',
  warning: '#9A6300',
  warningSoft: '#FDF2DC',
  success: '#1E7A47',
  successSoft: '#E4F5EA',
  info: '#2262BE',
  infoSoft: '#E7F0FD',
};

// --- DATA STRUCTURES ---
interface MeetingItem {
  id: string;
  title: string;
  person: string;
  role: string;
  time: string;
  duration: string;
  platform: string;
  platformIcon: string;
  agenda: string;
  tag: string;
}

interface TimelineSlot {
  time: string;
  event?: {
    id: string;
    title: string;
    type: 'meeting' | 'ai_block' | 'personal';
    duration: string;
    meta: string;
    person?: string;
  } | null;
}

// Mock Meetings List
const UPCOMING_MEETINGS: MeetingItem[] = [
  {
    id: 'm1',
    title: 'Müşteri Toplantısı & Teklif Revizyonu',
    person: 'Mehmet Yılmaz',
    role: 'Satınalma Direktörü, Acme Corp',
    time: '14:30 – 15:30',
    duration: '60 dk',
    platform: 'Google Meet',
    platformIcon: 'videocam-outline',
    agenda: 'Revize fiyat sınırları (%8 indirim) ve 6 Ekim teslimat takviminin netleştirilmesi.',
    tag: 'KRİTİK GÖRÜŞME',
  },
  {
    id: 'm2',
    title: 'Q4 Sprint Planlama & Kickoff',
    person: 'Can Öztürk',
    role: 'Ürün Yöneticisi',
    time: '11:00 – 11:45',
    duration: '45 dk',
    platform: 'Zoom',
    platformIcon: 'videocam-outline',
    agenda: 'Mobil Onay Merkezi ve Planlama akışlarının sprint dağılımı.',
    tag: 'EKİP',
  },
  {
    id: 'm3',
    title: 'Seri A Tur Değerlendirme',
    person: 'Ali Demir & Yatırımcı Ekibi',
    role: 'Ortak, Horizon VC',
    time: '17:00 – 18:00',
    duration: '60 dk',
    platform: 'Maslak Ofis / Yüzyüze',
    platformIcon: 'business-outline',
    agenda: 'Q3 finansal gerçekleşmeleri ve gelecek çeyrek büyüme projeksiyonu.',
    tag: 'STRATEJİK',
  },
];

// Mock Timeline Slots
const INITIAL_TIMELINE: TimelineSlot[] = [
  { time: '09:00', event: { id: 't1', title: 'Haftalık Ekip Senkronizasyonu', type: 'meeting', duration: '45 dk', meta: 'Google Meet · 4 kişi' } },
  { time: '10:00', event: null },
  { time: '11:00', event: { id: 't2', title: 'Can Öztürk · Sprint Kickoff', type: 'meeting', duration: '45 dk', meta: 'Zoom · Ürün ekibi', person: 'Can Öztürk' } },
  { time: '12:00', event: { id: 't3', title: 'Öğle Molası & Dinlenme', type: 'personal', duration: '60 dk', meta: 'Serbest Zaman' } },
  { time: '13:00', event: null },
  { time: '14:00', event: null },
  { time: '14:30', event: { id: 't4', title: 'Mehmet Yılmaz · Müşteri Toplantısı', type: 'meeting', duration: '60 dk', meta: 'Google Meet · Revize Teklif', person: 'Mehmet Yılmaz' } },
  { time: '15:30', event: null },
  { time: '16:00', event: null },
  { time: '17:00', event: { id: 't5', title: 'Ali Demir · Seri A Görüşmesi', type: 'meeting', duration: '60 dk', meta: 'Maslak Ofis', person: 'Ali Demir' } },
  { time: '18:00', event: null },
];

// Days for strip
const WEEK_DAYS = [
  { day: 'Pzt', date: '14', isToday: false },
  { day: 'Sal', date: '15', isToday: false },
  { day: 'Çar', date: '16', isToday: true },
  { day: 'Per', date: '17', isToday: false },
  { day: 'Cum', date: '18', isToday: false },
  { day: 'Cmt', date: '19', isToday: false },
  { day: 'Paz', date: '20', isToday: false },
];

export default function PlanScreen() {
  const [selectedSegment, setSelectedSegment] = useState<'gun' | 'hafta'>('gun');
  const [selectedDayIndex, setSelectedDayIndex] = useState(2); // Çarşamba (Today)

  // AI Schedule State (Madde 29)
  const [scheduleState, setScheduleState] = useState<'initial' | 'planned' | 'dismissed'>('initial');
  const [timeline, setTimeline] = useState<TimelineSlot[]>(INITIAL_TIMELINE);

  // Plan Confirmation Sheet / Modal
  const [showPlanModal, setShowPlanModal] = useState(false);

  // Conflict Resolution Modal (Madde 24)
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [conflictResolved, setConflictResolved] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Plan Action Handler (Madde 29)
  const handleConfirmPlan = () => {
    setScheduleState('planned');
    setShowPlanModal(false);

    // Insert the AI Task block into the timeline at 14:00 - 16:30
    setTimeline((prev) => {
      const updated = prev.map((slot) => {
        if (slot.time === '14:00') {
          return {
            ...slot,
            event: {
              id: 'ai-task-1',
              title: '✨ Teklif Hazırlama (AI Görev Bloğu)',
              type: 'ai_block' as const,
              duration: '150 dk',
              meta: 'Önerilen Odak Zamanı · Yarın 14:00–16:30',
            },
          };
        }
        return slot;
      });
      return updated;
    });

    showToast('✨ "Teklif Hazırlama" görevi planlandı ve Onay Merkezi\'ne eklendi.');
  };

  const handleDismissSuggestion = () => {
    setScheduleState('dismissed');
    showToast('Öneri daha sonra hatırlatılmak üzere ertelendi.');
  };

  // Conflict Resolution Handler
  const handleResolveConflict = (solutionTitle: string) => {
    setShowConflictModal(false);
    setConflictResolved(true);
    showToast(`✅ Çözüm Onay Merkezi'ne iletildi: "${solutionTitle}"`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* --- HEADER: Plan ve Tarih (Madde 29) --- */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Plan</Text>
          <Text style={styles.headerDate}>16 Eylül 2026, Çarşamba</Text>
        </View>

        <View style={styles.headerActions}>
          {/* Direct shortcut button to Approval Center */}
          <Pressable
            style={({ pressed }) => [styles.approvalCenterShortcut, pressed && styles.pressed]}
            onPress={() => router.push('/approval-center' as any)}
            accessibilityLabel="Onay Merkezi'ne Git"
          >
            <View style={styles.shieldIconBox}>
              <Ionicons name="shield-checkmark" size={16} color={COLORS.primary} />
            </View>
            <View>
              <Text style={styles.shortcutTitle}>Onay Merkezi</Text>
              <Text style={styles.shortcutSubtitle}>3 Bekliyor</Text>
            </View>
            <Ionicons name="chevron-forward" size={14} color={COLORS.inkTertiary} />
          </Pressable>
        </View>
      </View>

      {/* --- TOAST NOTIFICATION --- */}
      {toastMessage && (
        <View style={styles.toastContainer}>
          <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
          <Text style={styles.toastText} numberOfLines={2}>
            {toastMessage}
          </Text>
        </View>
      )}

      {/* --- VIEW SWITCHER SEGMENT: Gün / Hafta --- */}
      <View style={styles.segmentContainer}>
        <View style={styles.segmentWrapper}>
          <Pressable
            style={[styles.segmentBtn, selectedSegment === 'gun' && styles.segmentBtnActive]}
            onPress={() => setSelectedSegment('gun')}
          >
            <Text style={[styles.segmentBtnText, selectedSegment === 'gun' && styles.segmentBtnTextActive]}>
              Gün
            </Text>
          </Pressable>

          <Pressable
            style={[styles.segmentBtn, selectedSegment === 'hafta' && styles.segmentBtnActive]}
            onPress={() => setSelectedSegment('hafta')}
          >
            <Text style={[styles.segmentBtnText, selectedSegment === 'hafta' && styles.segmentBtnTextActive]}>
              Hafta
            </Text>
          </Pressable>
        </View>
      </View>

      {/* --- DATE STRIP --- */}
      <View style={styles.dateStripContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateStripScroll}
        >
          {WEEK_DAYS.map((d, idx) => {
            const isSelected = selectedDayIndex === idx;
            return (
              <Pressable
                key={d.day}
                style={[styles.dayCard, isSelected && styles.dayCardActive]}
                onPress={() => setSelectedDayIndex(idx)}
              >
                <Text style={[styles.dayLabel, isSelected && styles.dayLabelActive]}>{d.day}</Text>
                <View style={[styles.dateCircle, isSelected && styles.dateCircleActive]}>
                  <Text style={[styles.dateNumber, isSelected && styles.dateNumberActive]}>{d.date}</Text>
                </View>
                {d.isToday && <View style={[styles.todayIndicatorDot, isSelected && styles.todayIndicatorDotActive]} />}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.mainScroll}
        contentContainerStyle={styles.mainContent}
        showsVerticalScrollIndicator={false}
      >
        {selectedSegment === 'gun' ? (
          <>
            {/* --- AI SUGGESTED SCHEDULE CARD (Master Prompt Madde 29) --- */}
            {scheduleState !== 'dismissed' && (
              <View style={styles.aiScheduleCard}>
                <View style={styles.aiTagRow}>
                  <View style={styles.sparkleIcon}>
                    <Ionicons name="sparkles" size={14} color={COLORS.primary} />
                  </View>
                  <Text style={styles.aiTagText}>TAKVİM ZEKÂSI · AI ÖNERİSİ (MADDE 29)</Text>
                </View>

                <Text style={styles.aiScheduleHeadline}>
                  Yarın 14:00–16:30 arasında 2,5 saat boşluğun var.
                </Text>

                <Text style={styles.aiScheduleSubtext}>
                  Teklif hazırlama görevini buraya yerleştirebilirim.
                </Text>

                <View style={styles.aiActionRow}>
                  {scheduleState === 'planned' ? (
                    <View style={styles.plannedSuccessBadge}>
                      <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
                      <Text style={styles.plannedSuccessText}>
                        Planlandı · Yarın 14:00–16:30 Teklif Hazırlama
                      </Text>
                    </View>
                  ) : (
                    <>
                      <Pressable
                        style={({ pressed }) => [styles.planCtaBtn, pressed && styles.pressed]}
                        onPress={() => setShowPlanModal(true)}
                      >
                        <Ionicons name="calendar" size={15} color="#FFFFFF" />
                        <Text style={styles.planCtaText}>Planla</Text>
                      </Pressable>

                      <Pressable
                        style={({ pressed }) => [styles.planSecondaryBtn, pressed && styles.pressed]}
                        onPress={handleDismissSuggestion}
                      >
                        <Text style={styles.planSecondaryText}>Başka Zaman</Text>
                      </Pressable>
                    </>
                  )}
                </View>
              </View>
            )}

            {/* --- CALENDAR CONFLICT ALERT (Madde 24 & Master Design 5.3) --- */}
            {!conflictResolved && (
              <View style={styles.conflictCard}>
                <View style={styles.conflictTop}>
                  <Ionicons name="alert-circle" size={20} color={COLORS.critical} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.conflictTitle}>Takvim Çakışması Algılandı</Text>
                    <Text style={styles.conflictDesc}>
                      14:00–15:00 müşteri toplantısı ile 14:30 doktor randevusu çakışıyor.
                    </Text>
                  </View>
                  <Pressable
                    style={({ pressed }) => [styles.conflictResolveBtn, pressed && styles.pressed]}
                    onPress={() => setShowConflictModal(true)}
                  >
                    <Text style={styles.conflictResolveText}>Çöz</Text>
                  </Pressable>
                </View>
              </View>
            )}

            {/* --- UPCOMING MEETINGS LIST (Toplantı Hazırlığı Butonlu) --- */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleRow}>
                  <Ionicons name="videocam" size={18} color={COLORS.primary} />
                  <Text style={styles.sectionTitle}>Yaklaşan Toplantılar</Text>
                </View>
                <View style={styles.countBadge}>
                  <Text style={styles.countBadgeText}>{UPCOMING_MEETINGS.length}</Text>
                </View>
              </View>

              <View style={styles.meetingsList}>
                {UPCOMING_MEETINGS.map((meeting) => (
                  <View key={meeting.id} style={styles.meetingCard}>
                    {/* Top Row: Tag, Duration & Platform */}
                    <View style={styles.meetingHeaderRow}>
                      <View style={styles.meetingTagPill}>
                        <Text style={styles.meetingTagText}>{meeting.tag}</Text>
                      </View>
                      <View style={styles.meetingMetaRight}>
                        <Ionicons name={meeting.platformIcon} size={14} color={COLORS.inkSecondary} />
                        <Text style={styles.meetingMetaText}>
                          {meeting.platform} · {meeting.duration}
                        </Text>
                      </View>
                    </View>

                    {/* Meeting Title & Person */}
                    <Text style={styles.meetingTitle}>{meeting.title}</Text>

                    <View style={styles.meetingPersonRow}>
                      <View style={styles.avatarCircleSmall}>
                        <Text style={styles.avatarTextSmall}>
                          {meeting.person.slice(0, 2).toUpperCase()}
                        </Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.meetingPersonName}>{meeting.person}</Text>
                        <Text style={styles.meetingPersonRole}>{meeting.role}</Text>
                      </View>
                      <View style={styles.meetingTimeBox}>
                        <Ionicons name="time-outline" size={13} color={COLORS.primary} />
                        <Text style={styles.meetingTimeText}>{meeting.time}</Text>
                      </View>
                    </View>

                    {/* Agenda / Context */}
                    <View style={styles.agendaBox}>
                      <Text style={styles.agendaLabel}>GÜNDEM ÖZETİ:</Text>
                      <Text style={styles.agendaText}>{meeting.agenda}</Text>
                    </View>

                    {/* STEP 1 MANDATE: 'Toplantı Hazırlığı (Meeting Prep)' butonu */}
                    <Pressable
                      style={({ pressed }) => [
                        styles.meetingPrepBtn,
                        pressed && styles.pressed,
                      ]}
                      onPress={() =>
                        router.push({
                          pathname: '/meeting-prep',
                          params: {
                            id: meeting.id,
                            title: meeting.title,
                            person: meeting.person,
                            time: meeting.time,
                            platform: meeting.platform,
                          },
                        } as any)
                      }
                    >
                      <View style={styles.prepBtnIconBox}>
                        <Ionicons name="flash" size={15} color="#FFFFFF" />
                      </View>
                      <Text style={styles.meetingPrepBtnText}>
                        Toplantı Hazırlığı (Meeting Prep)
                      </Text>
                      <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                    </Pressable>
                  </View>
                ))}
              </View>
            </View>

            {/* --- DAILY TIMELINE (Günün Çizelgesi) --- */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleRow}>
                  <Ionicons name="time" size={18} color={COLORS.ink} />
                  <Text style={styles.sectionTitle}>Günün Çizelgesi</Text>
                </View>
                <Text style={styles.timelineHint}>Tek Sütunlu Görünüm</Text>
              </View>

              <View style={styles.timelineContainer}>
                {timeline.map((slot) => {
                  const hasEvent = slot.event !== null && slot.event !== undefined;
                  const isAiBlock = slot.event?.type === 'ai_block';
                  const isPersonal = slot.event?.type === 'personal';

                  return (
                    <View key={slot.time} style={styles.timelineRow}>
                      <View style={styles.timeLabelBox}>
                        <Text style={styles.timeLabelText}>{slot.time}</Text>
                      </View>

                      <View style={styles.timelineLineColumn}>
                        <View style={styles.timelineDot} />
                        <View style={styles.timelineVerticalLine} />
                      </View>

                      <View style={styles.slotContentArea}>
                        {hasEvent ? (
                          <View
                            style={[
                              styles.timelineEventCard,
                              isAiBlock && styles.timelineEventCardAi,
                              isPersonal && styles.timelineEventCardPersonal,
                            ]}
                          >
                            <View style={styles.slotHeader}>
                              <Text
                                style={[
                                  styles.slotTypeBadge,
                                  isAiBlock && styles.slotTypeBadgeAi,
                                ]}
                              >
                                {isAiBlock
                                  ? '✨ AI GÖREV BLOĞU'
                                  : isPersonal
                                  ? 'SERBEST ZAMAN'
                                  : '📅 TOPLANTI'}
                              </Text>
                              <Text style={styles.slotDuration}>{slot.event?.duration}</Text>
                            </View>

                            <Text style={styles.slotTitle}>{slot.event?.title}</Text>
                            <Text style={styles.slotMeta}>{slot.event?.meta}</Text>

                            {/* Meeting Prep shortcut inside timeline if it's a meeting */}
                            {slot.event?.type === 'meeting' && (
                              <Pressable
                                style={styles.inlinePrepLink}
                                onPress={() =>
                                  router.push({
                                    pathname: '/meeting-prep',
                                    params: {
                                      title: slot.event?.title,
                                      person: slot.event?.person || 'Katılımcı',
                                      time: slot.time,
                                    },
                                  } as any)
                                }
                              >
                                <Ionicons name="flash-outline" size={12} color={COLORS.primary} />
                                <Text style={styles.inlinePrepLinkText}>Hazırlık Notunu Gör</Text>
                              </Pressable>
                            )}
                          </View>
                        ) : (
                          <View style={styles.emptySlotPlaceholder}>
                            <Text style={styles.emptySlotText}>Boş Zaman Aralığı</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </>
        ) : (
          // --- WEEK VIEW (HAFTA GÖRÜNÜMÜ & TAKVİM ZEKÂSI) ---
          <View style={styles.weekViewContainer}>
            {/* Weekly Density Card */}
            <View style={styles.weekDensityCard}>
              <View style={styles.weekDensityHeader}>
                <Text style={styles.weekDensityTag}>7–13 EYLÜL · HAFTALIK YOĞUNLUK</Text>
                <Text style={styles.weekDensityStat}>18 Etkinlik</Text>
              </View>

              {/* Bar Chart Visualization */}
              <View style={styles.barChartRow}>
                {[
                  { day: 'Pzt', h1: 30, h2: 45, label: '3.5s' },
                  { day: 'Sal', h1: 60, h2: 25, label: '5.2s' },
                  { day: 'Çar', h1: 85, h2: 35, label: '6.8s' },
                  { day: 'Per', h1: 20, h2: 20, label: '2.0s' },
                  { day: 'Cum', h1: 45, h2: 30, label: '4.0s' },
                  { day: 'Cmt', h1: 0, h2: 15, label: '1.0s' },
                  { day: 'Paz', h1: 0, h2: 0, label: '0s' },
                ].map((item, i) => (
                  <View key={item.day} style={styles.barCol}>
                    <View style={styles.barTrack}>
                      <View style={[styles.barSegmentTop, { height: item.h1 }]} />
                      <View style={[styles.barSegmentBottom, { height: item.h2 }]} />
                    </View>
                    <Text style={[styles.barDayText, i === 2 && styles.barDayTextActive]}>
                      {item.day}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.chartLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendSquare, { backgroundColor: '#5B5CE2' }]} />
                  <Text style={styles.legendLabel}>Toplantı</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendSquare, { backgroundColor: '#D9D6F7' }]} />
                  <Text style={styles.legendLabel}>Odak Bloğu</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendSquare, { backgroundColor: '#F3B7AE' }]} />
                  <Text style={styles.legendLabel}>Yoğun</Text>
                </View>
              </View>
            </View>

            {/* Calendar Intelligence Insights */}
            <Text style={styles.sectionSubHeader}>HAFTALIK TAKVİM ZEKÂSI NOTLARI</Text>

            <View style={styles.insightCard}>
              <Ionicons name="sunny-outline" size={20} color={COLORS.warning} />
              <View style={{ flex: 1 }}>
                <Text style={styles.insightTitle}>Perşembe öğleden sonra tamamen boş</Text>
                <Text style={styles.insightBody}>
                  Saat 13:00'ten itibaren hiç toplantın yok. Derin odak gerektiren strateji ve kodlama işleri için mükemmel bir fırsat.
                </Text>
              </View>
            </View>

            <View style={styles.insightCard}>
              <Ionicons name="car-outline" size={20} color={COLORS.info} />
              <View style={{ flex: 1 }}>
                <Text style={styles.insightTitle}>Doktor randevusu için 12:50'de çıkmalısın</Text>
                <Text style={styles.insightBody}>
                  Kadıköy → Nişantaşı arası 38 dakika tahmini trafik. Randevu saati olan 13:30'a yetişmek için 12:50'de uyarılacaksın.
                </Text>
              </View>
            </View>

            <View style={styles.insightCard}>
              <Ionicons name="time-outline" size={20} color={COLORS.primary} />
              <View style={{ flex: 1 }}>
                <Text style={styles.insightTitle}>16:00 öncesi 45 dakika boşluk</Text>
                <Text style={styles.insightBody}>
                  Yatırımcı toplantısı öncesinde hazırlık notlarını ve finansal sunumu gözden geçirmek için ideal bir aralık.
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* --- PLAN CONFIRMATION BOTTOM SHEET MODAL (Madde 29) --- */}
      <Modal
        visible={showPlanModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPlanModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTitleRow}>
                <Ionicons name="sparkles" size={20} color={COLORS.primary} />
                <Text style={styles.modalTitle}>AI Takvim Planlaması</Text>
              </View>
              <Pressable
                onPress={() => setShowPlanModal(false)}
                style={styles.modalCloseBtn}
              >
                <Ionicons name="close" size={22} color={COLORS.inkSecondary} />
              </Pressable>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.planPreviewCard}>
                <Text style={styles.planPreviewTag}>ÖNERİLEN ZAMAN BLOĞU</Text>
                <Text style={styles.planPreviewTime}>Yarın · 14:00 – 16:30</Text>
                <Text style={styles.planPreviewTask}>Teklif Hazırlama Görevi</Text>
                <Text style={styles.planPreviewDesc}>
                  Yarın bu saat aralığında 2,5 saatlik kesintisiz boşluğun bulunuyor. Saat 17:00'deki Mehmet Yılmaz teklif taahhüdünü rahatça yetiştirmek için en uygun blok.
                </Text>
              </View>

              <View style={styles.approvalNoteBox}>
                <Ionicons name="shield-checkmark-outline" size={18} color={COLORS.primary} />
                <Text style={styles.approvalNoteText}>
                  Bu işlem onaylandığında Google Takvim'e odak bloğu olarak işlenecek ve Onay Merkezi geçmişine kaydedilecektir.
                </Text>
              </View>

              <View style={styles.modalButtonStack}>
                <Pressable
                  style={({ pressed }) => [styles.confirmPlanBtn, pressed && styles.pressed]}
                  onPress={handleConfirmPlan}
                >
                  <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
                  <Text style={styles.confirmPlanBtnText}>Takvime Yerleştir ve Onayla</Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [styles.cancelPlanBtn, pressed && styles.pressed]}
                  onPress={() => setShowPlanModal(false)}
                >
                  <Text style={styles.cancelPlanBtnText}>Vazgeç</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* --- CONFLICT RESOLUTION MODAL (Madde 24 & Master Design 5.3) --- */}
      <Modal
        visible={showConflictModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowConflictModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTitleRow}>
                <Ionicons name="alert-circle" size={20} color={COLORS.critical} />
                <Text style={styles.modalTitle}>Çakışmayı Nasıl Çözelim?</Text>
              </View>
              <Pressable
                onPress={() => setShowConflictModal(false)}
                style={styles.modalCloseBtn}
              >
                <Ionicons name="close" size={22} color={COLORS.inkSecondary} />
              </Pressable>
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.conflictModalIntro}>
                Seçtiğiniz çözüm doğrudan uygulanmaz, Onay Merkezi'ne sunulur:
              </Text>

              <Pressable
                style={styles.conflictOptionCard}
                onPress={() => handleResolveConflict('Doktor randevusunu 15:45\'e al')}
              >
                <View style={styles.optionIconBox}>
                  <Ionicons name="sparkles" size={16} color={COLORS.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.optionTitle}>Doktoru 15:45'e al</Text>
                  <Text style={styles.optionSubtitle}>
                    Önerilen · Klinikte 15:45 aralığı müsait görünüyor
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={COLORS.inkTertiary} />
              </Pressable>

              <Pressable
                style={styles.conflictOptionCard}
                onPress={() => handleResolveConflict('Toplantıyı 13:00\'e öner')}
              >
                <View style={styles.optionIconBox}>
                  <Ionicons name="repeat" size={16} color={COLORS.inkSecondary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.optionTitle}>Toplantıyı 13:00'e öner</Text>
                  <Text style={styles.optionSubtitle}>
                    Mehmet'e toplantı saati değişikliği e-posta taslağı hazırlanır
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={COLORS.inkTertiary} />
              </Pressable>

              <Pressable
                style={styles.conflictOptionCard}
                onPress={() => handleResolveConflict('Toplantıyı 30 dk kısalt')}
              >
                <View style={styles.optionIconBox}>
                  <Ionicons name="time-outline" size={16} color={COLORS.inkSecondary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.optionTitle}>Toplantıyı 30 dk kısalt</Text>
                  <Text style={styles.optionSubtitle}>
                    14:00–14:30 · Doktora zamanında yetişirsiniz
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={COLORS.inkTertiary} />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 36 : 14,
    paddingBottom: 10,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.ink,
    letterSpacing: -0.6,
  },
  headerDate: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.inkSecondary,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  approvalCenterShortcut: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  shieldIconBox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shortcutTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.ink,
  },
  shortcutSubtitle: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: '600',
  },
  toastContainer: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 45 : 55,
    left: 20,
    right: 20,
    backgroundColor: '#1E1E2F',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  segmentContainer: {
    paddingHorizontal: 20,
    marginVertical: 6,
  },
  segmentWrapper: {
    flexDirection: 'row',
    backgroundColor: '#E4E4F0',
    borderRadius: 12,
    padding: 3,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 10,
  },
  segmentBtnActive: {
    backgroundColor: COLORS.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  segmentBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.inkTertiary,
  },
  segmentBtnTextActive: {
    color: COLORS.ink,
    fontWeight: '700',
  },
  dateStripContainer: {
    paddingBottom: 8,
  },
  dateStripScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  dayCard: {
    width: 44,
    height: 64,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  dayCardActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.inkTertiary,
  },
  dayLabelActive: {
    color: 'rgba(255,255,255,0.85)',
  },
  dateCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateCircleActive: {
    backgroundColor: '#FFFFFF',
  },
  dateNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.ink,
  },
  dateNumberActive: {
    color: COLORS.primary,
  },
  todayIndicatorDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
  },
  todayIndicatorDotActive: {
    backgroundColor: '#FFFFFF',
  },
  mainScroll: {
    flex: 1,
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 40,
    gap: 16,
  },
  // --- AI SUGGESTED SCHEDULE (Madde 29) ---
  aiScheduleCard: {
    backgroundColor: '#EDEDFC',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(91,92,226,0.25)',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  aiTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  sparkleIcon: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiTagText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 0.6,
  },
  aiScheduleHeadline: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.ink,
    lineHeight: 23,
    letterSpacing: -0.2,
  },
  aiScheduleSubtext: {
    fontSize: 14,
    color: COLORS.inkSecondary,
    marginTop: 4,
    lineHeight: 20,
  },
  aiActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 14,
  },
  planCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  planCtaText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  planSecondaryBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(91,92,226,0.18)',
  },
  planSecondaryText: {
    color: COLORS.inkSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  plannedSuccessBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.successSoft,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BEE7CD',
  },
  plannedSuccessText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.success,
  },
  // --- CONFLICT CARD (Madde 24) ---
  conflictCard: {
    backgroundColor: COLORS.criticalSoft,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.criticalBorder,
  },
  conflictTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  conflictTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.critical,
    marginBottom: 2,
  },
  conflictDesc: {
    fontSize: 12,
    color: COLORS.inkSecondary,
    lineHeight: 17,
  },
  conflictResolveBtn: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.criticalBorder,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    alignSelf: 'center',
  },
  conflictResolveText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.critical,
  },
  // --- SECTION STYLES ---
  sectionContainer: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.ink,
    letterSpacing: -0.2,
  },
  countBadge: {
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  countBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  timelineHint: {
    fontSize: 12,
    color: COLORS.inkTertiary,
    fontWeight: '500',
  },
  // --- MEETINGS LIST & MEETING PREP BUTTON (Madde 25) ---
  meetingsList: {
    gap: 12,
  },
  meetingCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  meetingHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  meetingTagPill: {
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  meetingTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  meetingMetaRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  meetingMetaText: {
    fontSize: 12,
    color: COLORS.inkSecondary,
    fontWeight: '500',
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.ink,
    letterSpacing: -0.2,
    marginBottom: 8,
  },
  meetingPersonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  avatarCircleSmall: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#DCE4F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTextSmall: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2B3F73',
  },
  meetingPersonName: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.ink,
  },
  meetingPersonRole: {
    fontSize: 11,
    color: COLORS.inkTertiary,
  },
  meetingTimeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.surfaceSoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  meetingTimeText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
  },
  agendaBox: {
    backgroundColor: COLORS.surfaceSoft,
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  agendaLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.inkTertiary,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  agendaText: {
    fontSize: 12,
    color: COLORS.inkSecondary,
    lineHeight: 17,
  },
  // --- MANDATED MEETING PREP BUTTON ---
  meetingPrepBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 3,
  },
  prepBtnIconBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  meetingPrepBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
    marginLeft: 8,
  },
  // --- TIMELINE STYLES ---
  timelineContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  timelineRow: {
    flexDirection: 'row',
    minHeight: 64,
  },
  timeLabelBox: {
    width: 44,
    paddingTop: 6,
    alignItems: 'flex-start',
  },
  timeLabelText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.inkTertiary,
  },
  timelineLineColumn: {
    width: 20,
    alignItems: 'center',
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
    marginTop: 8,
  },
  timelineVerticalLine: {
    width: 1.5,
    flex: 1,
    backgroundColor: COLORS.borderLight,
  },
  slotContentArea: {
    flex: 1,
    paddingLeft: 8,
    paddingBottom: 10,
  },
  timelineEventCard: {
    backgroundColor: COLORS.surfaceSoft,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  timelineEventCardAi: {
    backgroundColor: '#F3F3FD',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
  },
  timelineEventCardPersonal: {
    backgroundColor: '#FDF8F0',
    borderColor: '#F0E6D8',
  },
  slotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  slotTypeBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.inkSecondary,
    letterSpacing: 0.4,
  },
  slotTypeBadgeAi: {
    color: COLORS.primary,
  },
  slotDuration: {
    fontSize: 11,
    color: COLORS.inkTertiary,
    fontWeight: '500',
  },
  slotTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.ink,
    letterSpacing: -0.1,
  },
  slotMeta: {
    fontSize: 12,
    color: COLORS.inkSecondary,
    marginTop: 2,
  },
  inlinePrepLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  inlinePrepLinkText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
  },
  emptySlotPlaceholder: {
    height: 36,
    justifyContent: 'center',
  },
  emptySlotText: {
    fontSize: 11,
    color: '#B5B5C8',
    fontStyle: 'italic',
  },
  // --- WEEK VIEW STYLES ---
  weekViewContainer: {
    gap: 16,
  },
  weekDensityCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  weekDensityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  weekDensityTag: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.inkTertiary,
    letterSpacing: 0.6,
  },
  weekDensityStat: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  barChartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 120,
    gap: 8,
    paddingBottom: 6,
  },
  barCol: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  barTrack: {
    width: 22,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: 2,
    marginBottom: 6,
  },
  barSegmentTop: {
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    width: '100%',
  },
  barSegmentBottom: {
    backgroundColor: '#D9D6F7',
    borderRadius: 4,
    width: '100%',
  },
  barDayText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.inkSecondary,
  },
  barDayTextActive: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 18,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendSquare: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
  legendLabel: {
    fontSize: 11,
    color: COLORS.inkSecondary,
    fontWeight: '500',
  },
  sectionSubHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.inkTertiary,
    letterSpacing: 0.6,
    marginTop: 4,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.ink,
    marginBottom: 3,
  },
  insightBody: {
    fontSize: 12,
    color: COLORS.inkSecondary,
    lineHeight: 18,
  },
  // --- MODAL STYLES ---
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15,15,26,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.ink,
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 14,
  },
  planPreviewCard: {
    backgroundColor: '#EDEDFC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(91,92,226,0.25)',
  },
  planPreviewTag: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  planPreviewTime: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.ink,
    letterSpacing: -0.2,
    marginBottom: 4,
  },
  planPreviewTask: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 8,
  },
  planPreviewDesc: {
    fontSize: 13,
    color: COLORS.inkSecondary,
    lineHeight: 18,
  },
  approvalNoteBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.surfaceSoft,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  approvalNoteText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.inkSecondary,
    lineHeight: 17,
  },
  modalButtonStack: {
    gap: 10,
    marginTop: 4,
  },
  confirmPlanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  confirmPlanBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  cancelPlanBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  cancelPlanBtnText: {
    color: COLORS.inkSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  conflictModalIntro: {
    fontSize: 13,
    color: COLORS.inkSecondary,
    marginBottom: 6,
    lineHeight: 18,
  },
  conflictOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.surfaceSoft,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  optionIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.ink,
  },
  optionSubtitle: {
    fontSize: 12,
    color: COLORS.inkSecondary,
    marginTop: 2,
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
});
