import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Design tokens
const COLORS = {
  primary: '#5B5CE2',
  primaryDark: '#4547C9',
  primarySoft: '#EDEDFC',
  background: '#F1F1F8',
  surface: '#FFFFFF',
  surfaceSecondary: '#F8F8FC',
  ink: '#0F0F1A',
  inkSecondary: '#6B6860',
  inkTertiary: '#9B978E',
  border: '#E8E8F0',
  critical: '#C7432F',
  criticalSoft: '#FCEDE9',
  warning: '#9A6300',
  warningSoft: '#FDF2DC',
  success: '#1E7A47',
  successSoft: '#E4F5EA',
  info: '#2262BE',
  infoSoft: '#E7F0FD',
};

interface PriorityItem {
  id: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  time: string;
  title: string;
  subtitle?: string;
  sourceIcon: string;
  sourceText: string;
  actionPrimary: { label: string; action: () => void };
  actionSecondary?: { label: string; action: () => void };
  whyImportant: string;
  completed: boolean;
}

export default function TodayScreen() {
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  const [activeItemForWhy, setActiveItemForWhy] = useState<PriorityItem | null>(null);
  const [reminderModalItem, setReminderModalItem] = useState<PriorityItem | null>(null);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => {
      setFeedbackToast(null);
    }, 3200);
  };

  const toggleComplete = (id: string, title: string) => {
    setCompletedMap(prev => {
      const next = !prev[id];
      if (next) {
        showToast(`✓ "${title.slice(0, 30)}..." tamamlandı olarak işaretlendi.`);
      }
      return { ...prev, [id]: next };
    });
  };

  const priorities: PriorityItem[] = [
    {
      id: 'p-1',
      badge: 'ACİL',
      badgeBg: COLORS.criticalSoft,
      badgeColor: COLORS.critical,
      time: '08:42',
      title: 'Ahmet senden bugün 17:00\'ye kadar revize teklif bekliyor.',
      sourceIcon: 'mail-outline',
      sourceText: 'Gmail · Ahmet Yılmaz · 08:42',
      actionPrimary: {
        label: 'Yanıtla',
        action: () => router.push('/email-detail?id=email-1'),
      },
      actionSecondary: {
        label: 'Hatırlat',
        action: () => setReminderModalItem(priorities[0]),
      },
      whyImportant: 'Bu e-postada Ahmet Yılmaz yönetim kurulu bütçe onayı için bugün 17:00\'ye kadar kesin teklif ve birim maliyet tablosu talep etmiştir.',
      completed: !!completedMap['p-1'],
    },
    {
      id: 'p-2',
      badge: 'TOPLANTI',
      badgeBg: '#F0EFEB',
      badgeColor: COLORS.inkSecondary,
      time: '14:30',
      title: '14:30 Mehmet ile müşteri toplantısı',
      subtitle: 'Son görüşmeniz 4 gün önceydi. Hazırlık notları ve 3 gündem maddesi hazır.',
      sourceIcon: 'calendar-outline',
      sourceText: 'Google Takvim · Müşteri toplantısı · 60 dk',
      actionPrimary: {
        label: 'Hazırlan',
        action: () => router.push('/meeting-prep'),
      },
      actionSecondary: {
        label: 'Katılımcılar',
        action: () => showToast('Katılımcılar: Mehmet Demir, Selin Kaya, Yunus Emre'),
      },
      whyImportant: 'Yeni sözleşme uzatımı ve SLA maddelerinin netleştirileceği kritik müşteri toplantısıdır.',
      completed: !!completedMap['p-2'],
    },
    {
      id: 'p-3',
      badge: 'SON TARİH',
      badgeBg: COLORS.warningSoft,
      badgeColor: COLORS.warning,
      time: '17:00',
      title: 'Girişim Hızlandırma Programı başvurusu bugün 17:00\'de kapanıyor.',
      sourceIcon: 'mail-outline',
      sourceText: 'Gmail · Girişim Programı · Dün 16:10',
      actionPrimary: {
        label: 'Takvime Ekle',
        action: () => showToast('Takviminize 16:00 için hazırlık bloğu eklendi.'),
      },
      actionSecondary: {
        label: 'Başvuruyu Aç',
        action: () => showToast('Başvuru formu bağlantısı açılıyor...'),
      },
      whyImportant: 'Son başvuru saati bugün 17:00 olarak belirtilmiştir. Kaçırılması halinde bir sonraki dönem 6 ay sonradır.',
      completed: !!completedMap['p-3'],
    },
    {
      id: 'p-4',
      badge: 'TAKİP',
      badgeBg: '#F0EFEB',
      badgeColor: COLORS.inkSecondary,
      time: '3 gün',
      title: 'Gönderdiğin teklif mailine 3 gündür cevap gelmedi.',
      subtitle: 'Mehmet Yılmaz\'a iletilen Teklif v2 dökümanı incelenmeyi bekliyor.',
      sourceIcon: 'send-outline',
      sourceText: 'Gmail · Mehmet Yılmaz · 2 Eyl',
      actionPrimary: {
        label: 'Takip Mesajı Hazırla',
        action: () => router.push('/approval-center'),
      },
      actionSecondary: {
        label: 'Yarın Hatırlat',
        action: () => showToast('Yarın sabah 09:00 için takip hatırlatması kuruldu.'),
      },
      whyImportant: 'Müşteri tekliflerine 72 saat içinde takip geçilmediğinde teklif kapanma oranı %40 düşmektedir.',
      completed: !!completedMap['p-4'],
    },
    {
      id: 'p-5',
      badge: 'KİŞİSEL',
      badgeBg: '#F0EFEB',
      badgeColor: COLORS.inkSecondary,
      time: 'Bugün',
      title: 'Trendyol siparişin bugün teslim ediliyor.',
      subtitle: 'Tahmini varış: 14:00 – 18:00 arası.',
      sourceIcon: 'cube-outline',
      sourceText: 'Kargo · Yurtiçi Kargo · Takip No: 482910',
      actionPrimary: {
        label: 'Kargo Takip',
        action: () => showToast('Kurye dağıtımda: 3 durak kaldı.'),
      },
      whyImportant: 'Kişisel kurye teslimatı iş saatleri içinde adreste bulunmanı gerektirir.',
      completed: !!completedMap['p-5'],
    },
  ];

  const pendingApprovalsCount = 2;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F1F1F8" />
      
      {/* Toast Banner */}
      {feedbackToast && (
        <View style={styles.toastContainer}>
          <Ionicons name="information-circle" size={18} color="#FFFFFF" />
          <Text style={styles.toastText}>{feedbackToast}</Text>
        </View>
      )}

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header: Date, Name, Approval Badge, Avatar */}
        <View style={styles.header}>
          <View>
            <Text style={styles.dateText}>16 EYLÜL SALI</Text>
            <Text style={styles.greetingText}>Günaydın, Yunus</Text>
          </View>
          <View style={styles.headerActions}>
            {pendingApprovalsCount > 0 && (
              <Pressable
                style={styles.approvalBadge}
                onPress={() => router.push('/approval-center')}
              >
                <Ionicons name="shield-checkmark" size={16} color={COLORS.primaryDark} />
                <Text style={styles.approvalBadgeText}>{pendingApprovalsCount} onay</Text>
              </Pressable>
            )}
            <Pressable
              style={styles.avatarButton}
              onPress={() => router.push('/paywall')}
            >
              <Text style={styles.avatarText}>Y</Text>
              <View style={styles.proPillMini}>
                <Text style={styles.proPillMiniText}>PRO</Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Hero Briefing Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroBadgeRow}>
            <View style={styles.aiSparkleIcon}>
              <Ionicons name="sparkles" size={14} color={COLORS.primary} />
            </View>
            <Text style={styles.heroBadgeText}>BRİFİNG HAZIR · 07:58</Text>
          </View>

          <Text style={styles.heroHeadline}>
            Bugün bilmen gereken <Text style={{ color: COLORS.primary }}>5</Text> şey var.
          </Text>

          <Text style={styles.heroContext}>
            3 önemli mail · 4 etkinlik · 2 takip
          </Text>

          <View style={styles.heroActionRow}>
            <Pressable
              style={styles.heroPrimaryBtn}
              onPress={() => router.push('/morning-briefing')}
            >
              <Ionicons name="newspaper-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.heroPrimaryBtnText}>Brifingimi Gör</Text>
            </Pressable>

            <Pressable
              style={styles.heroSecondaryBtn}
              onPress={() => router.push('/morning-briefing?autoPlay=true')}
            >
              <Ionicons name="play" size={17} color={COLORS.primaryDark} style={{ marginRight: 4 }} />
              <Text style={styles.heroSecondaryBtnText}>Dinle · 2 dk</Text>
            </Pressable>
          </View>
        </View>

        {/* Quick Capture Banner */}
        <Pressable
          style={styles.captureBanner}
          onPress={() => router.push('/universal-capture')}
        >
          <View style={styles.captureBannerIconWrap}>
            <Ionicons name="camera-outline" size={20} color={COLORS.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.captureBannerTitle}>Evrensel Yakalama</Text>
            <Text style={styles.captureBannerDesc}>Ekran görüntüsü, fatura veya not paylaş, AI takvime işlesin</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.inkTertiary} />
        </Pressable>

        {/* Section Header: Priorities */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>ÖNCELİKLERİN</Text>
          <Text style={styles.sectionCount}>
            {priorities.filter(p => !completedMap[p.id]).length} aktif konu
          </Text>
        </View>

        {/* Priority Cards List */}
        <View style={styles.priorityList}>
          {priorities.map((item) => {
            const isDone = completedMap[item.id];
            return (
              <View
                key={item.id}
                style={[
                  styles.priorityCard,
                  isDone && styles.priorityCardDone,
                ]}
              >
                {/* Card Top Row: Badge, Time, and Actions */}
                <View style={styles.cardTopRow}>
                  <View style={styles.cardBadgeWrap}>
                    <View style={[styles.badgePill, { backgroundColor: item.badgeBg }]}>
                      <Text style={[styles.badgeText, { color: item.badgeColor }]}>{item.badge}</Text>
                    </View>
                    <Text style={styles.cardTimeText}>{item.time}</Text>
                  </View>

                  <View style={styles.cardIconActions}>
                    <Pressable
                      hitSlop={8}
                      onPress={() => toggleComplete(item.id, item.title)}
                    >
                      <Ionicons
                        name={isDone ? "checkmark-circle" : "checkmark-circle-outline"}
                        size={22}
                        color={isDone ? COLORS.success : '#B8B4AA'}
                      />
                    </Pressable>
                    <Pressable
                      hitSlop={8}
                      onPress={() => setActiveItemForWhy(item)}
                      style={{ marginLeft: 12 }}
                    >
                      <Ionicons name="ellipsis-horizontal" size={20} color="#B8B4AA" />
                    </Pressable>
                  </View>
                </View>

                {/* Card Title */}
                <Text style={[styles.cardTitle, isDone && styles.cardTitleDone]}>
                  {item.title}
                </Text>

                {/* Optional Subtitle */}
                {item.subtitle && (
                  <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                )}

                {/* Source Line */}
                <View style={styles.sourceLine}>
                  <Ionicons name={item.sourceIcon} size={15} color={COLORS.inkTertiary} />
                  <Text style={styles.sourceText}>{item.sourceText}</Text>
                </View>

                {/* Actions Row */}
                {!isDone && (
                  <View style={styles.cardActionsRow}>
                    <Pressable
                      style={styles.cardActionPrimary}
                      onPress={item.actionPrimary.action}
                    >
                      <Text style={styles.cardActionPrimaryText}>
                        {item.actionPrimary.label}
                      </Text>
                    </Pressable>

                    {item.actionSecondary && (
                      <Pressable
                        style={styles.cardActionSecondary}
                        onPress={item.actionSecondary.action}
                      >
                        <Text style={styles.cardActionSecondaryText}>
                          {item.actionSecondary.label}
                        </Text>
                      </Pressable>
                    )}

                    <Pressable
                      style={styles.whyBtn}
                      onPress={() => setActiveItemForWhy(item)}
                    >
                      <Ionicons name="help-circle-outline" size={16} color={COLORS.inkTertiary} />
                    </Pressable>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Footer Meta */}
        <View style={styles.footerNote}>
          <Ionicons name="shield-checkmark-outline" size={14} color={COLORS.inkTertiary} />
          <Text style={styles.footerNoteText}>
            Tüm analizler cihazınız için optimize edilmiş modelle gerçekleştirildi
          </Text>
        </View>
      </ScrollView>

      {/* "Neden Önemli?" Modal (Madde 11) */}
      <Modal
        visible={activeItemForWhy !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveItemForWhy(null)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setActiveItemForWhy(null)}
        >
          <Pressable style={styles.bottomSheet} onPress={e => e.stopPropagation()}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetHeader}>
              <View style={styles.sparkleCircle}>
                <Ionicons name="sparkles" size={18} color={COLORS.primary} />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.sheetTitle}>Neden Önemli?</Text>
                <Text style={styles.sheetSubtitle}>Yapay Zekâ Öncelik Mantığı</Text>
              </View>
              <Pressable onPress={() => setActiveItemForWhy(null)}>
                <Ionicons name="close" size={22} color={COLORS.inkSecondary} />
              </Pressable>
            </View>

            <View style={styles.sheetContent}>
              <Text style={styles.sheetItemTitle}>{activeItemForWhy?.title}</Text>
              <View style={styles.sheetRationaleBox}>
                <Ionicons name="bulb-outline" size={18} color={COLORS.primary} style={{ marginTop: 2 }} />
                <Text style={styles.sheetRationaleText}>
                  {activeItemForWhy?.whyImportant}
                </Text>
              </View>

              <View style={styles.sheetActions}>
                <Pressable
                  style={styles.sheetFeedbackBtn}
                  onPress={() => {
                    showToast('Geri bildirim alındı: Benzer konular artık daha düşük öncelikle gösterilecek.');
                    setActiveItemForWhy(null);
                  }}
                >
                  <Ionicons name="thumbs-down-outline" size={17} color={COLORS.inkSecondary} />
                  <Text style={styles.sheetFeedbackBtnText}>Önemli Değil</Text>
                </Pressable>

                <Pressable
                  style={styles.sheetConfirmBtn}
                  onPress={() => setActiveItemForWhy(null)}
                >
                  <Text style={styles.sheetConfirmBtnText}>Anladım</Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Smart Reminder Modal (Madde 31) */}
      <Modal
        visible={reminderModalItem !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setReminderModalItem(null)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setReminderModalItem(null)}
        >
          <Pressable style={styles.bottomSheet} onPress={e => e.stopPropagation()}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Bunu ne zaman hatırlatayım?</Text>
            <Text style={styles.sheetSubtitle}>
              {reminderModalItem?.title.slice(0, 45)}...
            </Text>

            <View style={styles.reminderOptionsList}>
              {[
                { label: '30 dakika önce', sub: '16:30' },
                { label: '1 saat önce', sub: '16:00' },
                { label: 'Bu akşam', sub: '19:00 (Brifing saatin)' },
                { label: 'Yarın sabah', sub: '08:00' },
                { label: 'Uygun zamanda (AI Önerisi)', sub: 'Takvim boşluğuna göre: 15:30', smart: true },
              ].map((opt, idx) => (
                <Pressable
                  key={idx}
                  style={[styles.reminderOptionRow, opt.smart && styles.reminderOptionSmart]}
                  onPress={() => {
                    showToast(`Hatırlatıcı kuruldu: ${opt.label}`);
                    setReminderModalItem(null);
                  }}
                >
                  <Ionicons
                    name={opt.smart ? "sparkles" : "time-outline"}
                    size={20}
                    color={opt.smart ? COLORS.primary : COLORS.inkSecondary}
                  />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={[styles.reminderOptionTitle, opt.smart && { color: COLORS.primaryDark, fontWeight: '700' }]}>
                      {opt.label}
                    </Text>
                    <Text style={styles.reminderOptionSub}>{opt.sub}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#C9C5BC" />
                </Pressable>
              ))}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 36,
  },
  toastContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: COLORS.ink,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: COLORS.inkTertiary,
  },
  greetingText: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: -0.4,
    color: COLORS.ink,
    marginTop: 3,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  approvalBadge: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  approvalBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  avatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.ink,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  proPillMini: {
    position: 'absolute',
    bottom: -4,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 6,
  },
  proPillMiniText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
  },
  heroCard: {
    marginHorizontal: 20,
    marginTop: 4,
    padding: 22,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6E6FA',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  aiSparkleIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: COLORS.primary,
  },
  heroHeadline: {
    fontSize: 25,
    lineHeight: 32,
    fontWeight: '700',
    letterSpacing: -0.3,
    color: COLORS.ink,
    marginTop: 10,
  },
  heroContext: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.inkSecondary,
    marginTop: 6,
  },
  heroActionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  heroPrimaryBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroPrimaryBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  heroSecondaryBtn: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: COLORS.primarySoft,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroSecondaryBtnText: {
    color: COLORS.primaryDark,
    fontSize: 14,
    fontWeight: '600',
  },
  captureBanner: {
    marginHorizontal: 20,
    marginTop: 14,
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  captureBannerIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureBannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.ink,
  },
  captureBannerDesc: {
    fontSize: 12,
    color: COLORS.inkSecondary,
    marginTop: 2,
  },
  sectionHeader: {
    paddingHorizontal: 22,
    marginTop: 22,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: COLORS.inkTertiary,
  },
  sectionCount: {
    fontSize: 12,
    color: COLORS.inkTertiary,
  },
  priorityList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  priorityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECECF4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  priorityCardDone: {
    opacity: 0.55,
    backgroundColor: '#FAF9F8',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBadgeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badgePill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  cardTimeText: {
    fontSize: 12,
    color: COLORS.inkTertiary,
    fontWeight: '500',
  },
  cardIconActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    letterSpacing: -0.2,
    color: COLORS.ink,
    marginTop: 8,
  },
  cardTitleDone: {
    textDecorationLine: 'line-through',
    color: COLORS.inkTertiary,
  },
  cardSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.inkSecondary,
    marginTop: 4,
  },
  sourceLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },
  sourceText: {
    fontSize: 12,
    color: COLORS.inkTertiary,
  },
  cardActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F8',
  },
  cardActionPrimary: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: COLORS.primarySoft,
  },
  cardActionPrimaryText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  cardActionSecondary: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  cardActionSecondaryText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.inkSecondary,
  },
  whyBtn: {
    marginLeft: 'auto',
    padding: 6,
  },
  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 24,
    paddingHorizontal: 24,
  },
  footerNoteText: {
    fontSize: 12,
    color: COLORS.inkTertiary,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 15, 26, 0.45)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0DED7',
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sparkleCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.ink,
  },
  sheetSubtitle: {
    fontSize: 12,
    color: COLORS.inkSecondary,
    marginTop: 2,
  },
  sheetContent: {
    marginTop: 16,
  },
  sheetItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.ink,
  },
  sheetRationaleBox: {
    backgroundColor: '#F8F8FC',
    borderRadius: 14,
    padding: 14,
    marginTop: 12,
    flexDirection: 'row',
    gap: 10,
    borderWidth: 1,
    borderColor: '#ECECF8',
  },
  sheetRationaleText: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.inkSecondary,
    flex: 1,
  },
  sheetActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  sheetFeedbackBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F0EFEB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  sheetFeedbackBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.inkSecondary,
  },
  sheetConfirmBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetConfirmBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  reminderOptionsList: {
    marginTop: 16,
  },
  reminderOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F8',
  },
  reminderOptionSmart: {
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderTopWidth: 0,
    marginVertical: 4,
  },
  reminderOptionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.ink,
  },
  reminderOptionSub: {
    fontSize: 12,
    color: COLORS.inkTertiary,
    marginTop: 1,
  },
});
