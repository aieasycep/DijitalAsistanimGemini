import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
  Animated,
  Platform,
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
  successBorder: '#BEE7CD',
  info: '#2262BE',
  infoSoft: '#E7F0FD',
};

// --- DATA TYPES ---
export type ApprovalType = 'email' | 'calendar' | 'reminder' | 'move_event';

export interface PendingAction {
  id: string;
  type: ApprovalType;
  typeBadge: string;
  typeIcon: string;
  title: string;
  what: string;
  why: string;
  source: string;
  sourceType: 'mail' | 'calendar' | 'system';
  exactChange: string;
  timeAgo: string;
  status: 'pending' | 'approved' | 'rejected';
  resolvedAt?: string;
  editedNote?: string;
}

// Initial Mock Pending Actions (Master Prompt Madde 29, 30, 31, 35)
const INITIAL_ACTIONS: PendingAction[] = [
  {
    id: 'appr-1',
    type: 'email',
    typeBadge: 'E-POSTA TASLAĞI',
    typeIcon: 'mail-outline',
    title: "Ahmet Yılmaz'a Revize Teklif",
    what: "Ahmet Yılmaz'a revize fiyat ve teslimat teklifi e-postası gönder",
    why: "Dünkü toplantı ve gelen e-postada 17:00'ye kadar revize teklif beklediğini belirtti. Gecikme müşteri memnuniyetsizliği doğurabilir.",
    source: "Gmail · 'Revize Teklif Talebi' konulu e-posta (Dün 18:42)",
    sourceType: 'mail',
    exactChange: `Alıcı: ahmet.yilmaz@acme.com\nKonu: Re: Revize Teklif ve Teslimat Takvimi\n\n"Merhaba Ahmet Bey,\n\nGörüşmemize istinaden hazırladığımız revize teklifi ekte paylaşıyorum. Üretim planımıza göre 6 Ekim teslimat tarihi üzerinde mutabık kalabiliriz. %8 indirim revizyonumuz da fiyata yansıtılmıştır.\n\nİyi çalışmalar dilerim,\nMehmet"`,
    timeAgo: '12 dk önce',
    status: 'pending',
  },
  {
    id: 'appr-2',
    type: 'calendar',
    typeBadge: 'TAKVİM ETKİNLİĞİ',
    typeIcon: 'calendar-outline',
    title: '"Teklif Hazırlama" Odak Bloğu',
    what: '"Teklif Hazırlama" görevi için takvimde odak bloğu oluştur — Yarın 14:00–16:30',
    why: "Yarın öğleden sonraki 2,5 saatlik boşlukta teklifi tamamlamak, akşamki 17:00 teslim taahhüdünü risksiz karşılamanı sağlar.",
    source: "Google Calendar · Takvim Zekâsı boşluk analizi",
    sourceType: 'calendar',
    exactChange: `Takvim: İş Takvimi (Google Calendar)\nBaşlık: ✨ Teklif Hazırlama (AI Görev Bloğu)\nTarih: Yarın · 14:00 – 16:30 (150 dk)\nHatırlatıcı: 15 dakika önce\nDurum: Meşgul (Dış davetlere kapalı)`,
    timeAgo: '25 dk önce',
    status: 'pending',
  },
  {
    id: 'appr-3',
    type: 'reminder',
    typeBadge: 'AKILLI HATIRLATICI',
    typeIcon: 'notifications-outline',
    title: 'Elektrik Faturası Ödemesi',
    what: 'Elektrik faturası son ödeme tarihi için telefon hatırlatması kur — 10 Eylül 09:00',
    why: "Son ödeme tarihi 10 Eylül; gecikme zammı ve kesinti riskini engellemek için mesai başlangıcında uyarılmanız önerildi.",
    source: "Enerjisa E-Fatura e-postası (28 Ağustos · Tutar: 1.842 TL)",
    sourceType: 'mail',
    exactChange: `Kanal: Cihaz Bildirimi + Akıllı Asistan Özeti\nZaman: 10 Eylül · 09:00\nBildirim Metni: "Elektrik faturası bugün son gün — Tutar: 1.842 TL. Otomatik ödeme talimatınız bulunmuyor."`,
    timeAgo: '1 saat önce',
    status: 'pending',
  },
  {
    id: 'appr-4',
    type: 'move_event',
    typeBadge: 'TOPLANTI TAŞIMA',
    typeIcon: 'swap-horizontal-outline',
    title: 'Ekip Senkronizasyonunu Kaydır',
    what: 'Ekip Senkronizasyonu toplantısını 10:00 yerine 10:15\'e kaydır',
    why: "09:00 toplantınız 10:00'da bittiği için arka arkaya aralıksız geçişi önlemek ve 15 dk nefes payı sağlamak.",
    source: "Google Calendar çakışma ve mola optimizasyonu",
    sourceType: 'calendar',
    exactChange: `Etkinlik: Haftalık Ekip Senkronizasyonu\nEski Saat: 10:00 – 10:45\nYeni Saat: 10:15 – 11:00 (+15 dk)\nKatılımcılar: 4 kişi (Güncelleme bildirimi iletilecek)`,
    timeAgo: '2 saat önce',
    status: 'pending',
  },
];

export default function ApprovalCenterScreen() {
  const [actions, setActions] = useState<PendingAction[]>(INITIAL_ACTIONS);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'email' | 'calendar' | 'reminder'>('all');
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');

  // Edit Modal State
  const [editingItem, setEditingItem] = useState<PendingAction | null>(null);
  const [editChangeText, setEditChangeText] = useState('');
  const [editWhatText, setEditWhatText] = useState('');

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Filtered lists
  const pendingActions = useMemo(() => {
    return actions.filter((a) => a.status === 'pending');
  }, [actions]);

  const historyActions = useMemo(() => {
    return actions.filter((a) => a.status !== 'pending');
  }, [actions]);

  const displayedList = useMemo(() => {
    const baseList = activeTab === 'pending' ? pendingActions : historyActions;
    if (selectedFilter === 'all') return baseList;
    if (selectedFilter === 'calendar') {
      return baseList.filter((a) => a.type === 'calendar' || a.type === 'move_event');
    }
    return baseList.filter((a) => a.type === selectedFilter);
  }, [activeTab, pendingActions, historyActions, selectedFilter]);

  // Action handlers
  const handleApprove = (id: string) => {
    const item = actions.find((a) => a.id === id);
    setActions((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: 'approved', resolvedAt: 'Az önce' } : a
      )
    );
    showToast(`✅ "${item?.title || 'İşlem'}" başarıyla onaylandı ve uygulandı.`);
  };

  const handleReject = (id: string) => {
    const item = actions.find((a) => a.id === id);
    setActions((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: 'rejected', resolvedAt: 'Az önce' } : a
      )
    );
    showToast(`🚫 "${item?.title || 'İşlem'}" reddedildi.`);
  };

  const handleApproveAll = () => {
    setActions((prev) =>
      prev.map((a) =>
        a.status === 'pending'
          ? { ...a, status: 'approved', resolvedAt: 'Az önce' }
          : a
      )
    );
    showToast('🎉 Bekleyen tüm işlemler onaylandı!');
  };

  const openEditModal = (item: PendingAction) => {
    setEditingItem(item);
    setEditWhatText(item.what);
    setEditChangeText(item.exactChange);
  };

  const handleSaveAndApprove = () => {
    if (!editingItem) return;
    setActions((prev) =>
      prev.map((a) =>
        a.id === editingItem.id
          ? {
              ...a,
              what: editWhatText,
              exactChange: editChangeText,
              status: 'approved',
              resolvedAt: 'Düzenlendi ve onaylandı',
            }
          : a
      )
    );
    setEditingItem(null);
    showToast(`✏️ Düzenleme kaydedildi ve onaylandı.`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* --- TOP HEADER --- */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable
            style={({ pressed }) => [styles.backButton, pressed && styles.buttonPressed]}
            onPress={() => router.back()}
            accessibilityLabel="Geri Dön"
          >
            <Ionicons name="arrow-back" size={22} color={COLORS.ink} />
          </Pressable>
          <View>
            <View style={styles.titleRow}>
              <Text style={styles.headerTitle}>Onay Merkezi</Text>
              {pendingActions.length > 0 && (
                <View style={styles.badgePill}>
                  <Text style={styles.badgePillText}>{pendingActions.length}</Text>
                </View>
              )}
            </View>
            <Text style={styles.headerSubtitle}>
              Kontrol sende · AI iznin olmadan hiçbir yazma işlemi yapmaz
            </Text>
          </View>
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

      {/* --- MAIN TABS: Bekleyenler / Geçmiş --- */}
      <View style={styles.tabBarContainer}>
        <View style={styles.tabSegment}>
          <Pressable
            style={[styles.segmentBtn, activeTab === 'pending' && styles.segmentBtnActive]}
            onPress={() => setActiveTab('pending')}
          >
            <Ionicons
              name="hourglass-outline"
              size={15}
              color={activeTab === 'pending' ? COLORS.primary : COLORS.inkTertiary}
            />
            <Text
              style={[
                styles.segmentText,
                activeTab === 'pending' && styles.segmentTextActive,
              ]}
            >
              Bekleyenler ({pendingActions.length})
            </Text>
          </Pressable>

          <Pressable
            style={[styles.segmentBtn, activeTab === 'history' && styles.segmentBtnActive]}
            onPress={() => setActiveTab('history')}
          >
            <Ionicons
              name="checkmark-done-outline"
              size={15}
              color={activeTab === 'history' ? COLORS.primary : COLORS.inkTertiary}
            />
            <Text
              style={[
                styles.segmentText,
                activeTab === 'history' && styles.segmentTextActive,
              ]}
            >
              Geçmiş ({historyActions.length})
            </Text>
          </Pressable>
        </View>
      </View>

      {/* --- CATEGORY FILTERS & BULK ACTIONS --- */}
      <View style={styles.filterRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          <Pressable
            style={[styles.filterChip, selectedFilter === 'all' && styles.filterChipActive]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedFilter === 'all' && styles.filterChipTextActive,
              ]}
            >
              Tümü
            </Text>
          </Pressable>

          <Pressable
            style={[styles.filterChip, selectedFilter === 'email' && styles.filterChipActive]}
            onPress={() => setSelectedFilter('email')}
          >
            <Ionicons
              name="mail-outline"
              size={13}
              color={selectedFilter === 'email' ? COLORS.primary : COLORS.inkSecondary}
              style={{ marginRight: 4 }}
            />
            <Text
              style={[
                styles.filterChipText,
                selectedFilter === 'email' && styles.filterChipTextActive,
              ]}
            >
              E-posta
            </Text>
          </Pressable>

          <Pressable
            style={[styles.filterChip, selectedFilter === 'calendar' && styles.filterChipActive]}
            onPress={() => setSelectedFilter('calendar')}
          >
            <Ionicons
              name="calendar-outline"
              size={13}
              color={selectedFilter === 'calendar' ? COLORS.primary : COLORS.inkSecondary}
              style={{ marginRight: 4 }}
            />
            <Text
              style={[
                styles.filterChipText,
                selectedFilter === 'calendar' && styles.filterChipTextActive,
              ]}
            >
              Takvim
            </Text>
          </Pressable>

          <Pressable
            style={[styles.filterChip, selectedFilter === 'reminder' && styles.filterChipActive]}
            onPress={() => setSelectedFilter('reminder')}
          >
            <Ionicons
              name="notifications-outline"
              size={13}
              color={selectedFilter === 'reminder' ? COLORS.primary : COLORS.inkSecondary}
              style={{ marginRight: 4 }}
            />
            <Text
              style={[
                styles.filterChipText,
                selectedFilter === 'reminder' && styles.filterChipTextActive,
              ]}
            >
              Hatırlatıcı
            </Text>
          </Pressable>
        </ScrollView>

        {activeTab === 'pending' && pendingActions.length > 1 && (
          <Pressable
            style={({ pressed }) => [styles.bulkApproveBtn, pressed && styles.buttonPressed]}
            onPress={handleApproveAll}
          >
            <Ionicons name="checkbox-outline" size={14} color="#FFFFFF" />
            <Text style={styles.bulkApproveText}>Tümünü Onayla</Text>
          </Pressable>
        )}
      </View>

      {/* --- SCROLLABLE ACTIONS LIST --- */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {displayedList.length === 0 ? (
          // --- EMPTY STATE ---
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons
                name={activeTab === 'pending' ? 'shield-checkmark' : 'folder-open-outline'}
                size={42}
                color={COLORS.primary}
              />
            </View>
            <Text style={styles.emptyTitle}>
              {activeTab === 'pending'
                ? 'Tüm İşlemler Güncel!'
                : 'Geçmiş Kayıt Bulunmuyor'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {activeTab === 'pending'
                ? 'Şu anda onayını bekleyen hiçbir yapay zekâ işlemi bulunmuyor. Yeni bir e-posta taslağı, takvim önerisi veya görev tespit edildiğinde burada onayına sunulacak.'
                : 'Onayladığın veya reddettiğin işlemler burada arşivlenir.'}
            </Text>
            {activeTab === 'pending' && (
              <Pressable
                style={({ pressed }) => [styles.returnPlanBtn, pressed && styles.buttonPressed]}
                onPress={() => router.push('/(tabs)/plan' as any)}
              >
                <Ionicons name="calendar-outline" size={16} color="#FFFFFF" />
                <Text style={styles.returnPlanBtnText}>Plan Sekmesine Git</Text>
              </Pressable>
            )}
          </View>
        ) : (
          // --- CARDS LIST ---
          displayedList.map((item) => {
            const isApproved = item.status === 'approved';
            const isRejected = item.status === 'rejected';

            return (
              <View key={item.id} style={styles.card}>
                {/* 1. Header Row: Type Badge + Time Ago */}
                <View style={styles.cardHeaderRow}>
                  <View style={styles.typeBadgeContainer}>
                    <View style={styles.typeIconBox}>
                      <Ionicons name={item.typeIcon} size={15} color={COLORS.primary} />
                    </View>
                    <Text style={styles.typeBadgeText}>{item.typeBadge}</Text>
                  </View>

                  <View style={styles.cardHeaderRight}>
                    {item.status === 'pending' ? (
                      <Text style={styles.timeAgoText}>{item.timeAgo}</Text>
                    ) : (
                      <View
                        style={[
                          styles.statusTag,
                          isApproved ? styles.statusTagApproved : styles.statusTagRejected,
                        ]}
                      >
                        <Ionicons
                          name={isApproved ? 'checkmark' : 'close'}
                          size={12}
                          color={isApproved ? COLORS.success : COLORS.critical}
                        />
                        <Text
                          style={[
                            styles.statusTagText,
                            isApproved ? styles.statusTextApproved : styles.statusTextRejected,
                          ]}
                        >
                          {isApproved ? 'Onaylandı' : 'Reddedildi'}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* 2. Title & What */}
                <View style={styles.cardSection}>
                  <Text style={styles.sectionLabel}>NE YAPILACAK</Text>
                  <Text style={styles.whatText}>{item.what}</Text>
                </View>

                {/* 3. Why */}
                <View style={styles.cardSection}>
                  <Text style={styles.sectionLabel}>NEDEN</Text>
                  <Text style={styles.whyText}>{item.why}</Text>
                </View>

                {/* 4. Source */}
                <View style={styles.cardSection}>
                  <Text style={styles.sectionLabel}>KAYNAK</Text>
                  <View style={styles.sourcePill}>
                    <Ionicons
                      name={
                        item.sourceType === 'mail'
                          ? 'mail'
                          : item.sourceType === 'calendar'
                          ? 'calendar'
                          : 'sparkles'
                      }
                      size={13}
                      color={COLORS.inkSecondary}
                    />
                    <Text style={styles.sourcePillText}>{item.source}</Text>
                  </View>
                </View>

                {/* 5. Exact Change (Tam Değişiklik) */}
                <View style={styles.changeBox}>
                  <View style={styles.changeHeader}>
                    <Ionicons name="code-slash-outline" size={14} color={COLORS.primary} />
                    <Text style={styles.changeLabel}>TAM DEĞİŞİKLİK (EXACT CHANGE)</Text>
                  </View>
                  <Text style={styles.changeBodyText}>{item.exactChange}</Text>
                </View>

                {/* 6. Action Buttons (Only when pending) */}
                {item.status === 'pending' ? (
                  <View style={styles.actionRow}>
                    {/* Onayla Button */}
                    <Pressable
                      style={({ pressed }) => [
                        styles.approveBtn,
                        pressed && styles.buttonPressed,
                      ]}
                      onPress={() => handleApprove(item.id)}
                    >
                      <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                      <Text style={styles.approveBtnText}>Onayla</Text>
                    </Pressable>

                    {/* Düzenle Button */}
                    <Pressable
                      style={({ pressed }) => [
                        styles.editBtn,
                        pressed && styles.buttonPressed,
                      ]}
                      onPress={() => openEditModal(item)}
                    >
                      <Ionicons name="pencil-outline" size={16} color={COLORS.inkSecondary} />
                      <Text style={styles.editBtnText}>Düzenle</Text>
                    </Pressable>

                    {/* Reddet Button */}
                    <Pressable
                      style={({ pressed }) => [
                        styles.rejectBtn,
                        pressed && styles.buttonPressed,
                      ]}
                      onPress={() => handleReject(item.id)}
                    >
                      <Ionicons name="close" size={16} color={COLORS.critical} />
                      <Text style={styles.rejectBtnText}>Reddet</Text>
                    </Pressable>
                  </View>
                ) : (
                  <View style={styles.resolvedFooter}>
                    <Text style={styles.resolvedFooterText}>
                      {item.resolvedAt ? `${item.resolvedAt} işlem yapıldı.` : ''}
                    </Text>
                  </View>
                )}
              </View>
            );
          })
        )}
      </ScrollView>

      {/* --- EDIT MODAL (DÜZENLE) --- */}
      <Modal
        visible={editingItem !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditingItem(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTitleRow}>
                <Ionicons name="create-outline" size={20} color={COLORS.primary} />
                <Text style={styles.modalTitle}>İşlemi Düzenle</Text>
              </View>
              <Pressable
                onPress={() => setEditingItem(null)}
                style={({ pressed }) => [styles.modalCloseBtn, pressed && styles.buttonPressed]}
              >
                <Ionicons name="close" size={22} color={COLORS.inkSecondary} />
              </Pressable>
            </View>

            <ScrollView style={styles.modalScroll}>
              <Text style={styles.modalHelpText}>
                AI'ın gerçekleştireceği eylemi ve metni dilediğiniz gibi güncelleyebilirsiniz.
              </Text>

              {/* Title / What Input */}
              <Text style={styles.inputLabel}>EYLEM TANIMI (NE YAPILACAK)</Text>
              <TextInput
                style={styles.textInputSingle}
                value={editWhatText}
                onChangeText={setEditWhatText}
                placeholder="Eylemi tanımlayın..."
                placeholderTextColor={COLORS.inkTertiary}
              />

              {/* Exact Change Input */}
              <Text style={styles.inputLabel}>TAM DEĞİŞİKLİK METNİ</Text>
              <TextInput
                style={styles.textInputMulti}
                value={editChangeText}
                onChangeText={setEditChangeText}
                multiline
                numberOfLines={7}
                placeholder="E-posta metni, takvim saatleri veya bildirim detayları..."
                placeholderTextColor={COLORS.inkTertiary}
              />
            </ScrollView>

            {/* Modal Actions */}
            <View style={styles.modalActionRow}>
              <Pressable
                style={({ pressed }) => [styles.modalCancelBtn, pressed && styles.buttonPressed]}
                onPress={() => setEditingItem(null)}
              >
                <Text style={styles.modalCancelBtnText}>İptal</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [styles.modalSaveBtn, pressed && styles.buttonPressed]}
                onPress={handleSaveAndApprove}
              >
                <Ionicons name="checkmark-circle-outline" size={18} color="#FFFFFF" />
                <Text style={styles.modalSaveBtnText}>Kaydet ve Onayla</Text>
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
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 36 : 14,
    paddingBottom: 12,
    backgroundColor: COLORS.background,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.ink,
    letterSpacing: -0.5,
  },
  badgePill: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgePillText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 13,
    color: COLORS.inkSecondary,
    marginTop: 3,
    lineHeight: 18,
    maxWidth: 270,
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
  tabBarContainer: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  tabSegment: {
    flexDirection: 'row',
    backgroundColor: '#E5E5F0',
    borderRadius: 14,
    padding: 3,
  },
  segmentBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    borderRadius: 11,
  },
  segmentBtnActive: {
    backgroundColor: COLORS.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.inkTertiary,
  },
  segmentTextActive: {
    color: COLORS.ink,
    fontWeight: '700',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 6,
    gap: 8,
  },
  filterScroll: {
    gap: 8,
    paddingRight: 10,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.primarySoft,
    borderColor: COLORS.primary,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.inkSecondary,
  },
  filterChipTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  bulkApproveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 12,
  },
  bulkApproveText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
    gap: 16,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#0F0F1A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  typeBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  typeIconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  cardHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeAgoText: {
    fontSize: 12,
    color: COLORS.inkTertiary,
    fontWeight: '500',
  },
  statusTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusTagApproved: {
    backgroundColor: COLORS.successSoft,
  },
  statusTagRejected: {
    backgroundColor: COLORS.criticalSoft,
  },
  statusTagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusTextApproved: {
    color: COLORS.success,
  },
  statusTextRejected: {
    color: COLORS.critical,
  },
  cardSection: {
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.inkTertiary,
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  whatText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.ink,
    lineHeight: 21,
  },
  whyText: {
    fontSize: 13,
    color: COLORS.inkSecondary,
    lineHeight: 19,
  },
  sourcePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.surfaceSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  sourcePillText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.inkSecondary,
  },
  changeBox: {
    backgroundColor: '#F8F8FD',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E8E8FA',
    marginBottom: 16,
  },
  changeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  changeLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  changeBodyText: {
    fontSize: 13,
    color: '#262638',
    lineHeight: 19,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  approveBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 14,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  approveBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  editBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: COLORS.surfaceSoft,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 12,
    borderRadius: 14,
  },
  editBtnText: {
    color: COLORS.inkSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  rejectBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: COLORS.criticalSoft,
    borderWidth: 1,
    borderColor: COLORS.criticalBorder,
    paddingVertical: 12,
    borderRadius: 14,
  },
  rejectBtnText: {
    color: COLORS.critical,
    fontSize: 13,
    fontWeight: '600',
  },
  resolvedFooter: {
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  resolvedFooterText: {
    fontSize: 12,
    color: COLORS.inkTertiary,
    fontStyle: 'italic',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.ink,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.inkSecondary,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 24,
  },
  returnPlanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
  },
  returnPlanBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
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
    maxHeight: '85%',
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
  modalScroll: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  modalHelpText: {
    fontSize: 13,
    color: COLORS.inkSecondary,
    marginBottom: 16,
    lineHeight: 18,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.inkTertiary,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  textInputSingle: {
    backgroundColor: COLORS.surfaceSoft,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.ink,
    marginBottom: 16,
  },
  textInputMulti: {
    backgroundColor: COLORS.surfaceSoft,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 13,
    color: COLORS.ink,
    lineHeight: 19,
    minHeight: 140,
    textAlignVertical: 'top',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginBottom: 20,
  },
  modalActionRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
  },
  modalCancelBtn: {
    flex: 1,
    backgroundColor: COLORS.surfaceSoft,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.inkSecondary,
  },
  modalSaveBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  modalSaveBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
