import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Animated,
  Modal,
  Platform,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// --- THEME TOKENS ---
const COLORS = {
  primary: '#5B5CE2',
  primaryPressed: '#4B4CCB',
  primarySoft: '#EDEDFC',
  primaryText: '#4547C9',
  background: '#F1F1F8',
  surface: '#FFFFFF',
  surfaceSoft: '#F7F6F2',
  ink: '#1A1917',
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
  darkDawn: '#1E1E4C',
  darkNight: '#15153A',
};

// --- STEP TYPES ---
type OnboardingStep = 'welcome' | 'connect' | 'permissions' | 'analysis';

interface AccountItem {
  id: string;
  name: string;
  provider: 'google' | 'microsoft' | 'apple';
  type: 'email' | 'calendar';
  meta: string;
  connectedMeta: string;
  iconName: string;
  iconBg: string;
  iconColor: string;
  connected: boolean;
}

const INITIAL_ACCOUNTS: AccountItem[] = [
  {
    id: 'gmail',
    name: 'Google Gmail',
    provider: 'google',
    type: 'email',
    meta: 'Kişisel ve iş e-postaları',
    connectedMeta: 'yunus@gmail.com · 83 mail analiz edildi',
    iconName: 'mail',
    iconBg: '#FCEDE9',
    iconColor: '#C7432F',
    connected: true,
  },
  {
    id: 'gcal',
    name: 'Google Takvim',
    provider: 'google',
    type: 'calendar',
    meta: 'Toplantılar ve randevular',
    connectedMeta: '2 takvim bağlı · Kişisel & İş',
    iconName: 'calendar',
    iconBg: '#E4F5EA',
    iconColor: '#1E7A47',
    connected: true,
  },
  {
    id: 'outlook',
    name: 'Microsoft Outlook',
    provider: 'microsoft',
    type: 'email',
    meta: 'Microsoft 365 iş yazışmaları',
    connectedMeta: 'yunus@sirket.com · Bağlandı',
    iconName: 'mail-unread',
    iconBg: '#E7F0FD',
    iconColor: '#2262BE',
    connected: false,
  },
  {
    id: 'mscal',
    name: 'Microsoft Takvim',
    provider: 'microsoft',
    type: 'calendar',
    meta: 'Outlook kurumsal takvimi',
    connectedMeta: 'İş takvimi bağlı',
    iconName: 'calendar-outline',
    iconBg: '#E7F0FD',
    iconColor: '#2262BE',
    connected: false,
  },
  {
    id: 'applecal',
    name: 'Apple Takvim (iCloud)',
    provider: 'apple',
    type: 'calendar',
    meta: 'Cihaz takvimi ve yerel anımsatıcılar',
    connectedMeta: 'Cihaz takvimi bağlı',
    iconName: 'logo-apple',
    iconBg: '#F0EFEB',
    iconColor: '#1A1917',
    connected: false,
  },
];

export default function OnboardingScreen() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const steps: OnboardingStep[] = ['welcome', 'connect', 'permissions', 'analysis'];
  const currentStep = steps[currentStepIndex];

  // Connect accounts state
  const [accounts, setAccounts] = useState<AccountItem[]>(INITIAL_ACCOUNTS);
  const [selectedAccountForExplainer, setSelectedAccountForExplainer] = useState<AccountItem | null>(null);

  // Permissions state
  const [pushEnabled, setPushEnabled] = useState(true);
  const [briefingEnabled, setBriefingEnabled] = useState(true);
  const [urgentAlertsEnabled, setUrgentAlertsEnabled] = useState(true);

  // Analysis / Aha moment state
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisProgress, setAnalysisProgress] = useState(25);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Connected accounts counter
  const connectedCount = accounts.filter((a) => a.connected).length;

  // Pulse animation for AI processing
  useEffect(() => {
    if (currentStep === 'analysis' && isAnalyzing) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.12,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [currentStep, isAnalyzing]);

  // Progressive analysis timer simulation
  useEffect(() => {
    if (currentStep === 'analysis' && isAnalyzing) {
      const timer1 = setTimeout(() => setAnalysisProgress(50), 700);
      const timer2 = setTimeout(() => setAnalysisProgress(75), 1400);
      const timer3 = setTimeout(() => setAnalysisProgress(100), 2100);
      const timer4 = setTimeout(() => setIsAnalyzing(false), 2600);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [currentStep, isAnalyzing]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      // Completed - navigate to main tabs
      router.replace('/(tabs)');
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    // Jump straight to analysis or finish
    if (currentStepIndex < 3) {
      setCurrentStepIndex(3);
    } else {
      router.replace('/(tabs)');
    }
  };

  const toggleAccount = (id: string) => {
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === id) {
          return { ...acc, connected: !acc.connected };
        }
        return acc;
      })
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={currentStep === 'analysis' && !isAnalyzing ? 'light-content' : 'dark-content'} />

      {/* HEADER NAVIGATION BAR */}
      <View style={styles.navBar}>
        {currentStepIndex > 0 ? (
          <Pressable
            hitSlop={12}
            onPress={handleBack}
            style={({ pressed }) => [styles.navButton, pressed && styles.pressed]}
          >
            <Ionicons name="arrow-back" size={22} color={COLORS.ink} />
          </Pressable>
        ) : (
          <View style={{ width: 40 }} />
        )}

        <View style={styles.stepIndicatorContainer}>
          <Text style={styles.stepIndicatorText}>ADIM {currentStepIndex + 1} / 4</Text>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${((currentStepIndex + 1) / steps.length) * 100}%` },
              ]}
            />
          </View>
        </View>

        <Pressable
          hitSlop={12}
          onPress={handleSkip}
          style={({ pressed }) => [styles.skipButton, pressed && styles.pressed]}
        >
          <Text style={styles.skipButtonText}>{currentStepIndex === 3 ? 'Geç' : 'Atla'}</Text>
        </Pressable>
      </View>

      {/* MAIN STEP CONTENT */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {currentStep === 'welcome' && (
          <WelcomeStep onStart={handleNext} />
        )}

        {currentStep === 'connect' && (
          <ConnectStep
            accounts={accounts}
            connectedCount={connectedCount}
            onToggleAccount={toggleAccount}
            onOpenExplainer={(acc) => setSelectedAccountForExplainer(acc)}
            onContinue={handleNext}
          />
        )}

        {currentStep === 'permissions' && (
          <PermissionsStep
            pushEnabled={pushEnabled}
            setPushEnabled={setPushEnabled}
            briefingEnabled={briefingEnabled}
            setBriefingEnabled={setBriefingEnabled}
            urgentAlertsEnabled={urgentAlertsEnabled}
            setUrgentAlertsEnabled={setUrgentAlertsEnabled}
            onContinue={handleNext}
            onSkipPermissions={handleNext}
          />
        )}

        {currentStep === 'analysis' && (
          <AnalysisStep
            isAnalyzing={isAnalyzing}
            progress={analysisProgress}
            pulseAnim={pulseAnim}
            onCompleteOnboarding={() => router.replace('/(tabs)')}
            onFastForward={() => setIsAnalyzing(false)}
          />
        )}
      </ScrollView>

      {/* PERMISSION EXPLAINER MODAL (OAuth Simulation) */}
      <Modal
        visible={!!selectedAccountForExplainer}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedAccountForExplainer(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            {selectedAccountForExplainer && (
              <>
                <View style={styles.modalHeader}>
                  <View
                    style={[
                      styles.modalIconBox,
                      { backgroundColor: selectedAccountForExplainer.iconBg },
                    ]}
                  >
                    <Ionicons
                      name={selectedAccountForExplainer.iconName}
                      size={24}
                      color={selectedAccountForExplainer.iconColor}
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.modalKicker}>GÜVENLİ ENTEGRASYON</Text>
                    <Text style={styles.modalTitle}>
                      {selectedAccountForExplainer.name} erişimine neden ihtiyacımız var?
                    </Text>
                  </View>
                </View>

                <View style={styles.modalReasons}>
                  <View style={styles.reasonRow}>
                    <Ionicons name="sparkles" size={18} color={COLORS.primary} style={{ marginRight: 10 }} />
                    <Text style={styles.reasonText}>Son 72 saatteki önemli konuları ve e-postaları bulmak</Text>
                  </View>
                  <View style={styles.reasonRow}>
                    <Ionicons name="time" size={18} color={COLORS.primary} style={{ marginRight: 10 }} />
                    <Text style={styles.reasonText}>Cevap bekleyen ve acil eylemleri tespit etmek</Text>
                  </View>
                  <View style={styles.reasonRow}>
                    <Ionicons name="calendar" size={18} color={COLORS.primary} style={{ marginRight: 10 }} />
                    <Text style={styles.reasonText}>Toplantı çakışmalarını ve hazırlık notlarını derlemek</Text>
                  </View>
                </View>

                <View style={styles.securityBox}>
                  <View style={styles.securityRow}>
                    <Ionicons name="shield-checkmark" size={18} color={COLORS.success} />
                    <Text style={styles.securityText}>
                      <Text style={{ fontWeight: '700' }}>Sen onaylamadan asla</Text> e-posta gönderilmez veya silinmez.
                    </Text>
                  </View>
                  <View style={styles.securityRow}>
                    <Ionicons name="lock-closed" size={18} color={COLORS.success} />
                    <Text style={styles.securityText}>Verilerin reklam amacıyla kullanılmaz, satılmaz.</Text>
                  </View>
                  <View style={styles.securityRow}>
                    <Ionicons name="unlink" size={18} color={COLORS.success} />
                    <Text style={styles.securityText}>Bağlantıyı dilediğin an ayarlardan kaldırabilirsin.</Text>
                  </View>
                </View>

                <Pressable
                  style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
                  onPress={() => {
                    toggleAccount(selectedAccountForExplainer.id);
                    setSelectedAccountForExplainer(null);
                  }}
                >
                  <Text style={styles.primaryButtonText}>
                    {selectedAccountForExplainer.connected ? 'Bağlantıyı Kaldır' : 'Güvenli Şekilde Bağla'}
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.textButton}
                  onPress={() => setSelectedAccountForExplainer(null)}
                >
                  <Text style={styles.textButtonLabel}>Kapat</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ==========================================
// 1. WELCOME STEP
// ==========================================
function WelcomeStep({ onStart }: { onStart: () => void }) {
  return (
    <View style={styles.stepContainer}>
      {/* Brand Hero Card */}
      <View style={styles.heroDawnCard}>
        <View style={styles.heroLogoCircle}>
          <Ionicons name="sparkles" size={32} color={COLORS.primary} />
        </View>
        <Text style={styles.heroBrandKicker}>DİJİTAL ASİSTAN</Text>
        <Text style={styles.heroHeadline}>Bugün bilmen gerekenleri, sen sormadan söyler.</Text>
        <Text style={styles.heroSubtitle}>
          Mailini, takvimini ve yapman gerekenleri tek yerde anlar, gününü senin için organize eder.
        </Text>
      </View>

      {/* 3 Core Value Props */}
      <View style={styles.valueList}>
        <View style={styles.valueCard}>
          <View style={[styles.valueIconBox, { backgroundColor: '#FCEDE9' }]}>
            <Ionicons name="funnel" size={20} color={COLORS.critical} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.valueTitle}>Gürültüyü Azalt</Text>
            <Text style={styles.valueDesc}>
              127 maili tek tek okumak yerine, yalnızca dikkat etmen gereken 3-4 kritik konuyu gör.
            </Text>
          </View>
        </View>

        <View style={styles.valueCard}>
          <View style={[styles.valueIconBox, { backgroundColor: COLORS.primarySoft }]}>
            <Ionicons name="sunny" size={20} color={COLORS.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.valueTitle}>Sabah Brifingi</Text>
            <Text style={styles.valueDesc}>
              Her sabah 08:00'de gününün haritası cebinde. İster 1 dakikada oku, ister 2 dakikada dinle.
            </Text>
          </View>
        </View>

        <View style={styles.valueCard}>
          <View style={[styles.valueIconBox, { backgroundColor: COLORS.successSoft }]}>
            <Ionicons name="shield-checkmark" size={20} color={COLORS.success} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.valueTitle}>Kontrol Daima Sende</Text>
            <Text style={styles.valueDesc}>
              Sen onay vermeden asla mail göndermez, takvimine dokunmaz.
            </Text>
          </View>
        </View>
      </View>

      {/* CTA */}
      <View style={styles.bottomCtaContainer}>
        <Pressable
          style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
          onPress={onStart}
        >
          <Text style={styles.primaryButtonText}>Başlayalım</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </Pressable>
        <Text style={styles.subtleDisclaimer}>
          Kurulum yalnızca 1 dakika sürer · Kredi kartı gerekmez
        </Text>
      </View>
    </View>
  );
}

// ==========================================
// 2. CONNECT ACCOUNTS STEP
// ==========================================
function ConnectStep({
  accounts,
  connectedCount,
  onToggleAccount,
  onOpenExplainer,
  onContinue,
}: {
  accounts: AccountItem[];
  connectedCount: number;
  onToggleAccount: (id: string) => void;
  onOpenExplainer: (acc: AccountItem) => void;
  onContinue: () => void;
}) {
  return (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepHeading}>Dijital hayatını bağla.</Text>
        <Text style={styles.stepSubheading}>
          En az bir e-posta ve bir takvim bağlayarak asistanını etkinleştir. İstediğin zaman kaldırabilirsin.
        </Text>
      </View>

      {/* Accounts List */}
      <View style={styles.accountsList}>
        {accounts.map((item) => (
          <View key={item.id} style={styles.accountRowCard}>
            <View style={[styles.accountIconBox, { backgroundColor: item.iconBg }]}>
              <Ionicons name={item.iconName} size={22} color={item.iconColor} />
            </View>

            <Pressable
              style={{ flex: 1, marginRight: 10 }}
              onPress={() => onOpenExplainer(item)}
            >
              <Text style={styles.accountName}>{item.name}</Text>
              <Text style={styles.accountMeta}>
                {item.connected ? item.connectedMeta : item.meta}
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.accountActionButton,
                item.connected ? styles.accountButtonConnected : styles.accountButtonNotConnected,
                pressed && styles.pressed,
              ]}
              onPress={() => onToggleAccount(item.id)}
            >
              <Ionicons
                name={item.connected ? 'checkmark-circle' : 'add'}
                size={16}
                color={item.connected ? COLORS.success : COLORS.primaryText}
                style={{ marginRight: 4 }}
              />
              <Text
                style={[
                  styles.accountActionText,
                  { color: item.connected ? COLORS.success : COLORS.primaryText },
                ]}
              >
                {item.connected ? 'Bağlandı' : 'Bağla'}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>

      {/* Trust Notice Box */}
      <View style={styles.securityBox}>
        <View style={styles.securityRow}>
          <Ionicons name="shield-checkmark" size={18} color={COLORS.success} />
          <Text style={styles.securityText}>
            Sen onaylamadan kimseye e-posta gönderilmez. Verilerin reklam hedeflemesinde asla kullanılmaz.
          </Text>
        </View>
      </View>

      {/* Action Footer */}
      <View style={styles.bottomCtaContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            connectedCount === 0 && styles.buttonDisabled,
            pressed && styles.primaryButtonPressed,
          ]}
          disabled={connectedCount === 0}
          onPress={onContinue}
        >
          <Text style={styles.primaryButtonText}>
            {connectedCount > 0 ? `Devam Et · ${connectedCount} Hesap Bağlı` : 'En Az Bir Hesap Bağla'}
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </Pressable>
        <Text style={styles.subtleDisclaimer}>
          Gmail ve Google Takvim simülasyonu varsayılan olarak hazırdır.
        </Text>
      </View>
    </View>
  );
}

// ==========================================
// 3. PERMISSIONS STEP
// ==========================================
function PermissionsStep({
  pushEnabled,
  setPushEnabled,
  briefingEnabled,
  setBriefingEnabled,
  urgentAlertsEnabled,
  setUrgentAlertsEnabled,
  onContinue,
  onSkipPermissions,
}: {
  pushEnabled: boolean;
  setPushEnabled: (val: boolean) => void;
  briefingEnabled: boolean;
  setBriefingEnabled: (val: boolean) => void;
  urgentAlertsEnabled: boolean;
  setUrgentAlertsEnabled: (val: boolean) => void;
  onContinue: () => void;
  onSkipPermissions: () => void;
}) {
  return (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepHeading}>Sadece önemli olduğunda haber verelim.</Text>
        <Text style={styles.stepSubheading}>
          Günde ortalama 2–3 bildirim. Spam veya pazarlama bildirimleri yok.
        </Text>
      </View>

      {/* Simulated Live Notification Previews */}
      <View style={styles.previewContainer}>
        <Text style={styles.previewLabel}>ÖRNEK BİLDİRİMLER</Text>

        <View style={styles.notificationBubble}>
          <View style={styles.bubbleIconBox}>
            <Ionicons name="sparkles" size={16} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.bubbleHeader}>
              <Text style={styles.bubbleTitle}>Dijital Asistan</Text>
              <Text style={styles.bubbleTime}>14:10</Text>
            </View>
            <Text style={styles.bubbleContent}>
              Toplantına 20 dakika kaldı. Mehmet için 3 hazırlık konusu hazır.
            </Text>
          </View>
        </View>

        <View style={styles.notificationBubble}>
          <View style={styles.bubbleIconBox}>
            <Ionicons name="sparkles" size={16} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.bubbleHeader}>
              <Text style={styles.bubbleTitle}>Dijital Asistan</Text>
              <Text style={styles.bubbleTime}>08:00</Text>
            </View>
            <Text style={styles.bubbleContent}>
              Bugün cevaplaman gereken önemli bir mail var: Ahmet revize teklif bekliyor.
            </Text>
          </View>
        </View>

        <View style={styles.notificationBubble}>
          <View style={styles.bubbleIconBox}>
            <Ionicons name="sparkles" size={16} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.bubbleHeader}>
              <Text style={styles.bubbleTitle}>Dijital Asistan</Text>
              <Text style={styles.bubbleTime}>11:30</Text>
            </View>
            <Text style={styles.bubbleContent}>
              Kargon bugün geliyor. 14:00–18:00 arasında teslim edilecek.
            </Text>
          </View>
        </View>
      </View>

      {/* Permission Toggles */}
      <View style={styles.togglesCard}>
        <Pressable
          style={styles.toggleRow}
          onPress={() => setPushEnabled(!pushEnabled)}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.toggleTitle}>Anlık Bildirimler</Text>
            <Text style={styles.toggleDesc}>Kritik güncellemeler ve anlık gelişmeler</Text>
          </View>
          <View style={[styles.switchTrack, pushEnabled ? styles.switchOn : styles.switchOff]}>
            <View style={[styles.switchThumb, pushEnabled ? styles.switchThumbOn : styles.switchThumbOff]} />
          </View>
        </Pressable>

        <View style={styles.toggleDivider} />

        <Pressable
          style={styles.toggleRow}
          onPress={() => setBriefingEnabled(!briefingEnabled)}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.toggleTitle}>Sabah & Akşam Brifingleri</Text>
            <Text style={styles.toggleDesc}>08:00 sabah hazırlığı ve 19:00 gün sonu özeti</Text>
          </View>
          <View style={[styles.switchTrack, briefingEnabled ? styles.switchOn : styles.switchOff]}>
            <View style={[styles.switchThumb, briefingEnabled ? styles.switchThumbOn : styles.switchThumbOff]} />
          </View>
        </Pressable>

        <View style={styles.toggleDivider} />

        <Pressable
          style={styles.toggleRow}
          onPress={() => setUrgentAlertsEnabled(!urgentAlertsEnabled)}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.toggleTitle}>Acil ve Son Tarih Uyarıları</Text>
            <Text style={styles.toggleDesc}>Cevap bekleyen teklifler ve yaklaşan son teslimler</Text>
          </View>
          <View style={[styles.switchTrack, urgentAlertsEnabled ? styles.switchOn : styles.switchOff]}>
            <View style={[styles.switchThumb, urgentAlertsEnabled ? styles.switchThumbOn : styles.switchThumbOff]} />
          </View>
        </Pressable>
      </View>

      {/* Action Footer */}
      <View style={styles.bottomCtaContainer}>
        <Pressable
          style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
          onPress={onContinue}
        >
          <Text style={styles.primaryButtonText}>Bildirimleri Aç ve Devam Et</Text>
        </Pressable>

        <Pressable style={styles.textButton} onPress={onSkipPermissions}>
          <Text style={styles.textButtonLabel}>Şimdi Değil</Text>
        </Pressable>
      </View>
    </View>
  );
}

// ==========================================
// 4. FIRST ANALYSIS & DRAMATIC AHA MOMENT (Master Prompt 44 & 45)
// ==========================================
function AnalysisStep({
  isAnalyzing,
  progress,
  pulseAnim,
  onCompleteOnboarding,
  onFastForward,
}: {
  isAnalyzing: boolean;
  progress: number;
  pulseAnim: Animated.Value;
  onCompleteOnboarding: () => void;
  onFastForward: () => void;
}) {
  // Phase 1: Live Processing Screen (Madde 44)
  if (isAnalyzing) {
    return (
      <View style={[styles.stepContainer, styles.analysisDarkContainer]}>
        <View style={styles.analysisCenterBox}>
          {/* Pulsing AI Aura */}
          <Animated.View
            style={[
              styles.aiPulsingRing,
              {
                transform: [{ scale: pulseAnim }],
              },
            ]}
          >
            <View style={styles.aiCoreCircle}>
              <Ionicons name="sparkles" size={44} color="#FFFFFF" />
            </View>
          </Animated.View>

          <Text style={styles.analysisMainTitle}>Dijital hayatın analiz ediliyor…</Text>
          <Text style={styles.analysisSubtext}>
            Son 72 saat · Gmail ve Google Takvim taranıyor
          </Text>

          {/* Progressive Checklist */}
          <View style={styles.analysisStepsBox}>
            <View style={styles.analysisStepRow}>
              <Ionicons
                name={progress >= 25 ? 'checkmark-circle' : 'ellipse-outline'}
                size={20}
                color={progress >= 25 ? '#A9F0C1' : 'rgba(255,255,255,0.4)'}
              />
              <Text style={styles.analysisStepLabel}>Son 72 saat taranıyor (83 mail bulundu)</Text>
            </View>

            <View style={styles.analysisStepRow}>
              <Ionicons
                name={progress >= 50 ? 'checkmark-circle' : 'ellipse-outline'}
                size={20}
                color={progress >= 50 ? '#A9F0C1' : 'rgba(255,255,255,0.4)'}
              />
              <Text style={styles.analysisStepLabel}>E-postalar sınıflandırılıyor (4 önemli konu)</Text>
            </View>

            <View style={styles.analysisStepRow}>
              <Ionicons
                name={progress >= 75 ? 'checkmark-circle' : 'ellipse-outline'}
                size={20}
                color={progress >= 75 ? '#A9F0C1' : 'rgba(255,255,255,0.4)'}
              />
              <Text style={styles.analysisStepLabel}>Takvim ve toplantı çakışmaları inceleniyor</Text>
            </View>

            <View style={styles.analysisStepRow}>
              <Ionicons
                name={progress >= 100 ? 'checkmark-circle' : 'ellipse-outline'}
                size={20}
                color={progress >= 100 ? '#A9F0C1' : 'rgba(255,255,255,0.4)'}
              />
              <Text style={styles.analysisStepLabel}>Öncelikler ve brifing sıralanıyor</Text>
            </View>
          </View>

          <Pressable style={styles.fastForwardButton} onPress={onFastForward}>
            <Text style={styles.fastForwardText}>Sonuçları Hemen Gör →</Text>
          </Pressable>
        </View>

        <Text style={styles.analysisSecurityNote}>
          Verilerin cihazında özetlenir, hiçbir e-posta iznin olmadan paylaşılmaz.
        </Text>
      </View>
    );
  }

  // Phase 2: The Dramatic Reveal (Madde 45 - First Aha Moment!)
  return (
    <View style={styles.stepContainer}>
      {/* Dramatic Reveal Header Card */}
      <View style={styles.ahaHeroCard}>
        <View style={styles.ahaReadyBadge}>
          <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
          <Text style={styles.ahaReadyText}>HAZIR</Text>
        </View>

        {/* Master Prompt Madde 45 specific statement: 'Son 72 saatte 83 mailin geldi, 4'ü önemli' */}
        <Text style={styles.ahaTitle}>
          Son 72 saatte 83 mailin geldi,{'\n'}
          <Text style={{ color: '#C9C9FF' }}>4'ü önemli.</Text>
        </Text>

        <Text style={styles.ahaSubtitle}>
          Gereksiz bülten ve bildirimleri ayıkladık, dikkat etmen gereken kritik başlıkları çıkardık:
        </Text>

        {/* Metric counter pills */}
        <View style={styles.statPillsRow}>
          <View style={styles.statPill}>
            <Text style={styles.statPillNumber}>83</Text>
            <Text style={styles.statPillLabel}>Taranan Mail</Text>
          </View>
          <View style={styles.statPill}>
            <Text style={[styles.statPillNumber, { color: '#C9C9FF' }]}>4</Text>
            <Text style={styles.statPillLabel}>Önemli Konu</Text>
          </View>
          <View style={styles.statPill}>
            <Text style={styles.statPillNumber}>3</Text>
            <Text style={styles.statPillLabel}>Toplantı</Text>
          </View>
          <View style={styles.statPill}>
            <Text style={styles.statPillNumber}>2</Text>
            <Text style={styles.statPillLabel}>Açık Takip</Text>
          </View>
        </View>
      </View>

      {/* 4 Personalized Sample Cards (Design System Standards) */}
      <View style={styles.ahaCardsSection}>
        <Text style={styles.ahaCardsSectionTitle}>BULUNAN ÖNCELİKLER</Text>

        {/* Card 1: ACİL */}
        <View style={styles.priorityCard}>
          <View style={styles.priorityCardHeader}>
            <View style={[styles.badgePill, { backgroundColor: COLORS.criticalSoft }]}>
              <Text style={[styles.badgeText, { color: COLORS.critical }]}>ACİL</Text>
            </View>
            <Text style={styles.cardTime}>08:42 · Gmail</Text>
          </View>
          <Text style={styles.cardTitle}>Ahmet senden revize teklif bekliyor.</Text>
          <Text style={styles.cardDesc}>
            Ahmet Yılmaz bugün saat 17:00'ye kadar revize fiyat tablosunu iletmeni bekliyor.
          </Text>
          <View style={styles.cardActionRow}>
            <View style={styles.cardTag}>
              <Ionicons name="mail" size={14} color={COLORS.primaryText} />
              <Text style={styles.cardTagText}>Ahmet Yılmaz</Text>
            </View>
            <View style={styles.cardSuggestedAction}>
              <Text style={styles.cardActionText}>Yanıt Taslağı Hazır</Text>
            </View>
          </View>
        </View>

        {/* Card 2: TOPLANTI */}
        <View style={styles.priorityCard}>
          <View style={styles.priorityCardHeader}>
            <View style={[styles.badgePill, { backgroundColor: COLORS.infoSoft }]}>
              <Text style={[styles.badgeText, { color: COLORS.info }]}>TOPLANTI</Text>
            </View>
            <Text style={styles.cardTime}>14:30 · Takvim</Text>
          </View>
          <Text style={styles.cardTitle}>Mehmet ile Müşteri Toplantısı</Text>
          <Text style={styles.cardDesc}>
            Google Meet üzerinden 45 dakikalık görüşme. Son görüşme notları derlendi.
          </Text>
          <View style={styles.cardActionRow}>
            <View style={styles.cardTag}>
              <Ionicons name="videocam" size={14} color={COLORS.primaryText} />
              <Text style={styles.cardTagText}>Google Meet</Text>
            </View>
            <View style={styles.cardSuggestedAction}>
              <Text style={styles.cardActionText}>Hazırlık Notları Hazır</Text>
            </View>
          </View>
        </View>

        {/* Card 3: SON TARİH */}
        <View style={styles.priorityCard}>
          <View style={styles.priorityCardHeader}>
            <View style={[styles.badgePill, { backgroundColor: COLORS.warningSoft }]}>
              <Text style={[styles.badgeText, { color: COLORS.warning }]}>SON TARİH</Text>
            </View>
            <Text style={styles.cardTime}>Bugün 17:00</Text>
          </View>
          <Text style={styles.cardTitle}>Sözleşme Taslağı Onayı</Text>
          <Text style={styles.cardDesc}>
            Hukuk departmanına gönderilecek sözleşmenin 4. maddesi için son onay saati.
          </Text>
          <View style={styles.cardActionRow}>
            <View style={styles.cardTag}>
              <Ionicons name="document-text" size={14} color={COLORS.primaryText} />
              <Text style={styles.cardTagText}>Hukuk İşleri</Text>
            </View>
            <View style={styles.cardSuggestedAction}>
              <Text style={styles.cardActionText}>Belgeyi İncele</Text>
            </View>
          </View>
        </View>

        {/* Card 4: TAKİP */}
        <View style={styles.priorityCard}>
          <View style={styles.priorityCardHeader}>
            <View style={[styles.badgePill, { backgroundColor: COLORS.surfaceSoft }]}>
              <Text style={[styles.badgeText, { color: COLORS.inkSecondary }]}>TAKİP</Text>
            </View>
            <Text style={styles.cardTime}>3 Gündür Yanıt Yok</Text>
          </View>
          <Text style={styles.cardTitle}>Selin Kaya — Teklife Yanıt Bekleniyor</Text>
          <Text style={styles.cardDesc}>
            Pazartesi günü gönderilen teklife henüz geri dönüş yapılmadı. Nazik bir takip önerildi.
          </Text>
          <View style={styles.cardActionRow}>
            <View style={styles.cardTag}>
              <Ionicons name="person" size={14} color={COLORS.primaryText} />
              <Text style={styles.cardTagText}>Selin Kaya</Text>
            </View>
            <View style={styles.cardSuggestedAction}>
              <Text style={styles.cardActionText}>Takip Gönder</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Master Prompt Madde 45 CTA: 'Brifingimi Gör' with router.replace('/(tabs)') */}
      <View style={styles.bottomCtaContainer}>
        <Pressable
          style={({ pressed }) => [styles.grandCtaButton, pressed && styles.primaryButtonPressed]}
          onPress={onCompleteOnboarding}
        >
          <Ionicons name="sparkles" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.grandCtaText}>Brifingimi Gör</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </Pressable>
        <Text style={styles.subtleDisclaimer}>
          Kurulum tamamlandı. Dijital Asistanın ana kontrol paneline aktarılıyorsun.
        </Text>
      </View>
    </View>
  );
}

// ==========================================
// STYLES
// ==========================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  navBar: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(27,25,23,0.06)',
    backgroundColor: COLORS.background,
  },
  navButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  stepIndicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIndicatorText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.inkTertiary,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  progressBarBg: {
    width: 100,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E2E1DC',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  skipButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  skipButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.inkSecondary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  stepContainer: {
    paddingTop: 16,
  },
  stepHeader: {
    marginBottom: 20,
  },
  stepHeading: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.ink,
    lineHeight: 34,
    letterSpacing: -0.5,
  },
  stepSubheading: {
    fontSize: 15,
    color: COLORS.inkSecondary,
    lineHeight: 22,
    marginTop: 8,
  },

  // Welcome Hero
  heroDawnCard: {
    backgroundColor: COLORS.darkDawn,
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#1E1E4C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  heroLogoCircle: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  heroBrandKicker: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  heroHeadline: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 30,
    letterSpacing: -0.4,
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 20,
  },

  // Value props
  valueList: {
    gap: 12,
    marginBottom: 28,
  },
  valueCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  valueIconBox: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  valueTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.ink,
    marginBottom: 3,
  },
  valueDesc: {
    fontSize: 13,
    color: COLORS.inkSecondary,
    lineHeight: 18,
  },

  // Connect Accounts List
  accountsList: {
    gap: 10,
    marginBottom: 18,
  },
  accountRowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  accountIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  accountName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.ink,
  },
  accountMeta: {
    fontSize: 12,
    color: COLORS.inkSecondary,
    marginTop: 2,
  },
  accountActionButton: {
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountButtonConnected: {
    backgroundColor: COLORS.successSoft,
  },
  accountButtonNotConnected: {
    backgroundColor: COLORS.primarySoft,
  },
  accountActionText: {
    fontSize: 13,
    fontWeight: '600',
  },

  // Notification Previews
  previewContainer: {
    marginBottom: 20,
  },
  previewLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.inkTertiary,
    letterSpacing: 0.8,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  notificationBubble: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.92)',
    padding: 14,
    borderRadius: 18,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  bubbleIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bubbleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  bubbleTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.ink,
  },
  bubbleTime: {
    fontSize: 11,
    color: COLORS.inkTertiary,
  },
  bubbleContent: {
    fontSize: 13,
    color: COLORS.ink,
    lineHeight: 18,
  },

  // Toggles
  togglesCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  toggleTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.ink,
  },
  toggleDesc: {
    fontSize: 12,
    color: COLORS.inkSecondary,
    marginTop: 2,
  },
  toggleDivider: {
    height: 1,
    backgroundColor: 'rgba(27,25,23,0.06)',
    marginVertical: 10,
  },
  switchTrack: {
    width: 48,
    height: 28,
    borderRadius: 14,
    padding: 2,
    justifyContent: 'center',
  },
  switchOn: {
    backgroundColor: COLORS.primary,
  },
  switchOff: {
    backgroundColor: '#D9D6D0',
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  switchThumbOn: {
    alignSelf: 'flex-end',
  },
  switchThumbOff: {
    alignSelf: 'flex-start',
  },

  // Security box
  securityBox: {
    backgroundColor: COLORS.successSoft,
    padding: 14,
    borderRadius: 16,
    marginBottom: 20,
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 3,
  },
  securityText: {
    flex: 1,
    fontSize: 12.5,
    lineHeight: 18,
    color: '#1E5A36',
  },

  // Analysis Phase 1 (Dark Processing Mode)
  analysisDarkContainer: {
    backgroundColor: COLORS.darkNight,
    borderRadius: 28,
    padding: 24,
    minHeight: 520,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 8,
  },
  analysisCenterBox: {
    alignItems: 'center',
    width: '100%',
    paddingTop: 10,
  },
  aiPulsingRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(91, 92, 226, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  aiCoreCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 6,
  },
  analysisMainTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  analysisSubtext: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 6,
    textAlign: 'center',
    marginBottom: 24,
  },
  analysisStepsBox: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },
  analysisStepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  analysisStepLabel: {
    flex: 1,
    fontSize: 13.5,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  fastForwardButton: {
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  fastForwardText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  analysisSecurityNote: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 16,
  },

  // Analysis Phase 2: Dramatic Aha Reveal (Madde 45)
  ahaHeroCard: {
    backgroundColor: COLORS.darkDawn,
    borderRadius: 26,
    padding: 22,
    marginBottom: 20,
    shadowColor: '#1E1E4C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 6,
  },
  ahaReadyBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },
  ahaReadyText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.success,
    letterSpacing: 0.6,
  },
  ahaTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  ahaSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
    lineHeight: 18,
  },
  statPillsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)',
  },
  statPill: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
  },
  statPillNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statPillLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
    textAlign: 'center',
  },

  // Priority Cards
  ahaCardsSection: {
    gap: 12,
    marginBottom: 24,
  },
  ahaCardsSectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.inkTertiary,
    letterSpacing: 0.8,
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  priorityCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  priorityCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgePill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cardTime: {
    fontSize: 12,
    color: COLORS.inkTertiary,
    fontWeight: '500',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.ink,
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  cardDesc: {
    fontSize: 13,
    color: COLORS.inkSecondary,
    lineHeight: 18,
    marginTop: 4,
  },
  cardActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(27,25,23,0.06)',
  },
  cardTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primaryText,
  },
  cardSuggestedAction: {
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  cardActionText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primaryText,
  },

  // Buttons & CTAs
  bottomCtaContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  primaryButton: {
    width: '100%',
    height: 52,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 3,
  },
  primaryButtonPressed: {
    backgroundColor: COLORS.primaryPressed,
    transform: [{ scale: 0.98 }],
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  grandCtaButton: {
    width: '100%',
    height: 54,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 4,
  },
  grandCtaText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  textButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  textButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.inkSecondary,
  },
  subtleDisclaimer: {
    fontSize: 12,
    color: COLORS.inkTertiary,
    marginTop: 10,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(27, 25, 23, 0.45)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 44 : 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },
  modalHandle: {
    width: 38,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E0DED7',
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalKicker: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.inkTertiary,
    letterSpacing: 0.8,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.ink,
    lineHeight: 22,
    marginTop: 2,
  },
  modalReasons: {
    backgroundColor: COLORS.surfaceSoft,
    padding: 14,
    borderRadius: 16,
    gap: 10,
    marginBottom: 16,
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reasonText: {
    flex: 1,
    fontSize: 13.5,
    color: COLORS.ink,
    lineHeight: 18,
  },
});
