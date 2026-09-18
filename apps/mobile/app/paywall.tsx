import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Share,
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
  success: '#1E7A47',
  successSoft: '#E4F5EA',
  warning: '#9A6300',
  warningSoft: '#FDF2DC',
};

type PlanTier = 'yearly' | 'monthly';

export default function PaywallScreen() {
  const [selectedPlan, setSelectedPlan] = useState<PlanTier>('yearly');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleShareReferral = async () => {
    try {
      await Share.share({
        message: 'Dijital Asistan ile dijital hayatımı tek brifingde yönetiyorum. Sen de katıl, ikimiz de 14 gün ücretsiz PRO kazanalım! Davet kodum: YUNUS14PRO',
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubscribe = () => {
    showToast('✓ 7 Günlük Ücretsiz PRO Denemeniz Başlatıldı!');
    setTimeout(() => {
      router.back();
    }, 1500);
  };

  const comparisonRows = [
    { title: 'Sabah & Akşam Brifingi', free: 'Günde 1 kez', pro: 'Sınırsız + Sesli' },
    { title: 'Mail & Takvim Zekâsı', free: 'Son 7 gün', pro: 'Tüm Geçmiş' },
    { title: 'Onaylı İşlem & Yanıt Taslağı', free: 'Günde 3 adet', pro: 'Sınırsız' },
    { title: 'Evrensel Yakalama (Fotoğraf/PDF)', free: 'Ayda 5 adet', pro: 'Sınırsız' },
    { title: 'AI Anlamsal Hafıza Araması', free: 'Temel', pro: 'Tam Kapsamlı' },
    { title: 'VIP Kişi Analitiği', free: '1 kişi', pro: 'Sınırsız' },
    { title: 'Çift Hesap Entegrasyonu', free: '1 hesap', pro: 'Sınırsız' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#EDEDFC" />

      {/* Toast Notification */}
      {toastMsg && (
        <View style={styles.toast}>
          <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
          <Text style={styles.toastText}>{toastMsg}</Text>
        </View>
      )}

      {/* Top Header Actions */}
      <View style={styles.topBar}>
        <Pressable
          style={styles.circleCloseBtn}
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={20} color={COLORS.ink} />
        </Pressable>
        <Pressable
          onPress={() => showToast('Satın alımlarınız kontrol edildi ve güncellendi.')}
        >
          <Text style={styles.restoreBtnText}>Satın alımı geri yükle</Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Branding */}
        <View style={styles.heroSection}>
          <View style={styles.proBadgeRow}>
            <Ionicons name="sparkles" size={15} color={COLORS.primary} />
            <Text style={styles.proBadgeText}>DİJİTAL ASİSTAN PRO</Text>
          </View>

          <Text style={styles.heroTitle}>
            Tüm dijital hayatın, tek brifingde.
          </Text>

          <Text style={styles.heroProofText}>
            Bu hafta <Text style={{ fontWeight: '700', color: COLORS.ink }}>684 mailden 32'sini</Text> öne çıkardık;{' '}
            <Text style={{ fontWeight: '700', color: COLORS.primaryDark }}>2 sa 48 dk</Text> kazandın.
          </Text>
        </View>

        {/* Feature Comparison Card */}
        <View style={styles.comparisonCard}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.tableColHeader, { flex: 1 }]}>ÖZELLİK</Text>
            <Text style={[styles.tableColHeader, { width: 70, textAlign: 'center' }]}>FREE</Text>
            <Text style={[styles.tableColHeader, { width: 70, textAlign: 'center', color: COLORS.primary }]}>PRO</Text>
          </View>

          {comparisonRows.map((row, idx) => (
            <View
              key={idx}
              style={[
                styles.tableRow,
                idx > 0 && styles.tableRowBorder,
              ]}
            >
              <Text style={styles.tableRowTitle}>{row.title}</Text>
              <Text style={styles.tableRowFree}>{row.free}</Text>
              <View style={styles.tableRowProWrap}>
                <Ionicons name="checkmark-circle" size={18} color={COLORS.primary} />
              </View>
            </View>
          ))}
        </View>

        {/* Plan Selectors */}
        <View style={styles.plansContainer}>
          {/* Yearly Plan (Best Value) */}
          <Pressable
            style={[
              styles.planCard,
              selectedPlan === 'yearly' && styles.planCardActive,
            ]}
            onPress={() => setSelectedPlan('yearly')}
          >
            <View style={[styles.radioCircle, selectedPlan === 'yearly' && styles.radioCircleActive]}>
              {selectedPlan === 'yearly' && <View style={styles.radioInnerDot} />}
            </View>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <View style={styles.planTitleRow}>
                <Text style={styles.planName}>Yıllık</Text>
                <View style={styles.bestValueBadge}>
                  <Text style={styles.bestValueBadgeText}>EN AVANTAJLI</Text>
                </View>
              </View>
              <Text style={styles.planPriceDesc}>
                1.490 TL / yıl · <Text style={{ fontWeight: '700' }}>ayda 124 TL</Text> · %38 tasarruf
              </Text>
            </View>
          </Pressable>

          {/* Monthly Plan */}
          <Pressable
            style={[
              styles.planCard,
              selectedPlan === 'monthly' && styles.planCardActive,
            ]}
            onPress={() => setSelectedPlan('monthly')}
          >
            <View style={[styles.radioCircle, selectedPlan === 'monthly' && styles.radioCircleActive]}>
              {selectedPlan === 'monthly' && <View style={styles.radioInnerDot} />}
            </View>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.planName}>Aylık</Text>
              <Text style={styles.planPriceDesc}>199 TL / ay · İstediğin zaman iptal et</Text>
            </View>
          </Pressable>
        </View>

        {/* Referral Card (Madde 51) */}
        <Pressable
          style={styles.referralBanner}
          onPress={handleShareReferral}
        >
          <View style={styles.giftIconWrap}>
            <Ionicons name="gift-outline" size={20} color={COLORS.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.referralTitle}>Arkadaşını Davet Et</Text>
            <Text style={styles.referralDesc}>İkiniz de 14 gün ücretsiz Pro kazanın (Kod: YUNUS14PRO)</Text>
          </View>
          <Ionicons name="share-social-outline" size={18} color={COLORS.primaryDark} />
        </Pressable>

        {/* CTA Buttons */}
        <View style={styles.ctaContainer}>
          <Pressable
            style={styles.mainSubscribeBtn}
            onPress={handleSubscribe}
          >
            <Text style={styles.mainSubscribeBtnText}>Ücretsiz Dene · 7 gün</Text>
          </Pressable>

          <Pressable
            style={styles.freeContinueBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.freeContinueBtnText}>Free ile devam et</Text>
          </Pressable>

          <Text style={styles.legalDisclaimer}>
            7 gün sonra {selectedPlan === 'yearly' ? '1.490 TL/yıl' : '199 TL/ay'}. Deneme süresi bitmeden 24 saat önce bildirimle hatırlatırız. İstediğin an App Store hesabından iptal edebilirsin.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EDEDFC',
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
    paddingVertical: 12,
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
    shadowRadius: 3,
    elevation: 2,
  },
  restoreBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.inkSecondary,
  },
  scrollArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  heroSection: {
    marginBottom: 20,
  },
  proBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  proBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    color: COLORS.primary,
  },
  heroTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: -0.4,
    color: COLORS.ink,
    marginTop: 8,
  },
  heroProofText: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.inkSecondary,
    marginTop: 6,
  },
  comparisonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#ECECF4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F8',
  },
  tableColHeader: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
    color: COLORS.inkTertiary,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
  },
  tableRowBorder: {
    borderTopWidth: 1,
    borderTopColor: '#F8F8FC',
  },
  tableRowTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.ink,
  },
  tableRowFree: {
    width: 70,
    textAlign: 'center',
    fontSize: 11,
    color: COLORS.inkTertiary,
  },
  tableRowProWrap: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plansContainer: {
    gap: 10,
    marginBottom: 16,
  },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E8E8F0',
  },
  planCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#FFFFFF',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#C9C5BC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: COLORS.primary,
  },
  radioInnerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  planTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  planName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.ink,
  },
  bestValueBadge: {
    backgroundColor: COLORS.successSoft,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  bestValueBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
    color: COLORS.success,
  },
  planPriceDesc: {
    fontSize: 13,
    color: COLORS.inkSecondary,
    marginTop: 2,
  },
  referralBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E6E6FA',
    gap: 12,
    marginBottom: 20,
  },
  giftIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  referralTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.ink,
  },
  referralDesc: {
    fontSize: 12,
    color: COLORS.inkSecondary,
    marginTop: 2,
  },
  ctaContainer: {
    alignItems: 'center',
  },
  mainSubscribeBtn: {
    width: '100%',
    height: 52,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 4,
  },
  mainSubscribeBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  freeContinueBtn: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  freeContinueBtnText: {
    color: COLORS.inkSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  legalDisclaimer: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.inkTertiary,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 12,
  },
});
