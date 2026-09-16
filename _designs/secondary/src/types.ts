export type ScreenName =
  | 'splash'
  | 'onboarding'
  | 'onboarding-welcome'
  | 'onboarding-noise'
  | 'onboarding-proactive'
  | 'onboarding-control'
  | 'onboarding-account'
  | 'onboarding-connect'
  | 'onboarding-permission'
  | 'onboarding-calendar-permission'
  | 'onboarding-preferences'
  | 'onboarding-personalization'
  | 'onboarding-vip'
  | 'onboarding-analysis'
  | 'onboarding-aha'
  | 'onboarding-notification'
  | 'today'
  | 'morning-briefing'
  | 'midday-pulse'
  | 'evening-close'
  | 'weekly-report'
  | 'flow'
  | 'mail-intelligence'
  | 'email-detail'
  | 'ai-draft-reply'
  | 'smart-followup'
  | 'waiting-reply'
  | 'plan'
  | 'calendar-conflict'
  | 'meeting-prep'
  | 'post-meeting'
  | 'commitments'
  | 'assistant'
  | 'voice-assistant'
  | 'universal-capture'
  | 'smart-reminder'
  | 'approval-center'
  | 'search'
  | 'person-intelligence'
  | 'vip-people'
  | 'profile'
  | 'integrations'
  | 'security-privacy'
  | 'data-source-control'
  | 'ai-personalization'
  | 'paywall'
  | 'referral'
  | 'widget-showcase'
  | 'appstore-screenshots'
  | 'social-ads'
  | 'landing'
  | 'empty-states'
  | 'error-states'
  | 'loading-states'
  | 'android-notifications'
  | 'android-frame'
  | 'why-important'
  | 'notification-examples'
  | 'design-system'
  | 'ia-page'
  | 'user-flows'
  | 'briefing-settings'
  | 'notification-settings'
  | 'priority-rules'
  | 'appearance'
  | 'language'
  | 'help'
  | 'feedback'

export interface NavState {
  screen: ScreenName
  params?: Record<string, unknown>
}

export type Priority = 'critical' | 'upcoming' | 'deadline' | 'info' | 'success'

export interface InsightItem {
  id: string
  priority: Priority
  title: string
  source: string
  sourceIcon: string
  time: string
  actions: string[]
  whyImportant?: string
}

export interface EmailItem {
  id: string
  sender: string
  senderInitials: string
  subject: string
  preview: string
  time: string
  priority: Priority
  category: 'important' | 'awaiting-reply' | 'deadline' | 'info' | 'low'
  aiSummary: string
  keyPoints: string[]
  isRead: boolean
}

export interface MeetingItem {
  id: string
  title: string
  person: string
  time: string
  duration: string
  platform: string
  minutesLeft?: number
  lastContact?: string
}

export interface LifeItem {
  id: string
  type: 'cargo' | 'flight' | 'reservation' | 'payment' | 'subscription' | 'security'
  title: string
  detail: string
  time: string
  icon: string
  action: string
}

export interface CommitmentItem {
  id: string
  commitment: string
  to: string
  source: string
  date: string
  status: 'pending' | 'done' | 'overdue'
}

export interface Person {
  id: string
  name: string
  initials: string
  role: string
  lastContact: string
  openLoops: number
  upcomingMeeting?: string
  isVip: boolean
}

export interface ApprovalItem {
  id: string
  action: string
  what: string
  why: string
  change: string
  type: 'send-email' | 'create-event' | 'move-event' | 'create-task' | 'set-reminder'
}
