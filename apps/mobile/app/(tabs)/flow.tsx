import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  RefreshControl,
  Modal,
  Platform,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  MOCK_FEED_ITEMS,
  FeedCardItem,
  FeedItemType,
  PriorityLevel,
  MeetingData,
  DeadlineData,
  FollowupData,
} from '../../data/mockFeed';

type FilterTab = 'Tümü' | 'Önemli' | 'Mail' | 'Takvim' | 'Takip';

const FILTERS: FilterTab[] = ['Tümü', 'Önemli', 'Mail', 'Takvim', 'Takip'];

export default function FlowScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('Tümü');
  const [refreshing, setRefreshing] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Active modal state for non-email cards
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingData | null>(null);
  const [selectedDeadline, setSelectedDeadline] = useState<DeadlineData | null>(null);
  const [selectedFollowup, setSelectedFollowup] = useState<FollowupData | null>(null);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      showNotice('Akış güncellendi · Tüm kaynaklar senkronize');
    }, 800);
  };

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => {
      setActionNotice(null);
    }, 2800);
  };

  // Filter feed items according to activeFilter
  const filteredItems = useMemo(() => {
    return MOCK_FEED_ITEMS.filter((item) => {
      if (activeFilter === 'Tümü') return true;
      if (activeFilter === 'Önemli') {
        return item.priority === 'critical' || item.priority === 'deadline';
      }
      if (activeFilter === 'Mail') return item.type === 'email';
      if (activeFilter === 'Takvim') return item.type === 'meeting';
      if (activeFilter === 'Takip') return item.type === 'followup' || item.type === 'deadline';
      return true;
    });
  }, [activeFilter]);

  // Priority count badges
  const counts = useMemo(() => {
    return {
      all: MOCK_FEED_ITEMS.length,
      important: MOCK_FEED_ITEMS.filter(
        (i) => i.priority === 'critical' || i.priority === 'deadline'
      ).length,
      email: MOCK_FEED_ITEMS.filter((i) => i.type === 'email').length,
      meeting: MOCK_FEED_ITEMS.filter((i) => i.type === 'meeting').length,
      followup: MOCK_FEED_ITEMS.filter(
        (i) => i.type === 'followup' || i.type === 'deadline'
      ).length,
    };
  }, []);

  const handleCardPress = (item: FeedCardItem) => {
    if (item.type === 'email') {
      router.push({
        pathname: '/email-detail',
        params: { id: item.emailRefId || 'email-1' },
      } as any);
    } else if (item.type === 'meeting' && item.meetingData) {
      setSelectedMeeting(item.meetingData);
    } else if (item.type === 'deadline' && item.deadlineData) {
      setSelectedDeadline(item.deadlineData);
    } else if (item.type === 'followup' && item.followupData) {
      setSelectedFollowup(item.followupData);
    }
  };

  const handleActionPress = (item: FeedCardItem, e: any) => {
    e?.stopPropagation?.();
    if (item.type === 'email') {
      router.push({
        pathname: '/email-detail',
        params: { id: item.emailRefId || 'email-1' },
      } as any);
    } else if (item.type === 'meeting' && item.meetingData) {
      setSelectedMeeting(item.meetingData);
    } else if (item.type === 'deadline') {
      showNotice(`✅ ${item.title} için son tarih takvime işlendi.`);
    } else if (item.type === 'followup') {
      showNotice(`🔔 ${item.title} için nazik hatırlatma taslağı oluşturuldu.`);
    }
  };

  // Helper to render type-specific icon & colors
  const getItemVisuals = (type: FeedItemType, priority: PriorityLevel) => {
    switch (type) {
      case 'email':
        return {
          icon: 'mail-outline' as const,
          bgColor: '#EEF0FF',
          iconColor: '#5B5CE2',
          typeLabel: 'E-POSTA',
        };
      case 'meeting':
        return {
          icon: 'calendar-outline' as const,
          bgColor: '#E6F4EA',
          iconColor: '#137333',
          typeLabel: 'TOPLANTI',
        };
      case 'deadline':
        return {
          icon: 'alarm-outline' as const,
          bgColor: '#FEF3D6',
          iconColor: '#B06000',
          typeLabel: 'SON TARİH',
        };
      case 'followup':
        return {
          icon: 'arrow-redo-outline' as const,
          bgColor: '#F3E8FF',
          iconColor: '#7C3AED',
          typeLabel: 'TAKİP',
        };
      default:
        return {
          icon: 'notifications-outline' as const,
          bgColor: '#EDEDFC',
          iconColor: '#5B5CE2',
          typeLabel: 'BİLDİRİM',
        };
    }
  };

  // Helper for priority badge colors
  const getBadgeColors = (priority: PriorityLevel) => {
    switch (priority) {
      case 'critical':
        return { bg: '#FCEDE9', text: '#C7432F', border: '#F8D3CE' };
      case 'deadline':
        return { bg: '#F5EEFC', text: '#6D28D9', border: '#E9D5FF' };
      case 'upcoming':
        return { bg: '#FEF3C7', text: '#92400E', border: '#FDE68A' };
      case 'info':
        return { bg: '#EFF6FF', text: '#1D4ED8', border: '#DBEAFE' };
      default:
        return { bg: '#F1F1F8', text: '#6B6860', border: '#E8E8F0' };
    }
  };

  return (
    <View style={styles.container}>
      {/* Toast Notice */}
      {actionNotice && (
        <View style={styles.noticeToast}>
          <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.noticeToastText}>{actionNotice}</Text>
        </View>
      )}

      {/* Header Area */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <View style={styles.headerTitleRow}>
              <Text style={styles.headerTitle}>Akış</Text>
              <View style={styles.livePulseDot} />
            </View>
            <Text style={styles.headerSubtitle}>Akıllı Dikkat Akışı · Smart Feed</Text>
          </View>
          <TouchableOpacity
            style={styles.summaryButton}
            onPress={() => {
              Alert.alert(
                'Mail & Akış Zekası',
                'Bugün 83 e-posta tarandı.\n\n• 4 tanesi yanıt bekliyor\n• 2 adet toplantı hazırlığı var\n• 2 kritik son tarih yaklaşıyor',
                [{ text: 'Tamam' }]
              );
            }}
            activeOpacity={0.7}
          >
            <Ionicons name="sparkles" size={14} color="#5B5CE2" style={{ marginRight: 5 }} />
            <Text style={styles.summaryButtonText}>Özet (6)</Text>
          </TouchableOpacity>
        </View>

        {/* AI Smart Feed Banner */}
        <View style={styles.aiBanner}>
          <View style={styles.aiBannerIconWrapper}>
            <Ionicons name="bulb-outline" size={20} color="#5B5CE2" />
          </View>
          <View style={styles.aiBannerContent}>
            <Text style={styles.aiBannerTitle}>Günün Odak Noktaları</Text>
            <Text style={styles.aiBannerBody}>
              Bugün 17:00'ye kadar Ahmet Bey'in revize teklifi ve TÜBİTAK proje teslimi öncelikli.
            </Text>
          </View>
        </View>

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {FILTERS.map((filter) => {
            const isSelected = activeFilter === filter;
            let count = counts.all;
            if (filter === 'Önemli') count = counts.important;
            if (filter === 'Mail') count = counts.email;
            if (filter === 'Takvim') count = counts.meeting;
            if (filter === 'Takip') count = counts.followup;

            return (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterChip,
                  isSelected && styles.filterChipActive,
                ]}
                onPress={() => setActiveFilter(filter)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    isSelected && styles.filterChipTextActive,
                  ]}
                >
                  {filter}
                </Text>
                <View
                  style={[
                    styles.filterCountBadge,
                    isSelected && styles.filterCountBadgeActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterCountText,
                      isSelected && styles.filterCountTextActive,
                    ]}
                  >
                    {count}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Feed Cards List */}
      <ScrollView
        style={styles.feedList}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#5B5CE2"
            colors={['#5B5CE2']}
          />
        }
      >
        {filteredItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="checkmark-done-circle-outline" size={56} color="#A0A0B2" />
            <Text style={styles.emptyTitle}>Bu filtrede bekleyen konu yok</Text>
            <Text style={styles.emptySubtitle}>
              Tüm öncelikler kontrol edildi veya henüz yeni bir bildirim yok.
            </Text>
          </View>
        ) : (
          filteredItems.map((item) => {
            const visuals = getItemVisuals(item.type, item.priority);
            const badge = getBadgeColors(item.priority);

            return (
              <Pressable
                key={item.id}
                style={({ pressed }) => [
                  styles.card,
                  pressed && styles.cardPressed,
                  item.priority === 'critical' && styles.cardCriticalBorder,
                ]}
                onPress={() => handleCardPress(item)}
              >
                {/* Top Row: Type, Badge, Time */}
                <View style={styles.cardHeaderRow}>
                  <View style={styles.cardHeaderLeft}>
                    <View style={[styles.typeIconBox, { backgroundColor: visuals.bgColor }]}>
                      <Ionicons name={visuals.icon} size={18} color={visuals.iconColor} />
                    </View>
                    <View>
                      <Text style={styles.typeLabel}>{visuals.typeLabel}</Text>
                      <Text style={styles.sourceText}>{item.source}</Text>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.priorityBadge,
                      { backgroundColor: badge.bg, borderColor: badge.border },
                    ]}
                  >
                    <Text style={[styles.priorityBadgeText, { color: badge.text }]}>
                      {item.badgeText}
                    </Text>
                  </View>
                </View>

                {/* Card Title & AI Summary */}
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSummary}>{item.summary}</Text>

                {/* Footer: Details hint & Suggested Action Button */}
                <View style={styles.cardFooter}>
                  <View style={styles.footerLeft}>
                    <Ionicons name="time-outline" size={13} color="#9B978E" />
                    <Text style={styles.timeText}>{item.time}</Text>
                    {item.type === 'email' && (
                      <View style={styles.emailHintPill}>
                        <Ionicons name="sparkles" size={10} color="#5B5CE2" />
                        <Text style={styles.emailHintText}>AI Özeti Hazır</Text>
                      </View>
                    )}
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      item.priority === 'critical' && styles.actionButtonCritical,
                    ]}
                    onPress={(e) => handleActionPress(item, e)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.actionButtonText,
                        item.priority === 'critical' && styles.actionButtonTextCritical,
                      ]}
                    >
                      {item.actionText}
                    </Text>
                    <Ionicons
                      name={item.type === 'email' ? 'chevron-forward' : 'arrow-forward'}
                      size={13}
                      color={item.priority === 'critical' ? '#FFFFFF' : '#5B5CE2'}
                      style={{ marginLeft: 3 }}
                    />
                  </TouchableOpacity>
                </View>
              </Pressable>
            );
          })
        )}
      </ScrollView>

      {/* --- MODAL: Toplantı Detayı --- */}
      <Modal
        visible={!!selectedMeeting}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedMeeting(null)}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalDismissArea} onPress={() => setSelectedMeeting(null)} />
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <View style={styles.modalHeaderRow}>
              <View style={[styles.modalIconBox, { backgroundColor: '#E6F4EA' }]}>
                <Ionicons name="videocam" size={24} color="#137333" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalPreTitle}>TOPLANTI HAZIRLIĞI</Text>
                <Text style={styles.modalTitle}>{selectedMeeting?.title}</Text>
              </View>
            </View>

            <View style={styles.modalMetaBox}>
              <View style={styles.metaRow}>
                <Ionicons name="person-outline" size={16} color="#6B6860" />
                <Text style={styles.metaLabel}>Katılımcı:</Text>
                <Text style={styles.metaValue}>{selectedMeeting?.person}</Text>
              </View>
              <View style={styles.metaRow}>
                <Ionicons name="time-outline" size={16} color="#6B6860" />
                <Text style={styles.metaLabel}>Saat:</Text>
                <Text style={styles.metaValue}>
                  {selectedMeeting?.time} ({selectedMeeting?.duration})
                </Text>
              </View>
              <View style={styles.metaRow}>
                <Ionicons name="link-outline" size={16} color="#6B6860" />
                <Text style={styles.metaLabel}>Platform:</Text>
                <Text style={styles.metaValue}>{selectedMeeting?.platform}</Text>
              </View>
            </View>

            <Text style={styles.sectionHeaderTitle}>Önerilen Gündem & Notlar</Text>
            {selectedMeeting?.agenda.map((ag, idx) => (
              <View key={idx} style={styles.agendaItemRow}>
                <Ionicons name="checkmark-circle" size={16} color="#137333" style={{ marginRight: 8 }} />
                <Text style={styles.agendaItemText}>{ag}</Text>
              </View>
            ))}

            <View style={styles.modalActionButtons}>
              <TouchableOpacity
                style={styles.modalPrimaryBtn}
                onPress={() => {
                  setSelectedMeeting(null);
                  showNotice('Google Meet bağlantısı açılıyor...');
                }}
              >
                <Ionicons name="videocam-outline" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.modalPrimaryBtnText}>Toplantıya Katıl</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSecondaryBtn}
                onPress={() => {
                  setSelectedMeeting(null);
                  showNotice('Toplantı hazırlık notları Asistan sekmesine aktarıldı.');
                }}
              >
                <Text style={styles.modalSecondaryBtnText}>Hazırlık Brifingi Al</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* --- MODAL: Son Tarih (Deadline) Detayı --- */}
      <Modal
        visible={!!selectedDeadline}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedDeadline(null)}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalDismissArea} onPress={() => setSelectedDeadline(null)} />
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <View style={styles.modalHeaderRow}>
              <View style={[styles.modalIconBox, { backgroundColor: '#FEF3D6' }]}>
                <Ionicons name="alert-circle" size={24} color="#B06000" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalPreTitle}>SON TARİH UYARISI</Text>
                <Text style={styles.modalTitle}>{selectedDeadline?.title}</Text>
              </View>
            </View>

            <View style={styles.modalAlertCard}>
              <Ionicons name="alarm" size={22} color="#B06000" style={{ marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.modalAlertCardTitle}>
                  Son Saat: {selectedDeadline?.dueTime} ({selectedDeadline?.dueDate})
                </Text>
                <Text style={styles.modalAlertCardSubtitle}>
                  {selectedDeadline?.summary}
                </Text>
              </View>
            </View>

            <View style={styles.modalActionButtons}>
              <TouchableOpacity
                style={[styles.modalPrimaryBtn, { backgroundColor: '#B06000' }]}
                onPress={() => {
                  setSelectedDeadline(null);
                  showNotice('İlgili işlem portalına yönlendiriliyor...');
                }}
              >
                <Ionicons name="open-outline" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.modalPrimaryBtnText}>{selectedDeadline?.suggestedAction || 'İşlemi Tamamla'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSecondaryBtn}
                onPress={() => {
                  setSelectedDeadline(null);
                  showNotice('Son tarih takvimine kaydedildi.');
                }}
              >
                <Text style={styles.modalSecondaryBtnText}>Takvime Ekle & Hatırlat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* --- MODAL: Takip (Followup) Detayı --- */}
      <Modal
        visible={!!selectedFollowup}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedFollowup(null)}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalDismissArea} onPress={() => setSelectedFollowup(null)} />
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <View style={styles.modalHeaderRow}>
              <View style={[styles.modalIconBox, { backgroundColor: '#F3E8FF' }]}>
                <Ionicons name="paper-plane" size={22} color="#7C3AED" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalPreTitle}>AKILLI TAKİP</Text>
                <Text style={styles.modalTitle}>{selectedFollowup?.person}</Text>
              </View>
            </View>

            <View style={styles.modalAlertCard}>
              <Ionicons name="chatbox-ellipses-outline" size={20} color="#7C3AED" style={{ marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.modalAlertCardTitle}>Konu: {selectedFollowup?.subject}</Text>
                <Text style={styles.modalAlertCardSubtitle}>{selectedFollowup?.summary}</Text>
              </View>
            </View>

            <View style={styles.modalActionButtons}>
              <TouchableOpacity
                style={[styles.modalPrimaryBtn, { backgroundColor: '#7C3AED' }]}
                onPress={() => {
                  setSelectedFollowup(null);
                  showNotice('Nazik takip mesajı WhatsApp ve E-Posta taslağına eklendi.');
                }}
              >
                <Ionicons name="send" size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.modalPrimaryBtnText}>Nazik Hatırlatma Gönder</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSecondaryBtn}
                onPress={() => {
                  setSelectedFollowup(null);
                  showNotice('Takip 2 gün sonraya ertelendi.');
                }}
              >
                <Text style={styles.modalSecondaryBtnText}>2 Gün Sonra Tekrar Hatırlat</Text>
              </TouchableOpacity>
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
    backgroundColor: '#F1F1F8',
  },
  noticeToast: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 56 : 36,
    left: 20,
    right: 20,
    zIndex: 9999,
    backgroundColor: '#1E1E4C',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  noticeToastText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'ios' ? 56 : 40,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8F0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F0F1A',
    letterSpacing: -0.5,
  },
  livePulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#5B5CE2',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#6B6860',
    marginTop: 2,
    fontWeight: '500',
  },
  summaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEDFC',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D4D5F8',
  },
  summaryButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#5B5CE2',
  },
  aiBanner: {
    marginHorizontal: 20,
    marginBottom: 14,
    backgroundColor: '#F7F6FD',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E2F8',
  },
  aiBannerIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#5B5CE2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  aiBannerContent: {
    flex: 1,
  },
  aiBannerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#5B5CE2',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  aiBannerBody: {
    fontSize: 13,
    color: '#1A1917',
    lineHeight: 18,
    fontWeight: '500',
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F8',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  filterChipActive: {
    backgroundColor: '#5B5CE2',
    borderColor: '#5B5CE2',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B6860',
    marginRight: 6,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  filterCountBadge: {
    backgroundColor: '#E8E8F0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 18,
    alignItems: 'center',
  },
  filterCountBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  filterCountText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B6860',
  },
  filterCountTextActive: {
    color: '#FFFFFF',
  },
  feedList: {
    flex: 1,
  },
  feedContent: {
    padding: 16,
    paddingBottom: 40,
    gap: 12,
  },
  card: {
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
  cardPressed: {
    opacity: 0.94,
    transform: [{ scale: 0.995 }],
  },
  cardCriticalBorder: {
    borderLeftWidth: 4,
    borderLeftColor: '#C7432F',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  typeIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#9B978E',
    letterSpacing: 0.4,
  },
  sourceText: {
    fontSize: 12,
    color: '#6B6860',
    fontWeight: '500',
  },
  priorityBadge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  priorityBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F0F1A',
    marginBottom: 6,
    lineHeight: 22,
  },
  cardSummary: {
    fontSize: 14,
    color: '#4A4843',
    lineHeight: 20,
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F8',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  timeText: {
    fontSize: 12,
    color: '#9B978E',
    fontWeight: '500',
  },
  emailHintPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEDFC',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
    gap: 3,
  },
  emailHintText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#5B5CE2',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEDFC',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionButtonCritical: {
    backgroundColor: '#C7432F',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#5B5CE2',
  },
  actionButtonTextCritical: {
    color: '#FFFFFF',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1917',
    marginTop: 12,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#9B978E',
    textAlign: 'center',
    lineHeight: 18,
  },
  // --- Modal Styles ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 15, 26, 0.55)',
    justifyContent: 'flex-end',
  },
  modalDismissArea: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E8E8F0',
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  modalIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPreTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#9B978E',
    letterSpacing: 0.5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F0F1A',
    marginTop: 2,
  },
  modalMetaBox: {
    backgroundColor: '#F8F8FC',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    gap: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaLabel: {
    fontSize: 13,
    color: '#6B6860',
    fontWeight: '500',
    width: 80,
  },
  metaValue: {
    fontSize: 13,
    color: '#0F0F1A',
    fontWeight: '600',
    flex: 1,
  },
  sectionHeaderTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B6860',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  agendaItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  agendaItemText: {
    fontSize: 14,
    color: '#1A1917',
    flex: 1,
  },
  modalAlertCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFBEB',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEF3C7',
    marginBottom: 20,
  },
  modalAlertCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 4,
  },
  modalAlertCardSubtitle: {
    fontSize: 13,
    color: '#78350F',
    lineHeight: 18,
  },
  modalActionButtons: {
    gap: 10,
    marginTop: 14,
  },
  modalPrimaryBtn: {
    backgroundColor: '#5B5CE2',
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPrimaryBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  modalSecondaryBtn: {
    backgroundColor: '#F1F1F8',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalSecondaryBtnText: {
    color: '#4A4843',
    fontSize: 14,
    fontWeight: '600',
  },
});
