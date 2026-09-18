import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Share,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
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
  audioBgStart: '#15153A',
  audioBgMid: '#25266A',
  audioBgEnd: '#3B3CA8',
  critical: '#C7432F',
  criticalSoft: '#FCEDE9',
  warning: '#9A6300',
  warningSoft: '#FDF2DC',
  success: '#1E7A47',
  successSoft: '#E4F5EA',
};

interface BriefingSection {
  id: string;
  title: string;
  items: {
    icon: string;
    title: string;
    subtitle: string;
    tag?: string;
    tagColor?: string;
    tagBg?: string;
    onPress?: () => void;
  }[];
}

const CHAPTERS = [
  { id: 1, title: 'Genel bakış', duration: 18, start: 0 },
  { id: 2, title: 'Bugünün öncelikleri', duration: 35, start: 18 },
  { id: 3, title: 'Programın', duration: 24, start: 53 },
  { id: 4, title: 'Cevap bekleyenler', duration: 21, start: 77 },
  { id: 5, title: 'Son tarihler', duration: 17, start: 98 },
  { id: 6, title: 'Kişisel gelişmeler', duration: 19, start: 115 },
];

const TOTAL_DURATION = 134; // 2 min 14 sec

export default function MorningBriefingScreen() {
  const params = useLocalSearchParams();
  const [audioMode, setAudioMode] = useState<boolean>(params.autoPlay === 'true');
  const [isPlaying, setIsPlaying] = useState<boolean>(params.autoPlay === 'true');
  const [currentTime, setCurrentTime] = useState<number>(38);
  const [speed, setSpeed] = useState<string>('1.0x');
  const timerRef = useRef<any>(null);

  // Audio timer simulation
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime(t => {
          if (t >= TOTAL_DURATION) {
            setIsPlaying(false);
            return 0;
          }
          return t + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const toggleSpeed = () => {
    if (speed === '1.0x') setSpeed('1.25x');
    else if (speed === '1.25x') setSpeed('1.5x');
    else setSpeed('1.0x');
  };

  const seekRelative = (sec: number) => {
    setCurrentTime(t => Math.max(0, Math.min(TOTAL_DURATION, t + sec)));
  };

  const currentChapter = CHAPTERS.find(
    ch => currentTime >= ch.start && currentTime < ch.start + ch.duration
  ) || CHAPTERS[0];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Sabah Brifingi (16 Eylül): Bugün bilmen gereken 5 şey var. Dijital Asistan ile gününüzü kontrol altına alın.',
      });
    } catch (e) {
      console.log(e);
    }
  };

  const briefingSections: BriefingSection[] = [
    {
      id: 'sec-1',
      title: 'BUGÜNÜN ÖNCELİKLERİ',
      items: [
        {
          icon: 'alert-circle-outline',
          title: "Ahmet Yılmaz'a revize fiyat teklifi ilet",
          subtitle: 'Bugün 17:00 bütçe komitesi toplantısına yetişmeli',
          tag: '17:00 ACİL',
          tagColor: COLORS.critical,
          tagBg: COLORS.criticalSoft,
          onPress: () => router.push('/email-detail?id=email-1'),
        },
        {
          icon: 'calendar-outline',
          title: '14:30 Mehmet Demir ile müşteri toplantısı',
          subtitle: 'Google Meet · 60 dk · Hazırlık kartı hazır',
          tag: 'TOPLANTI',
          tagColor: COLORS.inkSecondary,
          tagBg: '#F0EFEB',
          onPress: () => router.push('/meeting-prep'),
        },
      ],
    },
    {
      id: 'sec-2',
      title: 'PROGRAMIN VE ODAK BLOKLARI',
      items: [
        {
          icon: 'cafe-outline',
          title: '09:00 – 14:00 Arası Boşluk',
          subtitle: 'Öğleye kadar toplantın bulunmuyor, derin çalışma için ideal',
        },
        {
          icon: 'videocam-outline',
          title: '14:30 – 15:30 Müşteri Toplantısı',
          subtitle: 'Mehmet Demir, Selin Kaya · Sunum ve sözleşme revizyonu',
          onPress: () => router.push('/meeting-prep'),
        },
        {
          icon: 'sparkles-outline',
          title: '16:00 – 17:00 Teklif Hazırlama (Odak Bloğu)',
          subtitle: 'Takvim Zekâsı tarafından korunan odak zamanı',
        },
      ],
    },
    {
      id: 'sec-3',
      title: 'CEVAP BEKLEYENLER',
      items: [
        {
          icon: 'mail-unread-outline',
          title: 'Ahmet Yılmaz (TeknoAS)',
          subtitle: 'Revize Fiyat Teklifi ve Sözleşme Şartları · 08:42',
          tag: 'Cevap Bekliyor',
          tagColor: COLORS.critical,
          tagBg: COLORS.criticalSoft,
          onPress: () => router.push('/email-detail?id=email-1'),
        },
        {
          icon: 'mail-outline',
          title: 'Selin Kaya (Hukuk & Finans)',
          subtitle: 'Sözleşme 4. madde cezai şart revizyonu hakkında soru',
          tag: 'Yarına Kadar',
          tagColor: COLORS.warning,
          tagBg: COLORS.warningSoft,
        },
      ],
    },
    {
      id: 'sec-4',
      title: 'SENDEN BEKLENENLER VE TAAHHÜTLER',
      items: [
        {
          icon: 'hand-left-outline',
          title: '6 Ekim teslimat takvimini paylaşma taahhüdü',
          subtitle: 'Dünkü toplantıda Mehmet Demir\'e söz verildi',
          tag: 'Taahhüt',
          tagColor: COLORS.primaryDark,
          tagBg: COLORS.primarySoft,
        },
      ],
    },
    {
      id: 'sec-5',
      title: 'SON TARİHLER',
      items: [
        {
          icon: 'timer-outline',
          title: 'Girişim Hızlandırma Programı Başvurusu',
          subtitle: 'Son teslim saati: Bugün 17:00',
          tag: '17:00',
          tagColor: COLORS.critical,
          tagBg: COLORS.criticalSoft,
        },
        {
          icon: 'receipt-outline',
          title: 'CK Enerji Elektrik Faturası',
          subtitle: '1.842 TL · Son ödeme günü: Dün (Gecikmeye girmemesi için bugün ödeyin)',
          tag: 'Fatura',
          tagColor: COLORS.warning,
          tagBg: COLORS.warningSoft,
        },
      ],
    },
    {
      id: 'sec-6',
      title: 'KİŞİSEL GELİŞMELER',
      items: [
        {
          icon: 'cube-outline',
          title: 'Trendyol Sipariş Dağıtımı',
          subtitle: 'Yurtiçi Kargo kuryesi 14:00–18:00 arası teslim edecek',
        },
      ],
    },
  ];

  // If in voice audio player mode
  if (audioMode) {
    const progressPercent = (currentTime / TOTAL_DURATION) * 100;

    return (
      <SafeAreaView style={styles.audioContainer}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.audioBgStart} />
        
        {/* Audio Top Bar */}
        <View style={styles.audioTopBar}>
          <Pressable
            style={styles.audioCircleBtn}
            onPress={() => setAudioMode(false)}
          >
            <Ionicons name="chevron-down" size={24} color="#FFFFFF" />
          </Pressable>
          <Text style={styles.audioTopTitle}>SESLİ BRİFİNG</Text>
          <Pressable
            style={styles.audioSpeedBadge}
            onPress={toggleSpeed}
          >
            <Text style={styles.audioSpeedText}>{speed}</Text>
          </Pressable>
        </View>

        {/* Audio Info */}
        <View style={styles.audioMetaBlock}>
          <Text style={styles.audioMainTitle}>Sabah Brifingi</Text>
          <Text style={styles.audioSubtitle}>
            16 Eylül · 2 dk 14 sn · Türkçe Doğal AI Seslendirme
          </Text>
        </View>

        {/* Waveform Visualization Bars */}
        <View style={styles.waveformContainer}>
          {[
            18, 32, 45, 60, 85, 40, 70, 95, 110, 80, 65, 90, 105, 75, 50, 88, 62, 44, 78,
            95, 110, 80, 55, 38, 60, 85, 100, 70, 48, 25,
          ].map((height, i) => {
            const active = (i / 30) * 100 <= progressPercent;
            return (
              <View
                key={i}
                style={[
                  styles.waveformBar,
                  { height: isPlaying ? height : Math.max(14, height * 0.4) },
                  active && styles.waveformBarActive,
                ]}
              />
            );
          })}
        </View>

        {/* Scrubber / Progress Bar */}
        <View style={styles.scrubberContainer}>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>
          <View style={styles.progressTimeRow}>
            <Text style={styles.progressTimeText}>{formatTime(currentTime)}</Text>
            <Text style={styles.progressTimeText}>{formatTime(TOTAL_DURATION)}</Text>
          </View>
        </View>

        {/* Playback Controls */}
        <View style={styles.controlsRow}>
          <Pressable
            style={styles.rewindBtn}
            onPress={() => seekRelative(-15)}
          >
            <Ionicons name="play-back" size={26} color="#FFFFFF" />
            <Text style={styles.rewindBtnText}>15</Text>
          </Pressable>

          <Pressable
            style={styles.mainPlayBtn}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={36}
              color={COLORS.audioBgMid}
            />
          </Pressable>

          <Pressable
            style={styles.rewindBtn}
            onPress={() => seekRelative(15)}
          >
            <Ionicons name="play-forward" size={26} color="#FFFFFF" />
            <Text style={styles.rewindBtnText}>15</Text>
          </Pressable>
        </View>

        {/* Chapters List */}
        <View style={styles.chaptersContainer}>
          <Text style={styles.chaptersHeader}>BÖLÜMLER</Text>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {CHAPTERS.map(ch => {
              const isCurrent = currentChapter.id === ch.id;
              return (
                <Pressable
                  key={ch.id}
                  style={[styles.chapterRow, isCurrent && styles.chapterRowActive]}
                  onPress={() => {
                    setCurrentTime(ch.start);
                    setIsPlaying(true);
                  }}
                >
                  <Text style={[styles.chapterNum, isCurrent && { color: '#FFFFFF' }]}>
                    0{ch.id}
                  </Text>
                  <Text style={[styles.chapterTitle, isCurrent && { color: '#FFFFFF', fontWeight: '700' }]}>
                    {ch.title}
                  </Text>
                  {isCurrent ? (
                    <Ionicons name="volume-medium" size={18} color="#FFFFFF" />
                  ) : (
                    <Text style={styles.chapterDuration}>{formatTime(ch.duration)}</Text>
                  )}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Return to text CTA */}
        <Pressable
          style={styles.returnToTextBtn}
          onPress={() => setAudioMode(false)}
        >
          <Ionicons name="document-text-outline" size={17} color="rgba(255,255,255,0.85)" />
          <Text style={styles.returnToTextBtnLabel}>Yazılı Brifinge Dön</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  // Text / Editorial Reading Mode
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1E1E4C" />

      {/* Dawn Gradient Hero Header */}
      <View style={styles.dawnHeroHeader}>
        <View style={styles.headerTopActions}>
          <Pressable
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </Pressable>
          <Pressable
            style={styles.backBtn}
            onPress={handleShare}
          >
            <Ionicons name="share-outline" size={20} color="#FFFFFF" />
          </Pressable>
        </View>

        <Text style={styles.dawnOverline}>SABAH BRİFİNGİ · 16 EYLÜL</Text>
        <Text style={styles.dawnGreeting}>Günaydın Yunus</Text>
        <Text style={styles.dawnSub}>Bugün oldukça sakin bir günün var.</Text>
      </View>

      {/* Scrollable Editorial Content */}
      <ScrollView
        style={styles.editorialScroll}
        contentContainerStyle={styles.editorialScrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Narrative editorial paragraph */}
        <View style={styles.editorialCard}>
          <Text style={styles.editorialParagraph}>
            Öğlene kadar toplantın bulunmuyor. Saat 14:30'da Mehmet ile müşteri toplantın var. Toplantı öncesinde dün gelen fiyat teklifine bakman faydalı olabilir. Gelen 46 mail arasında 3 konu dikkat gerektiriyor.
          </Text>
        </View>

        {/* 6 Structured Sections */}
        {briefingSections.map(sec => (
          <View key={sec.id} style={styles.sectionBlock}>
            <Text style={styles.sectionHeading}>{sec.title}</Text>
            <View style={styles.sectionCard}>
              {sec.items.map((item, idx) => (
                <Pressable
                  key={idx}
                  style={[
                    styles.sectionItemRow,
                    idx > 0 && styles.sectionItemBorder,
                  ]}
                  onPress={item.onPress}
                >
                  <View style={styles.itemIconWrap}>
                    <Ionicons name={item.icon} size={18} color={COLORS.inkSecondary} />
                  </View>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                  </View>
                  {item.tag && (
                    <View style={[styles.itemTag, { backgroundColor: item.tagBg }]}>
                      <Text style={[styles.itemTagText, { color: item.tagColor }]}>
                        {item.tag}
                      </Text>
                    </View>
                  )}
                  {item.onPress && (
                    <Ionicons name="chevron-forward" size={16} color={COLORS.inkTertiary} style={{ marginLeft: 4 }} />
                  )}
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        {/* Analysis verification footer */}
        <View style={styles.verifiedBox}>
          <Ionicons name="shield-checkmark" size={16} color={COLORS.primary} />
          <Text style={styles.verifiedText}>
            46 mail, 1 takvim, 3 gün geçmiş analiz edildi · 07:58
          </Text>
        </View>
      </ScrollView>

      {/* Floating Bottom Audio CTA */}
      <View style={styles.bottomAudioBar}>
        <Pressable
          style={styles.listenCtaBtn}
          onPress={() => {
            setAudioMode(true);
            setIsPlaying(true);
          }}
        >
          <Ionicons name="headset" size={20} color="#FFFFFF" />
          <Text style={styles.listenCtaBtnText}>Brifingi Dinle · 2 dk</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1E1E4C',
  },
  dawnHeroHeader: {
    backgroundColor: '#1E1E4C',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 28,
  },
  headerTopActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dawnOverline: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: 'rgba(255, 255, 255, 0.72)',
  },
  dawnGreeting: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '700',
    letterSpacing: -0.4,
    color: '#FFFFFF',
    marginTop: 6,
  },
  dawnSub: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 4,
  },
  editorialScroll: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -12,
  },
  editorialScrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 110,
  },
  editorialCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#ECECF4',
    marginBottom: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  editorialParagraph: {
    fontSize: 17,
    lineHeight: 27,
    color: COLORS.ink,
    letterSpacing: -0.1,
  },
  sectionBlock: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: COLORS.inkTertiary,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ECECF4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  sectionItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    gap: 12,
  },
  sectionItemBorder: {
    borderTopWidth: 1,
    borderTopColor: '#F2F2F8',
  },
  itemIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#F0EFEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.ink,
  },
  itemSubtitle: {
    fontSize: 12,
    color: COLORS.inkSecondary,
    marginTop: 2,
  },
  itemTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  itemTagText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  verifiedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 6,
    marginTop: 6,
  },
  verifiedText: {
    fontSize: 12,
    color: COLORS.inkTertiary,
  },
  bottomAudioBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 28,
    paddingTop: 12,
    backgroundColor: 'rgba(241, 241, 248, 0.94)',
  },
  listenCtaBtn: {
    height: 52,
    borderRadius: 16,
    backgroundColor: COLORS.ink,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 4,
  },
  listenCtaBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  audioContainer: {
    flex: 1,
    backgroundColor: COLORS.audioBgStart,
    paddingHorizontal: 22,
  },
  audioTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  audioCircleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioTopTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  audioSpeedBadge: {
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioSpeedText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  audioMetaBlock: {
    alignItems: 'center',
    marginTop: 18,
  },
  audioMainTitle: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.3,
    color: '#FFFFFF',
  },
  audioSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
    textAlign: 'center',
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 120,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  waveformBar: {
    width: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  waveformBarActive: {
    backgroundColor: '#FFFFFF',
  },
  scrubberContainer: {
    marginTop: 16,
  },
  progressBarTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  progressTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progressTimeText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.65)',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    marginTop: 16,
  },
  rewindBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
  },
  rewindBtnText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: -4,
  },
  mainPlayBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
  },
  chaptersContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
    borderRadius: 18,
    padding: 14,
  },
  chaptersHeader: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 8,
  },
  chapterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    gap: 10,
  },
  chapterRowActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 10,
    paddingHorizontal: 8,
    borderTopWidth: 0,
  },
  chapterNum: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.5)',
    width: 22,
  },
  chapterTitle: {
    flex: 1,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.75)',
  },
  chapterDuration: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  returnToTextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
  },
  returnToTextBtnLabel: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
    fontWeight: '600',
  },
});
