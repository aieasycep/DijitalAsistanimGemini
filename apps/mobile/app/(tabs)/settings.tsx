import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Switch,
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
  darkCard: '#1A1917',
};

export default function SettingsScreen() {
  // Assistant Configuration States
  const [morningTime, setMorningTime] = useState<string>('07:30');
  const [eveningTime, setEveningTime] = useState<string>('19:00');
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [retentionDays, setRetentionDays] = useState<'30' | '90' | '365'>('90');

  // Granular Data Source Permissions (Section 7.3)
  const [accessGmail, setAccessGmail] = useState<boolean>(true);
  const [accessCalendar, setAccessCalendar] = useState<boolean>(true);
  const [accessCapture, setAccessCapture] = useState<boolean>(true);
  const [accessContacts, setAccessContacts] = useState<boolean>(true);

  // Modals
  const [privacyModalVisible, setPrivacyModalVisible] = useState<boolean>(false);
  const [dataAccessModalVisible, setDataAccessModalVisible] = useState<boolean>(false);
  const [deleteHistoryModalVisible, setDeleteHistoryModalVisible] = useState<boolean>(false);
  const [vipModalVisible, setVipModalVisible] = useState<boolean>(false);
  const [personalizationModalVisible, setPersonalizationModalVisible] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3200);
  };

  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yapılsın mı?',
      'Oturumunuz kapatılacak ve ana giriş ekranına yönlendirileceksiniz.',
      [
        { text: 'Vazgeç', style: 'cancel' },
        {
          text: 'Çıkış Yap',
          style: 'destructive',
          onPress: () => {
            showToast('Çıkış yapıldı.');
            router.replace('/onboarding');
          },
        },
      ]
    );
  };

  const handleDeleteHistory = () => {
    setDeleteHistoryModalVisible(false);
    showToast('✓ Analiz geçmişi başarıyla temizlendi. Orijinal mailleriniz korunmaktadır.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F1F1F8" />

      {/* Floating Toast */}
      {toastMsg && (
        <View style={styles.toast}>
          <Ionicons name="information-circle" size={18} color="#FFFFFF" />
          <Text style={styles.toastText}>{toastMsg}</Text>
        </View>
      )}

      {/* Header Title */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Ayarlar</Text>
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarLetter}>Y</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.profileName}>Yunus Emre</Text>
            <View style={styles.profileBadgeRow}>
              <Pressable
                style={styles.proTag}
                onPress={() => router.push('/paywall')}
              >
                <Text style={styles.proTagText}>PRO</Text>
              </Pressable>
              <Text style={styles.proExpiryText}>Deneme · 5 gün kaldı</Text>
            </View>
          </View>
          <Pressable
            style={styles.profileEditBtn}
            onPress={() => router.push('/paywall')}
          >
            <Ionicons name="sparkles" size={18} color={COLORS.primary} />
          </Pressable>
        </View>

        {/* Approval Center Banner (Dark Card) */}
        <Pressable
          style={styles.approvalCenterCard}
          onPress={() => router.push('/approval-center')}
        >
          <View style={styles.approvalIconCircle}>
            <Ionicons name="shield-checkmark" size={22} color="#A9AAF5" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.approvalCardTitle}>Onay Merkezi</Text>
            <Text style={styles.approvalCardSub}>2 işlem kullanıcı onayını bekliyor</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.6)" />
        </Pressable>

        {/* GROUP 1: ASİSTAN DAVRANIŞI */}
        <View style={styles.settingsGroup}>
          <Text style={styles.groupHeader}>ASİSTAN DAVRANIŞI</Text>
          <View style={styles.groupCard}>
            <Pressable
              style={styles.settingRow}
              onPress={() => {
                const next = morningTime === '07:30' ? '08:00' : '07:30';
                setMorningTime(next);
                showToast(`Sabah brifingi saati ${next} olarak ayarlandı.`);
              }}
            >
              <Ionicons name="sunny-outline" size={20} color={COLORS.inkSecondary} />
              <Text style={styles.rowLabel}>Sabah Brifingi Saati</Text>
              <Text style={styles.rowValue}>{morningTime}</Text>
              <Ionicons name="chevron-forward" size={16} color="#C9C5BC" />
            </Pressable>

            <Pressable
              style={[styles.settingRow, styles.rowBorder]}
              onPress={() => {
                const next = eveningTime === '19:00' ? '18:30' : '19:00';
                setEveningTime(next);
                showToast(`Akşam özeti saati ${next} olarak ayarlandı.`);
              }}
            >
              <Ionicons name="moon-outline" size={20} color={COLORS.inkSecondary} />
              <Text style={styles.rowLabel}>Akşam Özeti Saati</Text>
              <Text style={styles.rowValue}>{eveningTime}</Text>
              <Ionicons name="chevron-forward" size={16} color="#C9C5BC" />
            </Pressable>

            <View style={[styles.settingRow, styles.rowBorder]}>
              <Ionicons name="headset-outline" size={20} color={COLORS.inkSecondary} />
              <Text style={styles.rowLabel}>Sesli Brifing (Türkçe Doğal)</Text>
              <Switch
                value={voiceEnabled}
                onValueChange={setVoiceEnabled}
                trackColor={{ false: '#E0DED7', true: COLORS.primary }}
              />
            </View>

            <Pressable
              style={[styles.settingRow, styles.rowBorder]}
              onPress={() => setVipModalVisible(true)}
            >
              <Ionicons name="star-outline" size={20} color={COLORS.warning} />
              <Text style={styles.rowLabel}>Önemli Kişiler (VIP)</Text>
              <Text style={styles.rowValue}>6 kişi</Text>
              <Ionicons name="chevron-forward" size={16} color="#C9C5BC" />
            </Pressable>

            <Pressable
              style={[styles.settingRow, styles.rowBorder]}
              onPress={() => setPersonalizationModalVisible(true)}
            >
              <Ionicons name="sparkles-outline" size={20} color={COLORS.primary} />
              <Text style={styles.rowLabel}>AI Kişiselleştirme (“Seni nasıl tanıyor?”)</Text>
              <Text style={styles.rowValue}>14 kural</Text>
              <Ionicons name="chevron-forward" size={16} color="#C9C5BC" />
            </Pressable>
          </View>
        </View>

        {/* GROUP 2: GİZLİLİK VE VERİ KAYNAKLARI (Madde 54) */}
        <View style={styles.settingsGroup}>
          <Text style={styles.groupHeader}>GİZLİLİK VE VERİ KONTROLÜ</Text>
          <View style={styles.groupCard}>
            <Pressable
              style={styles.settingRow}
              onPress={() => setPrivacyModalVisible(true)}
            >
              <Ionicons name="shield-outline" size={20} color={COLORS.primaryDark} />
              <Text style={styles.rowLabel}>Gizlilik Merkezi</Text>
              <Text style={styles.rowValue}>3 Temel Vaat</Text>
              <Ionicons name="chevron-forward" size={16} color="#C9C5BC" />
            </Pressable>

            <Pressable
              style={[styles.settingRow, styles.rowBorder]}
              onPress={() => setDataAccessModalVisible(true)}
            >
              <Ionicons name="eye-outline" size={20} color={COLORS.success} />
              <Text style={styles.rowLabel}>AI'ın Eriştiği Veriler</Text>
              <Text style={styles.rowValue}>Kaynaklar</Text>
              <Ionicons name="chevron-forward" size={16} color="#C9C5BC" />
            </Pressable>

            <View style={[styles.settingRow, styles.rowBorder]}>
              <Ionicons name="time-outline" size={20} color={COLORS.inkSecondary} />
              <Text style={styles.rowLabel}>Veri Saklama Süresi</Text>
              <View style={styles.retentionPills}>
                {(['30', '90', '365'] as const).map(d => (
                  <Pressable
                    key={d}
                    style={[
                      styles.retentionPill,
                      retentionDays === d && styles.retentionPillActive,
                    ]}
                    onPress={() => {
                      setRetentionDays(d);
                      showToast(`Veri saklama süresi ${d === '365' ? '1 yıl' : `${d} gün`} olarak ayarlandı.`);
                    }}
                  >
                    <Text
                      style={[
                        styles.retentionPillText,
                        retentionDays === d && styles.retentionPillTextActive,
                      ]}
                    >
                      {d === '365' ? '1 yıl' : `${d}g`}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <Pressable
              style={[styles.settingRow, styles.rowBorder]}
              onPress={() => setDeleteHistoryModalVisible(true)}
            >
              <Ionicons name="trash-outline" size={20} color={COLORS.critical} />
              <Text style={[styles.rowLabel, { color: COLORS.critical }]}>
                Analiz Geçmişini Sil
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#C9C5BC" />
            </Pressable>
          </View>
        </View>

        {/* GROUP 3: HESAP VE ABONELİK */}
        <View style={styles.settingsGroup}>
          <Text style={styles.groupHeader}>HESAP VE ABONELİK</Text>
          <View style={styles.groupCard}>
            <Pressable
              style={styles.settingRow}
              onPress={() => router.push('/paywall')}
            >
              <Ionicons name="card-outline" size={20} color={COLORS.primary} />
              <Text style={styles.rowLabel}>Abonelik Yönetimi</Text>
              <Text style={styles.rowValue}>PRO (Deneme)</Text>
              <Ionicons name="chevron-forward" size={16} color="#C9C5BC" />
            </Pressable>

            <Pressable
              style={[styles.settingRow, styles.rowBorder]}
              onPress={() => router.push('/paywall')}
            >
              <Ionicons name="gift-outline" size={20} color={COLORS.success} />
              <Text style={styles.rowLabel}>Arkadaşını Davet Et</Text>
              <Text style={styles.rowValue}>14 Gün Pro</Text>
              <Ionicons name="chevron-forward" size={16} color="#C9C5BC" />
            </Pressable>

            <Pressable
              style={[styles.settingRow, styles.rowBorder]}
              onPress={() => showToast('Bağlı Hesaplar: Gmail (yunus@...), Google Takvim (aktif)')}
            >
              <Ionicons name="link-outline" size={20} color={COLORS.inkSecondary} />
              <Text style={styles.rowLabel}>Bağlı Hesaplar</Text>
              <Text style={styles.rowValue}>Gmail, Takvim</Text>
              <Ionicons name="chevron-forward" size={16} color="#C9C5BC" />
            </Pressable>
          </View>
        </View>

        {/* Logout Button */}
        <Pressable
          style={styles.logoutBtn}
          onPress={handleLogout}
        >
          <Text style={styles.logoutBtnText}>Çıkış Yap</Text>
        </Pressable>

        {/* Build & Version Footer */}
        <Text style={styles.buildFooter}>
          Dijital Asistan v1.0.0 (Build 240) · Gizlilik Politikası · KVKK & GDPR
        </Text>
      </ScrollView>

      {/* MODAL 1: Privacy Center (Design 7.2) */}
      <Modal
        visible={privacyModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPrivacyModalVisible(false)}
      >
        <SafeAreaView style={styles.modalFullContainer}>
          <View style={styles.modalHeader}>
            <Pressable
              style={styles.modalCloseCircle}
              onPress={() => setPrivacyModalVisible(false)}
            >
              <Ionicons name="arrow-back" size={20} color={COLORS.ink} />
            </Pressable>
            <Text style={styles.modalHeaderTitle}>Gizlilik Merkezi</Text>
            <View style={{ width: 36 }} />
          </View>

          <ScrollView style={{ paddingHorizontal: 20 }}>
            <Text style={styles.privacyHeading}>Gizlilik ve Güvenlik</Text>
            <Text style={styles.privacySub}>
              Neyi okuduğumu, ne kadar sakladığımı ve nasıl sileceğini burada şeffaflıkla görürsün.
            </Text>

            {/* 3 Core Dark Promises Card (Design 7.2) */}
            <View style={styles.darkPromisesCard}>
              <View style={styles.promiseRow}>
                <Ionicons name="shield-checkmark" size={20} color="#A9F0C1" />
                <Text style={styles.promiseBold}>Verilerin asla reklamverenlere satılmaz.</Text>
              </View>
              <View style={styles.promiseRow}>
                <Ionicons name="shield-checkmark" size={20} color="#A9F0C1" />
                <Text style={styles.promiseNormal}>Önemli hiçbir işlem sen onaylamadan gerçekleştirilmez.</Text>
              </View>
              <View style={styles.promiseRow}>
                <Ionicons name="shield-checkmark" size={20} color="#A9F0C1" />
                <Text style={styles.promiseNormal}>Mail ve takvim içerikleri model eğitiminde kullanılmaz.</Text>
              </View>
            </View>

            <Text style={styles.innerSectionTitle}>BAĞLI HESAP İZİNLERİ</Text>
            <View style={styles.groupCard}>
              <View style={styles.accountRow}>
                <View style={[styles.accountIcon, { backgroundColor: COLORS.criticalSoft }]}>
                  <Ionicons name="mail" size={18} color={COLORS.critical} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.accountTitle}>Gmail (yunus@...)</Text>
                  <Text style={styles.accountSub}>Okuma · Taslak oluşturma · Gönderme (onaylı)</Text>
                </View>
              </View>
              <View style={[styles.accountRow, styles.rowBorder]}>
                <View style={[styles.accountIcon, { backgroundColor: COLORS.successSoft }]}>
                  <Ionicons name="calendar" size={18} color={COLORS.success} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.accountTitle}>Google Takvim</Text>
                  <Text style={styles.accountSub}>Okuma · Etkinlik oluşturma / taşıma (onaylı)</Text>
                </View>
              </View>
            </View>

            <View style={styles.securityMetaCard}>
              <Ionicons name="lock-closed" size={16} color={COLORS.inkTertiary} />
              <Text style={styles.securityMetaText}>
                Uçtan uca TLS şifreleme · Veriler AB (Frankfurt) sunucularında saklanır · KVKK ve GDPR tam uyumlu
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* MODAL 2: Granular Data Sources Control (Design 7.3) */}
      <Modal
        visible={dataAccessModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setDataAccessModalVisible(false)}
      >
        <SafeAreaView style={styles.modalFullContainer}>
          <View style={styles.modalHeader}>
            <Pressable
              style={styles.modalCloseCircle}
              onPress={() => setDataAccessModalVisible(false)}
            >
              <Ionicons name="arrow-back" size={20} color={COLORS.ink} />
            </Pressable>
            <Text style={styles.modalHeaderTitle}>AI Neye Erişiyor?</Text>
            <View style={{ width: 36 }} />
          </View>

          <ScrollView style={{ paddingHorizontal: 20 }}>
            <Text style={styles.privacyHeading}>Veri Kaynağı Kontrolü</Text>
            <Text style={styles.privacySub}>
              İstediğin kaynağı kapatabilirsin. Kapattığın alanlar analize ve hafızaya girmez.
            </Text>

            {/* OKUR BÖLÜMÜ */}
            <Text style={[styles.innerSectionTitle, { color: COLORS.success }]}>OKUR (KONTROL EDİLEBİLİR)</Text>
            <View style={styles.groupCard}>
              <View style={styles.toggleRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.toggleTitle}>Gmail E-postaları</Text>
                  <Text style={styles.toggleSub}>Öncelik tespiti ve brifing hazırlığı için</Text>
                </View>
                <Switch
                  value={accessGmail}
                  onValueChange={setAccessGmail}
                  trackColor={{ false: '#E0DED7', true: COLORS.primary }}
                />
              </View>

              <View style={[styles.toggleRow, styles.rowBorder]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.toggleTitle}>Google Takvim Etkinlikleri</Text>
                  <Text style={styles.toggleSub}>Çakışma ve toplantı hazırlık notları için</Text>
                </View>
                <Switch
                  value={accessCalendar}
                  onValueChange={setAccessCalendar}
                  trackColor={{ false: '#E0DED7', true: COLORS.primary }}
                />
              </View>

              <View style={[styles.toggleRow, styles.rowBorder]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.toggleTitle}>Evrensel Yakalama Belgeleri</Text>
                  <Text style={styles.toggleSub}>Ekran görüntüsü ve faturalardan etkinlik çıkarma</Text>
                </View>
                <Switch
                  value={accessCapture}
                  onValueChange={setAccessCapture}
                  trackColor={{ false: '#E0DED7', true: COLORS.primary }}
                />
              </View>

              <View style={[styles.toggleRow, styles.rowBorder]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.toggleTitle}>Kişi İletişim Frekansı</Text>
                  <Text style={styles.toggleSub}>VIP kişi tespiti ve geciken yanıt takibi</Text>
                </View>
                <Switch
                  value={accessContacts}
                  onValueChange={setAccessContacts}
                  trackColor={{ false: '#E0DED7', true: COLORS.primary }}
                />
              </View>
            </View>

            {/* HİÇBİR ZAMAN OKUMAZ BÖLÜMÜ (Design 7.3) */}
            <Text style={[styles.innerSectionTitle, { color: COLORS.critical, marginTop: 24 }]}>
              HİÇBİR ZAMAN OKUMAZ (KİLİTLİ GÜVENLİK)
            </Text>
            <View style={styles.groupCard}>
              {[
                'Şifreler ve SMS / 2FA doğrulama kodları',
                'Banka hesap numaraları, IBAN ve kart bilgileri',
                'Sağlık verileri ve kişisel tahlil içerikleri',
                'Özel anlık mesajlaşma metinleri',
              ].map((item, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.blockedRow,
                    idx > 0 && styles.rowBorder,
                  ]}
                >
                  <Ionicons name="ban" size={18} color={COLORS.critical} />
                  <Text style={styles.blockedText}>{item}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* MODAL 3: Delete History Confirmation (Design 7.4) */}
      <Modal
        visible={deleteHistoryModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDeleteHistoryModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setDeleteHistoryModalVisible(false)}
        >
          <Pressable style={styles.bottomSheet} onPress={e => e.stopPropagation()}>
            <View style={styles.sheetHandle} />

            <View style={styles.deleteIconCircle}>
              <Ionicons name="trash-bin" size={26} color={COLORS.critical} />
            </View>

            <Text style={styles.deleteSheetTitle}>Analiz geçmişi silinsin mi?</Text>
            <Text style={styles.deleteSheetDesc}>
              90 günlük özetler, öncelik kararları ve yapay zekâ hafıza dizini silinir. Orijinal maillerin ve takvimin asla etkilenmez.
            </Text>

            <View style={styles.deletionSummaryBox}>
              <Text style={styles.deletionSummaryText}>
                <Text style={{ fontWeight: '700' }}>Silinen:</Text> 1.204 özet · 318 öncelik kararı · 42 kural{'\n'}
                <Text style={{ fontWeight: '700' }}>Korunan:</Text> bağlantılar, hesaplar, VIP listesi
              </Text>
            </View>

            <Pressable
              style={styles.deleteConfirmBtn}
              onPress={handleDeleteHistory}
            >
              <Text style={styles.deleteConfirmBtnText}>Geçmişi Sil</Text>
            </Pressable>

            <Pressable
              style={styles.deleteCancelBtn}
              onPress={() => setDeleteHistoryModalVisible(false)}
            >
              <Text style={styles.deleteCancelBtnText}>Vazgeç</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      {/* MODAL 4: VIP People Manager */}
      <Modal
        visible={vipModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setVipModalVisible(false)}
      >
        <SafeAreaView style={styles.modalFullContainer}>
          <View style={styles.modalHeader}>
            <Pressable
              style={styles.modalCloseCircle}
              onPress={() => setVipModalVisible(false)}
            >
              <Ionicons name="close" size={20} color={COLORS.ink} />
            </Pressable>
            <Text style={styles.modalHeaderTitle}>VIP Kişiler</Text>
            <View style={{ width: 36 }} />
          </View>

          <ScrollView style={{ paddingHorizontal: 20 }}>
            <Text style={styles.privacyHeading}>Önemli Kişiler Listesi</Text>
            <Text style={styles.privacySub}>
              Bu kişilerden gelen mailler ve takvim davetleri her zaman en üst öncelikte değerlendirilir.
            </Text>

            <View style={styles.groupCard}>
              {[
                { name: 'Ahmet Yılmaz', role: 'TeknoAS CEO', tag: 'Kritik Müşteri' },
                { name: 'Selin Kaya', role: 'Hukuk Müşaviri', tag: 'Şirket İçi' },
                { name: 'Mehmet Demir', role: 'Proje Yöneticisi', tag: 'İş Ortağı' },
                { name: 'Canan Öztürk', role: 'Yatırımcı İlişkileri', tag: 'Yatırımcı' },
                { name: 'Kerem Arslan', role: 'CTO', tag: 'Şirket İçi' },
                { name: 'Zeynep Aydın', role: 'Pazarlama Direktörü', tag: 'Şirket İçi' },
              ].map((vip, i) => (
                <View
                  key={i}
                  style={[
                    styles.vipRow,
                    i > 0 && styles.rowBorder,
                  ]}
                >
                  <View style={styles.vipAvatar}>
                    <Text style={styles.vipAvatarText}>{vip.name.slice(0, 2).toUpperCase()}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.vipName}>{vip.name}</Text>
                    <Text style={styles.vipRole}>{vip.role}</Text>
                  </View>
                  <View style={styles.vipTag}>
                    <Text style={styles.vipTagText}>{vip.tag}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* MODAL 5: AI Personalization ("Seni Nasıl Tanıyor?") */}
      <Modal
        visible={personalizationModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPersonalizationModalVisible(false)}
      >
        <SafeAreaView style={styles.modalFullContainer}>
          <View style={styles.modalHeader}>
            <Pressable
              style={styles.modalCloseCircle}
              onPress={() => setPersonalizationModalVisible(false)}
            >
              <Ionicons name="close" size={20} color={COLORS.ink} />
            </Pressable>
            <Text style={styles.modalHeaderTitle}>AI Kişiselleştirme</Text>
            <View style={{ width: 36 }} />
          </View>

          <ScrollView style={{ paddingHorizontal: 20 }}>
            <Text style={styles.privacyHeading}>Seni Nasıl Tanıyor?</Text>
            <Text style={styles.privacySub}>
              Zaman içinde onayladığın ve reddettiğin işlemlerden çıkarılan 14 davranış kuralı:
            </Text>

            <View style={styles.groupCard}>
              {[
                { rule: 'Sabah saat 09:00 öncesi toplantı kabul edilmez.', origin: 'Manuel Tercih' },
                { rule: 'Ahmet Yılmaz\'dan gelen teklif mailleri acil kategorisine girer.', origin: 'Davranış Öğrenimi' },
                { rule: 'E-posta taslaklarında resmi ve profesyonel dil tercih edilir.', origin: 'Onay Tercihi' },
                { rule: 'Fatura hatırlatmaları son günden 2 gün önce planlanır.', origin: 'Otomatik Kural' },
              ].map((item, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.ruleRow,
                    idx > 0 && styles.rowBorder,
                  ]}
                >
                  <Ionicons name="bulb-outline" size={18} color={COLORS.primary} />
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={styles.ruleText}>{item.rule}</Text>
                    <Text style={styles.ruleOrigin}>{item.origin}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
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
  headerBar: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: -0.4,
    color: COLORS.ink,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: '#ECECF4',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.ink,
  },
  profileBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 3,
  },
  proTag: {
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  proTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primaryDark,
  },
  proExpiryText: {
    fontSize: 12,
    color: COLORS.inkSecondary,
  },
  profileEditBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  approvalCenterCard: {
    backgroundColor: COLORS.darkCard,
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  approvalIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  approvalCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  approvalCardSub: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  settingsGroup: {
    marginBottom: 20,
  },
  groupHeader: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    color: COLORS.inkTertiary,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  groupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ECECF4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
    gap: 12,
  },
  rowBorder: {
    borderTopWidth: 1,
    borderTopColor: '#F2F2F8',
  },
  rowLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.ink,
  },
  rowValue: {
    fontSize: 13,
    color: COLORS.inkTertiary,
  },
  retentionPills: {
    flexDirection: 'row',
    backgroundColor: '#F0EFEB',
    borderRadius: 12,
    padding: 2,
  },
  retentionPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  retentionPillActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  retentionPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.inkSecondary,
  },
  retentionPillTextActive: {
    color: COLORS.ink,
    fontWeight: '700',
  },
  logoutBtn: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  logoutBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.critical,
  },
  buildFooter: {
    fontSize: 11,
    color: COLORS.inkTertiary,
    textAlign: 'center',
    marginTop: 6,
  },
  modalFullContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalCloseCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalHeaderTitle: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: COLORS.inkTertiary,
  },
  privacyHeading: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '700',
    letterSpacing: -0.3,
    color: COLORS.ink,
    marginTop: 10,
  },
  privacySub: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.inkSecondary,
    marginTop: 6,
    marginBottom: 20,
  },
  darkPromisesCard: {
    backgroundColor: COLORS.darkCard,
    borderRadius: 20,
    padding: 18,
    gap: 14,
    marginBottom: 24,
  },
  promiseRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  promiseBold: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
    lineHeight: 20,
  },
  promiseNormal: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    flex: 1,
    lineHeight: 20,
  },
  innerSectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    color: COLORS.inkTertiary,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 12,
  },
  accountIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.ink,
  },
  accountSub: {
    fontSize: 12,
    color: COLORS.inkTertiary,
    marginTop: 2,
  },
  securityMetaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    paddingHorizontal: 6,
  },
  securityMetaText: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.inkTertiary,
    flex: 1,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  toggleTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.ink,
  },
  toggleSub: {
    fontSize: 12,
    color: COLORS.inkSecondary,
    marginTop: 2,
  },
  blockedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
  },
  blockedText: {
    fontSize: 14,
    color: COLORS.inkSecondary,
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
    paddingBottom: 40,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0DED7',
    alignSelf: 'center',
    marginBottom: 16,
  },
  deleteIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.criticalSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  deleteSheetTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.ink,
  },
  deleteSheetDesc: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.inkSecondary,
    marginTop: 6,
  },
  deletionSummaryBox: {
    backgroundColor: '#F5F4F0',
    borderRadius: 14,
    padding: 12,
    marginTop: 14,
    marginBottom: 18,
  },
  deletionSummaryText: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.inkSecondary,
  },
  deleteConfirmBtn: {
    height: 50,
    borderRadius: 16,
    backgroundColor: COLORS.critical,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteConfirmBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  deleteCancelBtn: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  deleteCancelBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.inkSecondary,
  },
  vipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  vipAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vipAvatarText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  vipName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.ink,
  },
  vipRole: {
    fontSize: 12,
    color: COLORS.inkSecondary,
    marginTop: 1,
  },
  vipTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: '#F0EFEB',
  },
  vipTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.inkSecondary,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  ruleText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.ink,
  },
  ruleOrigin: {
    fontSize: 11,
    color: COLORS.inkTertiary,
    marginTop: 2,
  },
});
