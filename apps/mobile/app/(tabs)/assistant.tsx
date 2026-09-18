import React, { useState, useRef } from 'react';
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
  Animated,
  KeyboardAvoidingView,
  Platform,
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
  voiceDarkBg: '#15153A',
};

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
  richCard?: {
    type: 'pending_contacts' | 'draft_reply' | 'calendar_view' | 'bills';
    title: string;
    subtitle?: string;
    items?: {
      name: string;
      role: string;
      tag: string;
      tagColor: string;
      tagBg: string;
      actionLabel: string;
      onPress?: () => void;
    }[];
    draftContent?: string;
    draftRecipient?: string;
  };
  followupChips?: string[];
}

export default function AssistantScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [voiceModalVisible, setVoiceModalVisible] = useState<boolean>(false);
  const [memoryModalVisible, setMemoryModalVisible] = useState<boolean>(false);
  const [memorySearchQuery, setMemorySearchQuery] = useState<string>('');
  const [voiceStatus, setVoiceStatus] = useState<string>('Dinliyorum…');
  const [voiceSpokenQuery, setVoiceSpokenQuery] = useState<string>('“Mehmet\'ten cevap geldi mi?”');
  const [voiceShowApproval, setVoiceShowApproval] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const scrollViewRef = useRef<ScrollView>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const suggestedQuestions = [
    'Bugün neye odaklanmalıyım?',
    'Kimlere cevap vermem gerekiyor?',
    'Yarın yoğun muyum?',
    'Bu hafta hangi deadline\'lar var?',
    'Mehmet ile en son ne konuştuk?',
  ];

  const recentSearches = [
    { query: 'Geçen ayki uçak bileti ne kadardı?', time: 'Dün' },
    { query: 'Bu ay hangi ödemelerim var?', time: '2 Eyl' },
  ];

  const handleSendText = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      time: 'Şimdi',
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // AI Context-aware Response Generator
    setTimeout(() => {
      setIsTyping(false);
      let aiMsg: Message;

      if (query.includes('Kimlere') || query.includes('cevap')) {
        aiMsg = {
          id: `msg-ai-${Date.now()}`,
          sender: 'ai',
          text: '2 kişi senden cevap bekliyor. Ahmet\'inki bugün 17:00\'ye kadar; Selin\'inki ise yarın öğlene kadar bekleyebilir.',
          time: 'Şimdi',
          richCard: {
            type: 'pending_contacts',
            title: 'SENDEN BEKLEYENLER',
            items: [
              {
                name: 'Ahmet Yılmaz',
                role: 'Revize teklif · Gmail 08:42',
                tag: '17:00',
                tagColor: COLORS.critical,
                tagBg: COLORS.criticalSoft,
                actionLabel: 'Yanıtla',
                onPress: () => router.push('/email-detail?id=email-1'),
              },
              {
                name: 'Selin Kaya',
                role: 'Sözleşme 4. madde · Gmail dün',
                tag: 'Yarın',
                tagColor: COLORS.warning,
                tagBg: COLORS.warningSoft,
                actionLabel: 'Yanıtla',
                onPress: () => showToast('Selin Kaya için taslak oluşturuluyor...'),
              },
            ],
          },
          followupChips: ['Ahmet\'e yanıt taslağı hazırla', 'Selin\'i yarına ertele'],
        };
      } else if (query.includes('taslak') || query.includes('Ahmet')) {
        aiMsg = {
          id: `msg-ai-${Date.now()}`,
          sender: 'ai',
          text: 'Ahmet Yılmaz için profesyonel tonda, 17:00 teslimini ve %8 indirimi teyit eden yanıt taslağı hazırlandı.',
          time: 'Şimdi',
          richCard: {
            type: 'draft_reply',
            title: 'TASLAK · AHMET YILMAZ',
            draftRecipient: 'ahmet.yilmaz@teknoas.com',
            draftContent: 'Merhaba Ahmet Bey, talebiniz için teşekkürler. Revize fiyat teklifini güncellenmiş teslim tarihi ve %8 indirim ile birlikte bugün 17:00\'den önce PDF olarak sunuyoruz.',
          },
          followupChips: ['Göndermeyi Onayla', 'Fiyatı %10 yap', 'Düzenle'],
        };
      } else if (query.includes('yoğun') || query.includes('Yarın')) {
        aiMsg = {
          id: `msg-ai-${Date.now()}`,
          sender: 'ai',
          text: 'Yarın takviminde 2 toplantı var. Öğleden sonra 14:00–16:30 arası odak çalışması için tamamen açık.',
          time: 'Şimdi',
          richCard: {
            type: 'calendar_view',
            title: 'YARININ PLANI · 17 EYLÜL',
            items: [
              {
                name: 'Haftalık Ekip Değerlendirmesi',
                role: '09:00 – 10:00 · Toplantı Odası A',
                tag: 'Toplantı',
                tagColor: COLORS.primaryDark,
                tagBg: COLORS.primarySoft,
                actionLabel: 'Detay',
              },
              {
                name: 'Müşteri Demo Toplantısı',
                role: '11:30 – 12:30 · Google Meet',
                tag: 'Online',
                tagColor: COLORS.primaryDark,
                tagBg: COLORS.primarySoft,
                actionLabel: 'Hazırlık',
              },
            ],
          },
          followupChips: ['14:00\'e odak bloğu ekle', 'Yarınki brifing saatini ayarla'],
        };
      } else if (query.includes('odaklan') || query.includes('Bugün')) {
        aiMsg = {
          id: `msg-ai-${Date.now()}`,
          sender: 'ai',
          text: 'Bugün en yüksek önceliğin saat 17:00\'ye kadar Ahmet Yılmaz\'a iletilecek revize teklif ve 14:30\'daki müşteri toplantısıdır.',
          time: 'Şimdi',
          followupChips: ['Brifingi Oku', 'Toplantı notlarını göster', 'Görevleri listele'],
        };
      } else {
        aiMsg = {
          id: `msg-ai-${Date.now()}`,
          sender: 'ai',
          text: `"${query}" konusunu bağlı hesaplarında taradım. İlgili 2 e-posta ve 1 takvim kaydı bulundu. İlgili maddeler öncelik sırasına göre hafızada tutuluyor.`,
          time: 'Şimdi',
          followupChips: ['Detayları göster', 'Özet çıkar'],
        };
      }

      setMessages(prev => [...prev, aiMsg]);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 800);
  };

  const handleClearChat = () => {
    setMessages([]);
    showToast('Sohbet temizlendi.');
  };

  // Semantic Memory Search Data
  const memoryItems = [
    {
      id: 'm-1',
      title: 'THY Uçak Bileti Rezervasyonu',
      date: '28 Ağustos 2026',
      source: 'Gmail · THY E-Bilet',
      summary: 'İstanbul → Antalya uçuş bileti (TK2412). Tutar: 2.850 TL. Check-in açık.',
    },
    {
      id: 'm-2',
      title: 'TeknoAS Yazılım Entegrasyon Teklifi v1',
      date: '12 Ağustos 2026',
      source: 'Gmail · Ahmet Yılmaz',
      summary: 'İlk fiyat teklifi ve SLA şartları. İskonto oranı %5 olarak iletilmişti.',
    },
    {
      id: 'm-3',
      title: 'CK Enerji Elektrik Faturası',
      date: '10 Eylül 2026',
      source: 'Evrensel Yakalama · Fatura Fotoğrafı',
      summary: 'Abone No: 4821. Tutar: 1.842 TL. Son ödeme tarihi 15 Eylül.',
    },
    {
      id: 'm-4',
      title: 'Sözleşme Revizyon Notları ve Maddeleri',
      date: '3 Eylül 2026',
      source: 'Drive · Hukuk_Ekip_Notu.docx',
      summary: '4. madde cezai şart limiti ve 30 günlük fesih ihbar süresi mutabakatı.',
    },
  ];

  const filteredMemory = memoryItems.filter(item =>
    item.title.toLowerCase().includes(memorySearchQuery.toLowerCase()) ||
    item.summary.toLowerCase().includes(memorySearchQuery.toLowerCase()) ||
    item.source.toLowerCase().includes(memorySearchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F1F1F8" />

      {/* Floating Toast Notification */}
      {toastMsg && (
        <View style={styles.toast}>
          <Ionicons name="information-circle" size={18} color="#FFFFFF" />
          <Text style={styles.toastText}>{toastMsg}</Text>
        </View>
      )}

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Asistan</Text>
        <View style={styles.headerActions}>
          <Pressable
            style={styles.memoryHeaderBtn}
            onPress={() => setMemoryModalVisible(true)}
          >
            <Ionicons name="search" size={16} color={COLORS.inkSecondary} />
            <Text style={styles.memoryHeaderBtnText}>Hafıza</Text>
          </Pressable>

          {messages.length > 0 && (
            <Pressable
              style={styles.newChatBtn}
              onPress={handleClearChat}
            >
              <Text style={styles.newChatBtnText}>Yeni sohbet</Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* Main Chat / Assistant Body */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatScroll}
          contentContainerStyle={styles.chatScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Intelligence Intro Banner (Always Shown at top) */}
          <View style={styles.intelligenceBanner}>
            <View style={styles.sparkleIconWrap}>
              <Ionicons name="sparkles" size={18} color={COLORS.primary} />
            </View>
            <Text style={styles.intelligenceBannerText}>
              Bugün <Text style={{ fontWeight: '700' }}>46 mail</Text>,{' '}
              <Text style={{ fontWeight: '700' }}>4 etkinlik</Text> ve{' '}
              <Text style={{ fontWeight: '700' }}>2 takip</Text> analiz edildi. Ne öğrenmek istersin?
            </Text>
          </View>

          {/* If no messages yet, show Suggestion Chips & Recent Queries */}
          {messages.length === 0 && (
            <View style={styles.suggestionsContainer}>
              <Text style={styles.sectionLabel}>ÖNERİLEN SORULAR</Text>
              <View style={styles.suggestionChipsList}>
                {suggestedQuestions.map((q, idx) => (
                  <Pressable
                    key={idx}
                    style={styles.suggestionRow}
                    onPress={() => handleSendText(q)}
                  >
                    <Text style={styles.suggestionRowText}>{q}</Text>
                    <Ionicons name="arrow-forward" size={16} color="#B8B4AA" />
                  </Pressable>
                ))}
              </View>

              <Text style={[styles.sectionLabel, { marginTop: 24 }]}>SON SOHBETLER</Text>
              <View style={styles.recentList}>
                {recentSearches.map((rec, i) => (
                  <Pressable
                    key={i}
                    style={styles.recentRow}
                    onPress={() => handleSendText(rec.query)}
                  >
                    <Text style={styles.recentQueryText}>{rec.query}</Text>
                    <Text style={styles.recentTimeText}>{rec.time}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {/* Chat Message Stream */}
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageWrapper,
                msg.sender === 'user' ? styles.userMsgWrapper : styles.aiMsgWrapper,
              ]}
            >
              {/* Text Bubble */}
              <View
                style={[
                  styles.messageBubble,
                  msg.sender === 'user' ? styles.userBubble : styles.aiBubble,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    msg.sender === 'user' ? styles.userMessageText : styles.aiMessageText,
                  ]}
                >
                  {msg.text}
                </Text>
              </View>

              {/* Optional Rich Cards */}
              {msg.richCard && (
                <View style={styles.richCardContainer}>
                  <View style={styles.richCardHeader}>
                    <Ionicons name="sparkles" size={14} color={COLORS.primary} />
                    <Text style={styles.richCardHeading}>{msg.richCard.title}</Text>
                  </View>

                  {/* Pending Contacts Card */}
                  {msg.richCard.items && (
                    <View style={styles.richCardItems}>
                      {msg.richCard.items.map((item, idx) => (
                        <View
                          key={idx}
                          style={[
                            styles.richCardItemRow,
                            idx > 0 && styles.richCardItemBorder,
                          ]}
                        >
                          <View style={styles.contactAvatar}>
                            <Text style={styles.contactAvatarText}>
                              {item.name.slice(0, 2).toUpperCase()}
                            </Text>
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.contactName}>{item.name}</Text>
                            <Text style={styles.contactRole}>{item.role}</Text>
                          </View>
                          <View style={[styles.contactTag, { backgroundColor: item.tagBg }]}>
                            <Text style={[styles.contactTagText, { color: item.tagColor }]}>
                              {item.tag}
                            </Text>
                          </View>
                          <Pressable
                            style={styles.contactActionBtn}
                            onPress={item.onPress || (() => handleSendText(`${item.name}'e yanıt taslağı hazırla`))}
                          >
                            <Text style={styles.contactActionBtnText}>{item.actionLabel}</Text>
                          </Pressable>
                        </View>
                      ))}
                    </View>
                  )}

                  {/* Draft Reply Card */}
                  {msg.richCard.draftContent && (
                    <View style={styles.draftContentBox}>
                      <Text style={styles.draftRecipient}>
                        Kime: {msg.richCard.draftRecipient}
                      </Text>
                      <Text style={styles.draftBody}>
                        "{msg.richCard.draftContent}"
                      </Text>
                      <View style={styles.draftActionRow}>
                        <Pressable
                          style={styles.draftConfirmBtn}
                          onPress={() => router.push('/approval-center')}
                        >
                          <Ionicons name="shield-checkmark-outline" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                          <Text style={styles.draftConfirmBtnText}>Göndermeyi Onayla</Text>
                        </Pressable>
                        <Pressable
                          style={styles.draftEditBtn}
                          onPress={() => router.push('/email-detail?id=email-1')}
                        >
                          <Text style={styles.draftEditBtnText}>Düzenle</Text>
                        </Pressable>
                      </View>
                    </View>
                  )}
                </View>
              )}

              {/* Follow-up Suggestion Chips */}
              {msg.followupChips && (
                <View style={styles.followupChipsRow}>
                  {msg.followupChips.map((chip, i) => (
                    <Pressable
                      key={i}
                      style={styles.followupChip}
                      onPress={() => handleSendText(chip)}
                    >
                      <Text style={styles.followupChipText}>{chip}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <View style={styles.typingIndicatorWrap}>
              <Ionicons name="sparkles" size={15} color={COLORS.primary} />
              <Text style={styles.typingText}>Dijital Asistan analiz ediyor…</Text>
            </View>
          )}
        </ScrollView>

        {/* Bottom Input Capsule */}
        <View style={styles.bottomInputBar}>
          <View style={styles.inputCapsule}>
            <TextInput
              style={styles.textInput}
              placeholder="Dijital hayatına sor…"
              placeholderTextColor={COLORS.inkTertiary}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={() => handleSendText()}
              returnKeyType="send"
            />

            {inputText.trim().length > 0 ? (
              <Pressable
                style={styles.sendIconBtn}
                onPress={() => handleSendText()}
              >
                <Ionicons name="arrow-up" size={20} color="#FFFFFF" />
              </Pressable>
            ) : (
              <Pressable
                style={styles.micIconBtn}
                onPress={() => setVoiceModalVisible(true)}
              >
                <Ionicons name="mic" size={20} color="#FFFFFF" />
              </Pressable>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Voice Assistant Modal (Madde 29, Section 6.3 & 6.4) */}
      <Modal
        visible={voiceModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setVoiceModalVisible(false)}
      >
        <SafeAreaView style={styles.voiceContainer}>
          <StatusBar barStyle="light-content" backgroundColor={COLORS.voiceDarkBg} />

          {/* Top Bar */}
          <View style={styles.voiceTopBar}>
            <Text style={styles.voiceBadgeText}>SES MODU</Text>
            <Pressable
              style={styles.voiceCloseBtn}
              onPress={() => setVoiceModalVisible(false)}
            >
              <Ionicons name="close" size={22} color="#FFFFFF" />
            </Pressable>
          </View>

          {/* Interactive Voice Center */}
          <View style={styles.voiceCenterArea}>
            {/* Glowing Ring + Mic Circle */}
            <View style={styles.voicePulseOuter}>
              <View style={styles.voicePulseMid}>
                <View style={styles.voiceMicCircle}>
                  <Ionicons name="mic" size={38} color="#25266A" />
                </View>
              </View>
            </View>

            {/* Voice Waveform visual */}
            <View style={styles.voiceWaveBars}>
              {[20, 35, 60, 85, 45, 75, 95, 110, 80, 50, 70, 90, 65, 40, 25].map((h, idx) => (
                <View key={idx} style={[styles.voiceWaveBar, { height: h }]} />
              ))}
            </View>

            {/* Speech transcription */}
            <Text style={styles.voiceSpokenText}>{voiceSpokenQuery}</Text>
            <Text style={styles.voiceStatusText}>{voiceStatus}</Text>

            {/* Voice Approval Card (Madde 29 confirmation) */}
            {voiceShowApproval && (
              <View style={styles.voiceApprovalCard}>
                <View style={styles.voiceCardHeader}>
                  <Ionicons name="sparkles" size={15} color={COLORS.primary} />
                  <Text style={styles.voiceCardHeaderText}>ONAY GEREKİYOR · MAİL GÖNDER</Text>
                </View>
                <Text style={styles.voiceApprovalTitle}>Mehmet Yılmaz'a takip mesajı</Text>
                <Text style={styles.voiceApprovalBody}>
                  "Merhaba Mehmet, 2 Eylül'de ilettiğim teklif hakkında görüşünüzü alabilir miyim?"
                </Text>
                <View style={styles.voiceApprovalActionRow}>
                  <Pressable
                    style={styles.voiceApproveBtn}
                    onPress={() => {
                      showToast('Onaylandı: Takip e-postası başarıyla gönderildi.');
                      setVoiceShowApproval(false);
                      setVoiceModalVisible(false);
                    }}
                  >
                    <Text style={styles.voiceApproveBtnText}>Onayla</Text>
                  </Pressable>
                  <Pressable
                    style={styles.voiceEditBtn}
                    onPress={() => router.push('/approval-center')}
                  >
                    <Text style={styles.voiceEditBtnText}>Düzenle</Text>
                  </Pressable>
                  <Pressable
                    style={styles.voiceCancelBtn}
                    onPress={() => setVoiceShowApproval(false)}
                  >
                    <Text style={styles.voiceCancelBtnText}>İptal</Text>
                  </Pressable>
                </View>
                <View style={styles.voiceMicHint}>
                  <Ionicons name="mic-outline" size={14} color={COLORS.inkTertiary} />
                  <Text style={styles.voiceMicHintText}>"Onayla" diyerek de gönderebilirsin.</Text>
                </View>
              </View>
            )}
          </View>

          {/* Quick Voice Chips */}
          <View style={styles.voiceChipsContainer}>
            {[
              { q: 'Bugün ne var?', action: () => { setVoiceSpokenQuery('“Bugün ne var?”'); setVoiceStatus('Öncelikler ve brifing sıralanıyor…'); } },
              { q: 'Brifingimi oku.', action: () => { setVoiceModalVisible(false); router.push('/morning-briefing?autoPlay=true'); } },
              { q: 'Mehmet\'e takip mesajı hazırla', action: () => { setVoiceSpokenQuery('“Mehmet\'e takip mesajı hazırla”'); setVoiceStatus('Taslak hazırlandı. Onay bekleniyor.'); setVoiceShowApproval(true); } },
            ].map((chip, idx) => (
              <Pressable
                key={idx}
                style={styles.voiceChip}
                onPress={chip.action}
              >
                <Text style={styles.voiceChipText}>{chip.q}</Text>
              </Pressable>
            ))}
          </View>
        </SafeAreaView>
      </Modal>

      {/* Semantic Memory Search Modal (Madde 34, Section 6.5) */}
      <Modal
        visible={memoryModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setMemoryModalVisible(false)}
      >
        <SafeAreaView style={styles.memoryContainer}>
          <StatusBar barStyle="dark-content" backgroundColor="#F1F1F8" />

          {/* Memory Top Header */}
          <View style={styles.memoryHeader}>
            <Pressable
              style={styles.memoryBackBtn}
              onPress={() => setMemoryModalVisible(false)}
            >
              <Ionicons name="arrow-back" size={22} color={COLORS.ink} />
            </Pressable>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.memoryTitle}>AI Hafıza & Anlamsal Arama</Text>
              <Text style={styles.memorySubtitle}>Mail, takvim, not ve faturadaki her detayı anlar</Text>
            </View>
          </View>

          {/* Search Input Box */}
          <View style={styles.memorySearchBox}>
            <Ionicons name="search" size={20} color={COLORS.inkTertiary} style={{ marginRight: 8 }} />
            <TextInput
              style={styles.memorySearchInput}
              placeholder="Örn: geçen ayki uçak bileti, teklif maili, faturalar..."
              placeholderTextColor={COLORS.inkTertiary}
              value={memorySearchQuery}
              onChangeText={setMemorySearchQuery}
              autoFocus
            />
            {memorySearchQuery.length > 0 && (
              <Pressable onPress={() => setMemorySearchQuery('')}>
                <Ionicons name="close-circle" size={18} color={COLORS.inkTertiary} />
              </Pressable>
            )}
          </View>

          {/* Memory Search Results */}
          <ScrollView
            style={styles.memoryResultsScroll}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.memorySectionTitle}>
              {memorySearchQuery ? `ARAMA SONUÇLARI (${filteredMemory.length})` : 'SON HAFIZA KAYITLARI'}
            </Text>

            {filteredMemory.map((item) => (
              <Pressable
                key={item.id}
                style={styles.memoryResultCard}
                onPress={() => {
                  setMemoryModalVisible(false);
                  handleSendText(`Hafızadan göster: ${item.title}`);
                }}
              >
                <View style={styles.memoryCardTop}>
                  <Text style={styles.memoryCardTitle}>{item.title}</Text>
                  <Text style={styles.memoryCardDate}>{item.date}</Text>
                </View>

                <Text style={styles.memoryCardSummary}>{item.summary}</Text>

                <View style={styles.memoryCardBottom}>
                  <Ionicons name="link-outline" size={14} color={COLORS.primary} />
                  <Text style={styles.memoryCardSource}>{item.source}</Text>
                </View>
              </Pressable>
            ))}
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: -0.4,
    color: COLORS.ink,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  memoryHeaderBtn: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  memoryHeaderBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.inkSecondary,
  },
  newChatBtn: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  newChatBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.inkSecondary,
  },
  chatScroll: {
    flex: 1,
  },
  chatScrollContent: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 24,
  },
  intelligenceBanner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ECECF8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  sparkleIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  intelligenceBannerText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.ink,
  },
  suggestionsContainer: {
    marginTop: 8,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    color: COLORS.inkTertiary,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  suggestionChipsList: {
    gap: 8,
  },
  suggestionRow: {
    height: 52,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ECECF4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  suggestionRowText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.ink,
  },
  recentList: {
    gap: 8,
  },
  recentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8F0',
  },
  recentQueryText: {
    fontSize: 14,
    color: COLORS.inkSecondary,
    flex: 1,
  },
  recentTimeText: {
    fontSize: 12,
    color: COLORS.inkTertiary,
    marginLeft: 10,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  userMsgWrapper: {
    alignItems: 'flex-end',
  },
  aiMsgWrapper: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    maxWidth: '86%',
  },
  userBubble: {
    backgroundColor: COLORS.primary,
  },
  aiBubble: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECECF4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  aiMessageText: {
    color: COLORS.ink,
  },
  richCardContainer: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ECECF8',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  richCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  richCardHeading: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
    color: COLORS.primary,
  },
  richCardItems: {
    gap: 8,
  },
  richCardItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 10,
  },
  richCardItemBorder: {
    borderTopWidth: 1,
    borderTopColor: '#F2F2F8',
  },
  contactAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactAvatarText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  contactName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.ink,
  },
  contactRole: {
    fontSize: 12,
    color: COLORS.inkSecondary,
    marginTop: 1,
  },
  contactTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  contactTagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  contactActionBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  contactActionBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  draftContentBox: {
    marginTop: 4,
  },
  draftRecipient: {
    fontSize: 12,
    color: COLORS.inkTertiary,
    marginBottom: 4,
  },
  draftBody: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.inkSecondary,
    backgroundColor: '#F8F8FC',
    padding: 12,
    borderRadius: 12,
  },
  draftActionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  draftConfirmBtn: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  draftConfirmBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  draftEditBtn: {
    height: 42,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  draftEditBtnText: {
    color: COLORS.primaryDark,
    fontSize: 13,
    fontWeight: '600',
  },
  followupChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  followupChip: {
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8E8F0',
  },
  followupChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.inkSecondary,
  },
  typingIndicatorWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  typingText: {
    fontSize: 13,
    color: COLORS.inkTertiary,
    fontStyle: 'italic',
  },
  bottomInputBar: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.background,
  },
  inputCapsule: {
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingLeft: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ECECF4',
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.ink,
    paddingVertical: 0,
  },
  sendIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceContainer: {
    flex: 1,
    backgroundColor: COLORS.voiceDarkBg,
    paddingHorizontal: 20,
  },
  voiceTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  voiceBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  voiceCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceCenterArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voicePulseOuter: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  voicePulseMid: {
    width: 105,
    height: 105,
    borderRadius: 52.5,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceMicCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  voiceWaveBars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 60,
    marginVertical: 24,
  },
  voiceWaveBar: {
    width: 3,
    borderRadius: 1.5,
    backgroundColor: '#FFFFFF',
  },
  voiceSpokenText: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.2,
    color: '#FFFFFF',
    textAlign: 'center',
    maxWidth: 320,
  },
  voiceStatusText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 8,
    textAlign: 'center',
  },
  voiceApprovalCard: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  voiceCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  voiceCardHeaderText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
    color: COLORS.primary,
  },
  voiceApprovalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.ink,
    marginTop: 6,
  },
  voiceApprovalBody: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.inkSecondary,
    marginTop: 4,
  },
  voiceApprovalActionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  voiceApproveBtn: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceApproveBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  voiceEditBtn: {
    height: 42,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceEditBtnText: {
    color: COLORS.primaryDark,
    fontSize: 14,
    fontWeight: '600',
  },
  voiceCancelBtn: {
    height: 42,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#F0EFEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceCancelBtnText: {
    color: COLORS.inkSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  voiceMicHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 10,
    justifyContent: 'center',
  },
  voiceMicHintText: {
    fontSize: 12,
    color: COLORS.inkTertiary,
  },
  voiceChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    paddingBottom: 24,
  },
  voiceChip: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceChipText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
  memoryContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },
  memoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  memoryBackBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  memoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.ink,
  },
  memorySubtitle: {
    fontSize: 12,
    color: COLORS.inkSecondary,
    marginTop: 2,
  },
  memorySearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#ECECF4',
    marginTop: 8,
  },
  memorySearchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.ink,
    paddingVertical: 0,
  },
  memoryResultsScroll: {
    flex: 1,
    marginTop: 16,
  },
  memorySectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    color: COLORS.inkTertiary,
    marginBottom: 12,
  },
  memoryResultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ECECF4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  memoryCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  memoryCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.ink,
    flex: 1,
  },
  memoryCardDate: {
    fontSize: 12,
    color: COLORS.inkTertiary,
    marginLeft: 8,
  },
  memoryCardSummary: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.inkSecondary,
    marginTop: 6,
  },
  memoryCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F8',
  },
  memoryCardSource: {
    fontSize: 12,
    color: COLORS.primaryDark,
    fontWeight: '500',
  },
});
