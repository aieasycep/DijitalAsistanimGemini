import { NavigationProvider, useNavigation } from './context/NavigationContext'
import { ThemeProvider } from './context/ThemeContext'
import MobileFrame from './components/layout/MobileFrame'
import BottomNav from './components/layout/BottomNav'
import SplashScreen from './screens/SplashScreen'
import OnboardingFlow from './screens/onboarding/OnboardingFlow'
import TodayScreen from './screens/today/TodayScreen'
import MorningBriefing from './screens/today/MorningBriefing'
import MiddayPulse from './screens/today/MiddayPulse'
import EveningClose from './screens/today/EveningClose'
import FlowScreen from './screens/flow/FlowScreen'
import MailIntelligence from './screens/flow/MailIntelligence'
import EmailDetail from './screens/flow/EmailDetail'
import AIDraftReply from './screens/flow/AIDraftReply'
import SmartFollowUp from './screens/flow/SmartFollowUp'
import WaitingReply from './screens/flow/WaitingReply'
import PlanScreen from './screens/plan/PlanScreen'
import MeetingPrep from './screens/plan/MeetingPrep'
import PostMeeting from './screens/plan/PostMeeting'
import CalendarConflict from './screens/plan/CalendarConflict'
import CommitmentTracker from './screens/plan/CommitmentTracker'
import AssistantScreen from './screens/assistant/AssistantScreen'
import VoiceAssistant from './screens/assistant/VoiceAssistant'
import ProfileScreen from './screens/settings/ProfileScreen'
import Integrations from './screens/settings/Integrations'
import SecurityPrivacy from './screens/settings/SecurityPrivacy'
import AIPersonalization from './screens/settings/AIPersonalization'
import DataSourceControl from './screens/settings/DataSourceControl'
import VIPPeople from './screens/settings/VIPPeople'
import ApprovalCenter from './screens/shared/ApprovalCenter'
import SearchScreen from './screens/shared/SearchScreen'
import PersonIntelligence from './screens/shared/PersonIntelligence'
import UniversalCapture from './screens/shared/UniversalCapture'
import WeeklyReport from './screens/marketing/WeeklyReport'
import Paywall from './screens/marketing/Paywall'
import Referral from './screens/marketing/Referral'
import WidgetShowcase from './screens/marketing/WidgetShowcase'
import AppStoreScreenshots from './screens/marketing/AppStoreScreenshots'
import SocialAds from './screens/marketing/SocialAds'
import Landing from './screens/marketing/Landing'
import EmptyStates from './screens/states/EmptyStates'
import ErrorStates from './screens/states/ErrorStates'
import LoadingStates from './screens/states/LoadingStates'
import AndroidNotifications from './screens/settings/AndroidNotifications'
import AndroidFrame from './screens/marketing/AndroidFrame'
import NotificationExamples from './screens/marketing/NotificationExamples'
import DesignSystem from './screens/states/DesignSystem'
import IAPage from './screens/states/IAPage'
import UserFlows from './screens/states/UserFlows'
import BriefingSettings from './screens/settings/BriefingSettings'
import NotificationSettings from './screens/settings/NotificationSettings'
import PriorityRules from './screens/settings/PriorityRules'
import AppearanceSettings from './screens/settings/AppearanceSettings'
import LanguageSettings from './screens/settings/LanguageSettings'
import HelpScreen from './screens/settings/HelpScreen'
import FeedbackScreen from './screens/settings/FeedbackScreen'

const MAIN_TABS = ['today', 'flow', 'plan', 'assistant']
const NO_BOTTOM_NAV = ['splash', 'onboarding', 'morning-briefing', 'voice-assistant', 'onboarding-welcome']

function AppContent() {
  const { current } = useNavigation()
  const { screen } = current

  const showNavActual = MAIN_TABS.includes(screen)

  function renderScreen() {
    switch (screen) {
      case 'splash': return <SplashScreen />
      case 'onboarding': return <OnboardingFlow />
      case 'today': return <TodayScreen />
      case 'morning-briefing': return <MorningBriefing />
      case 'midday-pulse': return <MiddayPulse />
      case 'evening-close': return <EveningClose />
      case 'weekly-report': return <WeeklyReport />
      case 'flow': return <FlowScreen />
      case 'mail-intelligence': return <MailIntelligence />
      case 'email-detail': return <EmailDetail />
      case 'ai-draft-reply': return <AIDraftReply />
      case 'smart-followup': return <SmartFollowUp />
      case 'waiting-reply': return <WaitingReply />
      case 'plan': return <PlanScreen />
      case 'meeting-prep': return <MeetingPrep />
      case 'post-meeting': return <PostMeeting />
      case 'calendar-conflict': return <CalendarConflict />
      case 'commitments': return <CommitmentTracker />
      case 'assistant': return <AssistantScreen />
      case 'voice-assistant': return <VoiceAssistant />
      case 'profile': return <ProfileScreen />
      case 'integrations': return <Integrations />
      case 'security-privacy': return <SecurityPrivacy />
      case 'ai-personalization': return <AIPersonalization />
      case 'data-source-control': return <DataSourceControl />
      case 'vip-people': return <VIPPeople />
      case 'approval-center': return <ApprovalCenter />
      case 'search': return <SearchScreen />
      case 'person-intelligence': return <PersonIntelligence />
      case 'universal-capture': return <UniversalCapture />
      case 'paywall': return <Paywall />
      case 'referral': return <Referral />
      case 'widget-showcase': return <WidgetShowcase />
      case 'appstore-screenshots': return <AppStoreScreenshots />
      case 'social-ads': return <SocialAds />
      case 'landing': return <Landing />
      case 'empty-states': return <EmptyStates />
      case 'error-states': return <ErrorStates />
      case 'loading-states': return <LoadingStates />
      case 'android-notifications': return <AndroidNotifications />
      case 'android-frame': return <AndroidFrame />
      case 'notification-examples': return <NotificationExamples />
      case 'design-system': return <DesignSystem />
      case 'ia-page': return <IAPage />
      case 'user-flows': return <UserFlows />
      case 'briefing-settings': return <BriefingSettings />
      case 'notification-settings': return <NotificationSettings />
      case 'priority-rules': return <PriorityRules />
      case 'appearance': return <AppearanceSettings />
      case 'language': return <LanguageSettings />
      case 'help': return <HelpScreen />
      case 'feedback': return <FeedbackScreen />
      default: return <TodayScreen />
    }
  }

  return (
    <>
      {renderScreen()}
      {showNavActual && <BottomNav />}
    </>
  )
}

function AppWrapper() {
  const { current } = useNavigation()
  if (current.screen === 'landing') {
    return <Landing />
  }
  return (
    <MobileFrame>
      <AppContent />
    </MobileFrame>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <AppWrapper />
      </NavigationProvider>
    </ThemeProvider>
  )
}
