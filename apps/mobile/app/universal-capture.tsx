import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  primary: '#5B5CE2',
  primaryDark: '#4547C9',
  primarySoft: '#EDEDFC',
  background: '#F5F4F0',
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
};

type CaptureMode = 'screenshot' | 'photo' | 'pdf' | 'link' | 'note';

export default function UniversalCaptureScreen() {
  const [selectedMode, setSelectedMode] = useState<CaptureMode>('screenshot');
  const [noteText, setNoteText] = useState<string>('');
  const [reminderModalVisible, setReminderModalVisible] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 3200);
  };

  const handleAddToCalendar = () => {
    showToast('✓ "Konser · Zorlu PSM" 12 Eylül 20:00 olarak takviminize işlendi.');
    setTimeout(() => {
      router.back();
    }, 1500);
  };

  const handleCreateReminder = (when: string) => {
    setReminderModalVisible(false);
    showToast(`✓ Akıllı hatırlatıcı kuruldu: ${when}`);
    setTimeout(() => {
      router.back();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F4F0" />

      {/* Floating Toast Notification */}
      {toastMsg && (
        <View style={styles.toast}>
          <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
          <Text style={styles.toastText}>{toastMsg}</Text>
        </View>
      )}

      {/* Top Bar */}
      <View style={styles.topBar}>
        <Pressable
          style={styles.circleCloseBtn}
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={20} color={COLORS.ink} />
        </Pressable>
        <Text style={styles.topBarTitle}>EVRENSEL YAKALAMA</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Source Tabs */}
        <View style={styles.tabGrid}>
          <Pressable
            style={[styles.tabItem, selectedMode === 'photo' && styles.tabItemActive]}
            onPress={() => setSelectedMode('photo')}
          >
            <Ionicons
              name="camera-outline"
              size={22}
              color={selectedMode === 'photo' ? COLORS.primaryDark : COLORS.inkSecondary}
            />
            <Text style={[styles.tabItemLabel, selectedMode === 'photo' && styles.tabItemLabelActive]}>
              Fotoğraf
            </Text>
          </Pressable>

          <Pressable
            style={[styles.tabItem, selectedMode === 'screenshot' && styles.tabItemActive]}
            onPress={() => setSelectedMode('screenshot')}
          >
            <Ionicons
              name="phone-portrait-outline"
              size={22}
              color={selectedMode === 'screenshot' ? COLORS.primaryDark : COLORS.inkSecondary}
            />
            <Text style={[styles.tabItemLabel, selectedMode === 'screenshot' && styles.tabItemLabelActive]}>
              Ekran Görüntüsü
            </Text>
          </Pressable>

          <Pressable
            style={[styles.tabItem, selectedMode === 'pdf' && styles.tabItemActive]}
            onPress={() => setSelectedMode('pdf')}
          >
            <Ionicons
              name="document-text-outline"
              size={22}
              color={selectedMode === 'pdf' ? COLORS.primaryDark : COLORS.inkSecondary}
            />
            <Text style={[styles.tabItemLabel, selectedMode === 'pdf' && styles.tabItemLabelActive]}>
              PDF / Belge
            </Text>
          </Pressable>

          <Pressable
            style={[styles.tabItem, selectedMode === 'link' && styles.tabItemActive]}
            onPress={() => setSelectedMode('link')}
          >
            <Ionicons
              name="link-outline"
              size={22}
              color={selectedMode === 'link' ? COLORS.primaryDark : COLORS.inkSecondary}
            />
            <Text style={[styles.tabItemLabel, selectedMode === 'link' && styles.tabItemLabelActive]}>
              Bağlantı
            </Text>
          </Pressable>
        </View>

        {/* Dynamic Preview Area based on selected mode */}
        {selectedMode === 'screenshot' && (
          <View style={styles.previewContainer}>
            <View style={styles.previewMockImage}>
              <View style={styles.screenshotMockBadge}>
                <Ionicons name="image-outline" size={16} color={COLORS.inkSecondary} />
                <Text style={styles.screenshotMockText}>ekran görüntüsü · konser afişi</Text>
              </View>

              {/* Bounding Box Simulation (Design 4.10) */}
              <View style={styles.boundingBoxOverlay}>
                <View style={styles.boundingTag}>
                  <Text style={styles.boundingTagText}>TARİH · YER</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {selectedMode === 'photo' && (
          <View style={styles.previewContainer}>
            <View style={[styles.previewMockImage, { height: 160 }]}>
              <View style={styles.screenshotMockBadge}>
                <Ionicons name="receipt-outline" size={16} color={COLORS.inkSecondary} />
                <Text style={styles.screenshotMockText}>fotoğraf · CK Enerji elektrik faturası</Text>
              </View>
              <View style={[styles.boundingBoxOverlay, { top: 60, height: 44 }]}>
                <View style={styles.boundingTag}>
                  <Text style={styles.boundingTagText}>TUTAR · SON GÜN</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {selectedMode === 'pdf' && (
          <View style={styles.previewContainer}>
            <View style={[styles.previewMockImage, { height: 140 }]}>
              <View style={styles.screenshotMockBadge}>
                <Ionicons name="document-attach-outline" size={16} color={COLORS.inkSecondary} />
                <Text style={styles.screenshotMockText}>Hizmet_Sozlesmesi_Ek_Protokol_v2.pdf</Text>
              </View>
              <Text style={{ fontSize: 11, color: COLORS.inkTertiary, marginTop: 8 }}>
                3 sayfa · 12 madde analiz edildi
              </Text>
            </View>
          </View>
        )}

        {selectedMode === 'link' && (
          <View style={styles.previewContainer}>
            <View style={[styles.previewMockImage, { height: 130 }]}>
              <View style={styles.screenshotMockBadge}>
                <Ionicons name="globe-outline" size={16} color={COLORS.inkSecondary} />
                <Text style={styles.screenshotMockText}>https://etkinlik.zorlupsm.com/event/9482</Text>
              </View>
              <Text style={{ fontSize: 11, color: COLORS.inkTertiary, marginTop: 8 }}>
                Web içeriği ayrıştırıldı · Etkinlik meta verisi çıkarıldı
              </Text>
            </View>
          </View>
        )}

        {/* AI Extracted Entity Card */}
        {selectedMode === 'photo' ? (
          <View style={styles.entityCard}>
            <View style={styles.entityCardHeader}>
              <Ionicons name="sparkles" size={16} color={COLORS.primary} />
              <Text style={styles.entityCardBadge}>FATURA TESPİT EDİLDİ</Text>
            </View>

            <View style={styles.billTitleRow}>
              <Text style={styles.entityCardTitle}>Elektrik · CK Enerji</Text>
              <Text style={styles.billAmount}>1.842 TL</Text>
            </View>

            <View style={styles.entityChipsRow}>
              <View style={styles.entityChip}>
                <Ionicons name="calendar-outline" size={14} color={COLORS.inkSecondary} />
                <Text style={styles.entityChipText}>Son Gün: 15 Eylül</Text>
              </View>
              <View style={styles.entityChip}>
                <Ionicons name="card-outline" size={14} color={COLORS.inkSecondary} />
                <Text style={styles.entityChipText}>Abone No: 4821</Text>
              </View>
            </View>

            <Text style={styles.entityCardAdvice}>
              Son ödeme tarihi dün geçmişti. Gecikme faizi ve kesinti riski olmaması için bugün ödemeniz önerilir.
            </Text>
          </View>
        ) : selectedMode === 'pdf' ? (
          <View style={styles.entityCard}>
            <View style={styles.entityCardHeader}>
              <Ionicons name="sparkles" size={16} color={COLORS.primary} />
              <Text style={styles.entityCardBadge}>SÖZLEŞME VE TAAHHÜT TESPİT EDİLDİ</Text>
            </View>

            <Text style={styles.entityCardTitle}>Sözleşme Revizyonu · 4. Madde</Text>

            <View style={styles.entityChipsRow}>
              <View style={styles.entityChip}>
                <Ionicons name="hand-left-outline" size={14} color={COLORS.inkSecondary} />
                <Text style={styles.entityChipText}>30 Gün İhbar Süresi</Text>
              </View>
              <View style={styles.entityChip}>
                <Ionicons name="cash-outline" size={14} color={COLORS.inkSecondary} />
                <Text style={styles.entityChipText}>%10 Cezai Şart</Text>
              </View>
            </View>

            <Text style={styles.entityCardAdvice}>
              Hukuk ekibinin ilettiği şerh hükümleri içerikte yer almaktadır. Onay listenize işlenebilir.
            </Text>
          </View>
        ) : (
          <View style={styles.entityCard}>
            <View style={styles.entityCardHeader}>
              <Ionicons name="sparkles" size={16} color={COLORS.primary} />
              <Text style={styles.entityCardBadge}>ETKİNLİK TESPİT EDİLDİ</Text>
            </View>

            <Text style={styles.entityCardTitle}>Konser · Zorlu PSM</Text>

            <View style={styles.entityChipsRow}>
              <View style={styles.entityChip}>
                <Ionicons name="calendar-outline" size={14} color={COLORS.inkSecondary} />
                <Text style={styles.entityChipText}>12 Eylül</Text>
              </View>
              <View style={styles.entityChip}>
                <Ionicons name="time-outline" size={14} color={COLORS.inkSecondary} />
                <Text style={styles.entityChipText}>20:00</Text>
              </View>
              <View style={styles.entityChip}>
                <Ionicons name="location-outline" size={14} color={COLORS.inkSecondary} />
                <Text style={styles.entityChipText}>Zorlu PSM</Text>
              </View>
            </View>

            <Text style={styles.entityCardAdvice}>
              O akşam takvimin tamamen boş. Maslak trafiği nedeniyle 19:10'da çıkman gerekebilir.
            </Text>
          </View>
        )}

        {/* User Optional Note / Prompt Input */}
        <View style={styles.noteInputCard}>
          <Ionicons name="create-outline" size={18} color={COLORS.inkTertiary} />
          <TextInput
            style={styles.noteTextInput}
            placeholder="İsteğe bağlı not veya talimat ekle… (örn. Ayşe'ye de ilet)"
            placeholderTextColor={COLORS.inkTertiary}
            value={noteText}
            onChangeText={setNoteText}
          />
        </View>

        {/* Quick Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <Pressable
            style={styles.primaryActionBtn}
            onPress={handleAddToCalendar}
          >
            <Ionicons name="calendar" size={18} color="#FFFFFF" />
            <Text style={styles.primaryActionBtnText}>
              {selectedMode === 'photo' ? 'Hatırlatıcı Oluştur' : 'Takvime Ekle'}
            </Text>
          </Pressable>

          <Pressable
            style={styles.secondaryActionBtn}
            onPress={() => setReminderModalVisible(true)}
          >
            <Ionicons name="alarm-outline" size={18} color={COLORS.ink} />
            <Text style={styles.secondaryActionBtnText}>Hatırlat</Text>
          </Pressable>
        </View>

        {/* Information Callout */}
        <View style={styles.bottomInfoCallout}>
          <Ionicons name="share-social-outline" size={16} color={COLORS.inkTertiary} />
          <Text style={styles.bottomInfoCalloutText}>
            iOS Paylaşım menüsünden (Share Sheet) de herhangi bir görseli veya bağlantıyı Dijital Asistan'a doğrudan gönderebilirsin.
          </Text>
        </View>
      </ScrollView>

      {/* Smart Reminder Bottom Sheet (Design 4.11) */}
      <Modal
        visible={reminderModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setReminderModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setReminderModalVisible(false)}
        >
          <Pressable style={styles.bottomSheet} onPress={e => e.stopPropagation()}>
            <View style={styles.sheetHandle} />

            <Text style={styles.sheetTitle}>Ne zaman hatırlatayım?</Text>
            <Text style={styles.sheetSubtitle}>
              {selectedMode === 'photo' ? 'Elektrik faturası · Son ödeme 15 Eylül' : 'Konser · Zorlu PSM (12 Eylül)'}
            </Text>

            <View style={styles.reminderOptions}>
              <Pressable
                style={styles.reminderRow}
                onPress={() => handleCreateReminder('30 dakika önce')}
              >
                <Ionicons name="time-outline" size={20} color={COLORS.inkSecondary} />
                <Text style={styles.reminderRowLabel}>30 dakika önce</Text>
                <Text style={styles.reminderRowVal}>—</Text>
              </Pressable>

              <Pressable
                style={styles.reminderRow}
                onPress={() => handleCreateReminder('1 saat önce')}
              >
                <Ionicons name="time-outline" size={20} color={COLORS.inkSecondary} />
                <Text style={styles.reminderRowLabel}>1 saat önce</Text>
                <Text style={styles.reminderRowVal}>—</Text>
              </Pressable>

              <Pressable
                style={styles.reminderRow}
                onPress={() => handleCreateReminder('Bu akşam 19:00')}
              >
                <Ionicons name="moon-outline" size={20} color={COLORS.inkSecondary} />
                <Text style={styles.reminderRowLabel}>Bu akşam</Text>
                <Text style={styles.reminderRowVal}>19:00</Text>
              </Pressable>

              <Pressable
                style={styles.reminderRow}
                onPress={() => handleCreateReminder('Yarın sabah 08:00')}
              >
                <Ionicons name="sunny-outline" size={20} color={COLORS.inkSecondary} />
                <Text style={styles.reminderRowLabel}>Yarın sabah</Text>
                <Text style={styles.reminderRowVal}>08:00</Text>
              </Pressable>

              {/* AI Smart Suggestion Highlighted Row */}
              <Pressable
                style={styles.smartReminderRow}
                onPress={() => handleCreateReminder('Takvimine göre: 13 Eylül Cumartesi 10:00')}
              >
                <Ionicons name="sparkles" size={20} color={COLORS.primary} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.smartReminderTitle}>Uygun zamanda (AI Önerisi)</Text>
                  <Text style={styles.smartReminderSub}>
                    Takvimine göre: 13 Eylül Cumartesi 10:00
                  </Text>
                </View>
                <Ionicons name="checkmark-circle" size={22} color={COLORS.primary} />
              </Pressable>
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
  toast: {
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
  topBar: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circleCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  topBarTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: COLORS.inkTertiary,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  tabGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tabItem: {
    flex: 1,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  tabItemActive: {
    backgroundColor: COLORS.primarySoft,
  },
  tabItemLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.inkSecondary,
  },
  tabItemLabelActive: {
    color: COLORS.primaryDark,
    fontWeight: '700',
  },
  previewContainer: {
    marginBottom: 16,
  },
  previewMockImage: {
    height: 190,
    borderRadius: 20,
    backgroundColor: '#E7E5DF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DFDCD4',
  },
  screenshotMockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  screenshotMockText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.inkSecondary,
  },
  boundingBoxOverlay: {
    position: 'absolute',
    left: 20,
    right: 20,
    top: 50,
    height: 48,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 10,
  },
  boundingTag: {
    position: 'absolute',
    left: 0,
    top: -16,
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  boundingTagText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: COLORS.primary,
  },
  entityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E6E6FA',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
    marginBottom: 16,
  },
  entityCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  entityCardBadge: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
    color: COLORS.primary,
  },
  entityCardTitle: {
    fontSize: 21,
    lineHeight: 28,
    fontWeight: '700',
    letterSpacing: -0.3,
    color: COLORS.ink,
    marginTop: 8,
  },
  billTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 8,
  },
  billAmount: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.ink,
  },
  entityChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  entityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 30,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: '#F0EFEB',
  },
  entityChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.inkSecondary,
  },
  entityCardAdvice: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.inkSecondary,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F8',
  },
  noteInputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#ECECF4',
    marginBottom: 20,
  },
  noteTextInput: {
    flex: 1,
    fontSize: 13,
    color: COLORS.ink,
    paddingVertical: 0,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  primaryActionBtn: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  primaryActionBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryActionBtn: {
    height: 52,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  secondaryActionBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.ink,
  },
  bottomInfoCallout: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 6,
  },
  bottomInfoCalloutText: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.inkTertiary,
    flex: 1,
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
    paddingBottom: 44,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0DED7',
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.2,
    color: COLORS.ink,
  },
  sheetSubtitle: {
    fontSize: 13,
    color: COLORS.inkSecondary,
    marginTop: 3,
    marginBottom: 14,
  },
  reminderOptions: {
    gap: 2,
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F8',
    gap: 12,
  },
  reminderRowLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.ink,
  },
  reminderRowVal: {
    fontSize: 13,
    color: COLORS.inkTertiary,
  },
  smartReminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 62,
    borderRadius: 14,
    backgroundColor: '#F7F7FE',
    paddingHorizontal: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#EDEDFC',
  },
  smartReminderTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.ink,
  },
  smartReminderSub: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primaryDark,
    marginTop: 2,
  },
});
