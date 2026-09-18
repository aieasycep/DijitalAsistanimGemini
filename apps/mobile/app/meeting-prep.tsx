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
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// --- THEME TOKENS ---
const COLORS = {
  primary: '#5B5CE2',
  primarySoft: '#EDEDFC',
  background: '#F1F1F8',
  surface: '#FFFFFF',
  surfaceSoft: '#F8F8FC',
  darkSurface: '#1A1917',
  ink: '#0F0F1A',
  inkSecondary: '#6B6860',
  inkTertiary: '#9B978E',
  border: '#E8E8F0',
  borderLight: '#F2F2F8',
  warning: '#9A6300',
  warningSoft: '#FDF2DC',
  success: '#1E7A47',
  successSoft: '#E4F5EA',
};

export default function MeetingPrepScreen() {
  const params = useLocalSearchParams<{
    id?: string;
    title?: string;
    person?: string;
    time?: string;
    platform?: string;
  }>();

  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const meetingTitle = params.title || 'Müşteri Toplantısı';
  const personName = params.person || 'Mehmet Yılmaz';
  const meetingTime = params.time || '14:30';
  const platformName = params.platform || 'Google Meet / Ofis';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* --- TOP BAR --- */}
      <View style={styles.topBar}>
        <Pressable
          style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.ink} />
        </Pressable>

        <View style={styles.topBarCenter}>
          <Text style={styles.topBarLabel}>TOPLANTIYA HAZIRLAN</Text>
        </View>

        <View style={styles.timeRemainingBadge}>
          <Ionicons name="time-outline" size={13} color={COLORS.warning} />
          <Text style={styles.timeRemainingText}>18 dk kaldı</Text>
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* --- ATTENDEE HEADER --- */}
        <View style={styles.attendeeHeader}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {personName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </Text>
          </View>
          <View style={styles.attendeeInfo}>
            <Text style={styles.attendeeName}>{personName}</Text>
            <Text style={styles.attendeeMeta}>
              {meetingTitle} · {meetingTime} · 60 dk · {platformName}
            </Text>
          </View>
        </View>

        {/* --- SIGNATURE CARD: KONUŞMAN GEREKEN 3 ŞEY --- */}
        <View style={styles.signatureCard}>
          <View style={styles.signatureHeader}>
            <Ionicons name="sparkles" size={16} color="#A9AAF5" />
            <Text style={styles.signatureBadge}>KONUŞMAN GEREKEN 3 ŞEY</Text>
          </View>

          <View style={styles.threeThingsList}>
            {/* Thing 1 */}
            <View style={styles.thingRow}>
              <View style={styles.thingNumberBox}>
                <Text style={styles.thingNumber}>1</Text>
              </View>
              <View style={styles.thingContent}>
                <Text style={styles.thingTitle}>Fiyat & İndirim Sınırı</Text>
                <Text style={styles.thingDesc}>
                  Revize teklif 17:00'ye kadar bekleniyor; marj korumak için %8 indirim sınırını netleştir.
                </Text>
              </View>
            </View>

            {/* Thing 2 */}
            <View style={styles.thingRow}>
              <View style={styles.thingNumberBox}>
                <Text style={styles.thingNumber}>2</Text>
              </View>
              <View style={styles.thingContent}>
                <Text style={styles.thingTitle}>Teslim Tarihi</Text>
                <Text style={styles.thingDesc}>
                  Ekim başı için onay istiyor; üretim takvimi en erken 6 Ekim'i gösteriyor.
                </Text>
              </View>
            </View>

            {/* Thing 3 */}
            <View style={styles.thingRow}>
              <View style={styles.thingNumberBox}>
                <Text style={styles.thingNumber}>3</Text>
              </View>
              <View style={styles.thingContent}>
                <Text style={styles.thingTitle}>Sözleşme Maddeleri</Text>
                <Text style={styles.thingDesc}>
                  Taslak 2 haftadır açık; hukuk ekibinden beklenen onay ve nakliye şartları gündeme gelebilir.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* --- SECTION: TOPLANTININ AMACI --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeaderTitle}>TOPLANTININ AMACI</Text>
          <Text style={styles.sectionBodyText}>
            Q4 başlangıcı öncesi son fiyat revizyonunu ve 6 Ekim teslimat takvimini kesinleştirmek. Ahmet Bey'in onay vermesi halinde sözleşme imzaya hazır hale getirilecek.
          </Text>
        </View>

        {/* --- SECTION: SON GÖRÜŞMENİZ --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeaderTitle}>SON GÖRÜŞMENİZ</Text>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={16} color={COLORS.primary} />
            <Text style={styles.infoRowText}>
              <Text style={{ fontWeight: '700' }}>1 Eylül:</Text> Fiyat aralığı ve teslim süresi görüşüldü. Mehmet Bey Ekim başı teslimat istedi, teklif v2 iletildi.
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={16} color={COLORS.primary} />
            <Text style={styles.infoRowText}>
              <Text style={{ fontWeight: '700' }}>Dün 18:42:</Text> Fiyatın Ekim teslimatına göre güncellenmesini talep eden e-posta alındı.
            </Text>
          </View>
        </View>

        {/* --- SECTION: SENİN BEKLEDİKLERİN & AÇIK KONULAR --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeaderTitle}>AÇIK KONULAR & TAAHHÜTLER</Text>
          <View style={styles.bulletItem}>
            <View style={styles.bulletDot} />
            <Text style={styles.bulletText}>
              Nakliye maliyetinin alıcı mı satıcı mı tarafından karşılanacağı ilk görüşmede açık kalmıştı.
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <View style={styles.bulletDot} />
            <Text style={styles.bulletText}>
              Hukuk departmanının sözleşme 14. madde şerhi henüz karşı tarafa aktarılmadı.
            </Text>
          </View>
        </View>

        {/* --- SECTION: KAYNAKLAR --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeaderTitle}>İLGİLİ KAYNAKLAR</Text>
          <View style={styles.chipRow}>
            <View style={styles.sourceChip}>
              <Ionicons name="mail" size={13} color={COLORS.inkSecondary} />
              <Text style={styles.sourceChipText}>3 E-posta</Text>
            </View>
            <View style={styles.sourceChip}>
              <Ionicons name="document-text" size={13} color={COLORS.inkSecondary} />
              <Text style={styles.sourceChipText}>1 Görüşme Notu</Text>
            </View>
            <View style={styles.sourceChip}>
              <Ionicons name="attach" size={13} color={COLORS.inkSecondary} />
              <Text style={styles.sourceChipText}>Teklif v2.pdf</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* --- BOTTOM STICKY ACTION BAR --- */}
      <View style={styles.bottomBar}>
        <Pressable
          style={({ pressed }) => [styles.primaryCtaBtn, pressed && styles.pressed]}
          onPress={() => setShowSummaryModal(true)}
        >
          <Ionicons name="document-text-outline" size={18} color="#FFFFFF" />
          <Text style={styles.primaryCtaText}>2 Dakikalık Özeti Oku</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.secondaryCtaBtn, pressed && styles.pressed]}
          onPress={() => router.push('/(tabs)/assistant' as any)}
        >
          <Ionicons name="pencil-outline" size={18} color={COLORS.ink} />
          <Text style={styles.secondaryCtaText}>Not Al</Text>
        </Pressable>
      </View>

      {/* --- 2 DAKİKALIK ÖZET MODAL --- */}
      <Modal
        visible={showSummaryModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSummaryModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTag}>2 DAKİKALIK BRİFİNG</Text>
                <Text style={styles.modalHeadline}>Nerede kalmıştınız?</Text>
              </View>
              <Pressable
                onPress={() => setShowSummaryModal(false)}
                style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
              >
                <Ionicons name="close" size={22} color={COLORS.ink} />
              </Pressable>
            </View>

            <ScrollView style={styles.modalScroll}>
              <Text style={styles.summaryEditorialText}>
                Mehmet Yılmaz ile en son <Text style={{ fontWeight: '700' }}>1 Eylül'de</Text> konuştunuz. Fiyat aralığını ve teslim süresini ele aldınız; Mehmet Bey Ekim başı teslimat için revize teklif istedi.
              </Text>
              <Text style={styles.summaryEditorialText}>
                Dün akşam gelen mailde fiyatın Ekim teslimatına göre güncellenmesini istedi. Bu, <Text style={{ fontWeight: '700' }}>%8 indirim sınırını</Text> ve üretim takviminin gösterdiği <Text style={{ fontWeight: '700' }}>6 Ekim</Text> tarihini konuşmanı gerektiriyor.
              </Text>
              <Text style={styles.summaryEditorialText}>
                Sözleşme taslağı iki haftadır hukuk yorumu bekliyor; Mehmet'in bunu sorması muhtemel. Nakliye şartını netleştirmeniz toplantının ana çıktısı olmalıdır.
              </Text>

              {/* Audio Listen Simulation */}
              <Pressable
                style={[styles.audioPill, isPlayingAudio && styles.audioPillActive]}
                onPress={() => setIsPlayingAudio(!isPlayingAudio)}
              >
                <Ionicons
                  name={isPlayingAudio ? 'pause' : 'volume-high'}
                  size={18}
                  color={isPlayingAudio ? '#FFFFFF' : COLORS.primary}
                />
                <Text
                  style={[
                    styles.audioPillText,
                    isPlayingAudio && styles.audioPillTextActive,
                  ]}
                >
                  {isPlayingAudio ? 'Sesli brifing çalınıyor (0:45 / 1:30)...' : 'Sesli Dinle (1.5 dk)'}
                </Text>
              </Pressable>
            </ScrollView>

            <View style={styles.modalBottom}>
              <Pressable
                style={styles.modalDoneBtn}
                onPress={() => setShowSummaryModal(false)}
              >
                <Text style={styles.modalDoneBtnText}>Anladım, Hazırım</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 36 : 14,
    paddingBottom: 12,
  },
  topBarCenter: {
    alignItems: 'center',
  },
  topBarLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.inkTertiary,
    letterSpacing: 0.8,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  timeRemainingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.warningSoft,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 12,
  },
  timeRemainingText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.warning,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 110,
    gap: 16,
  },
  attendeeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 6,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#DCE4F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2B3F73',
  },
  attendeeInfo: {
    flex: 1,
  },
  attendeeName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.ink,
    letterSpacing: -0.3,
  },
  attendeeMeta: {
    fontSize: 13,
    color: COLORS.inkSecondary,
    marginTop: 3,
  },
  signatureCard: {
    backgroundColor: COLORS.darkSurface,
    borderRadius: 22,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 4,
  },
  signatureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  signatureBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#A9AAF5',
    letterSpacing: 0.6,
  },
  threeThingsList: {
    gap: 16,
  },
  thingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  thingNumberBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  thingNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  thingContent: {
    flex: 1,
  },
  thingTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  thingDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.72)',
    lineHeight: 18,
  },
  sectionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  sectionHeaderTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.inkTertiary,
    letterSpacing: 0.6,
    marginBottom: 10,
  },
  sectionBodyText: {
    fontSize: 14,
    color: COLORS.ink,
    lineHeight: 21,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  infoRowText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.inkSecondary,
    lineHeight: 19,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginTop: 6,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.inkSecondary,
    lineHeight: 19,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sourceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.surfaceSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sourceChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.inkSecondary,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(241,241,248,0.92)',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 32 : 18,
    flexDirection: 'row',
    gap: 10,
  },
  primaryCtaBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 3,
  },
  primaryCtaText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryCtaBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 14,
    borderRadius: 16,
  },
  secondaryCtaText: {
    color: COLORS.ink,
    fontSize: 14,
    fontWeight: '600',
  },
  pressed: {
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
    maxHeight: '80%',
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTag: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 0.6,
  },
  modalHeadline: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.ink,
    marginTop: 3,
  },
  modalScroll: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  summaryEditorialText: {
    fontSize: 15,
    color: '#2A2926',
    lineHeight: 23,
    marginBottom: 14,
  },
  audioPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.primarySoft,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
    marginBottom: 20,
  },
  audioPillActive: {
    backgroundColor: COLORS.primary,
  },
  audioPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  audioPillTextActive: {
    color: '#FFFFFF',
  },
  modalBottom: {
    paddingHorizontal: 20,
  },
  modalDoneBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalDoneBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
