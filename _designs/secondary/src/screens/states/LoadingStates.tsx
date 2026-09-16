import { useEffect, useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'

function SkeletonBlock({ width = '100%', height = 16, radius = 8, style = {} }: { width?: string | number; height?: number; radius?: number; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        width, height, borderRadius: radius,
        background: 'linear-gradient(90deg, #EDEDF5 25%, #F5F5FA 50%, #EDEDF5 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.4s infinite',
        ...style,
      }}
    />
  )
}

function InsightCardSkeleton() {
  return (
    <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 4px rgba(15,15,26,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <SkeletonBlock width={72} height={20} radius={6} />
        <SkeletonBlock width={40} height={12} radius={4} />
      </div>
      <SkeletonBlock width="90%" height={15} radius={6} style={{ marginBottom: 8 }} />
      <SkeletonBlock width="65%" height={15} radius={6} style={{ marginBottom: 12 }} />
      <SkeletonBlock width={80} height={12} radius={4} style={{ marginBottom: 12 }} />
      <div style={{ height: 1, background: '#F2F2F8', marginBottom: 10 }} />
      <div style={{ display: 'flex', gap: 8 }}>
        <SkeletonBlock width={80} height={28} radius={8} />
        <SkeletonBlock width={70} height={28} radius={8} />
      </div>
    </div>
  )
}

function EmailCardSkeleton() {
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', boxShadow: '0 1px 4px rgba(15,15,26,0.04)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <SkeletonBlock width={36} height={36} radius={18} />
        <div style={{ flex: 1 }}>
          <SkeletonBlock width="50%" height={13} radius={5} style={{ marginBottom: 6 }} />
          <SkeletonBlock width="35%" height={11} radius={4} />
        </div>
        <SkeletonBlock width={52} height={18} radius={5} />
      </div>
      <SkeletonBlock width="85%" height={14} radius={5} style={{ marginBottom: 6 }} />
      <SkeletonBlock width="70%" height={13} radius={5} />
    </div>
  )
}

function MeetingCardSkeleton() {
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', display: 'flex', gap: 14, boxShadow: '0 1px 4px rgba(15,15,26,0.04)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 36 }}>
        <SkeletonBlock width={36} height={13} radius={4} style={{ marginBottom: 4 }} />
        <SkeletonBlock width={28} height={20} radius={5} />
      </div>
      <div style={{ flex: 1 }}>
        <SkeletonBlock width="70%" height={14} radius={5} style={{ marginBottom: 8 }} />
        <SkeletonBlock width="50%" height={12} radius={4} style={{ marginBottom: 6 }} />
        <SkeletonBlock width="40%" height={12} radius={4} />
      </div>
    </div>
  )
}

function AIProcessingState() {
  const [dots, setDots] = useState(0)
  const steps = ['Mail analizi yapılıyor', 'Takvim kontrol ediliyor', 'Öncelikler belirleniyor', 'Brifing hazırlanıyor']
  const [step, setStep] = useState(0)

  useEffect(() => {
    const d = setInterval(() => setDots(p => (p + 1) % 4), 400)
    const s = setInterval(() => setStep(p => (p + 1) % steps.length), 1800)
    return () => { clearInterval(d); clearInterval(s) }
  }, [])

  return (
    <div style={{ background: '#fff', borderRadius: 20, padding: '28px 20px', boxShadow: '0 1px 4px rgba(15,15,26,0.05)', textAlign: 'center' }}>
      <div style={{ position: 'relative', width: 72, height: 72, margin: '0 auto 16px' }}>
        <div style={{
          width: 72, height: 72, borderRadius: 36,
          background: 'linear-gradient(135deg, #EEEEFF 0%, #F0ECFF 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 30,
          animation: 'spin 3s linear infinite',
        }}>
          ✨
        </div>
      </div>
      <p style={{ fontSize: 15, fontWeight: 700, color: '#0F0F1A', marginBottom: 6, letterSpacing: '-0.02em' }}>
        AI Analiz Yapıyor
      </p>
      <p style={{ fontSize: 13, color: '#5B5CE2', fontWeight: 500, minHeight: 18 }}>
        {steps[step]}{'...'.slice(0, dots)}
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 16 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: 3,
            background: '#5B5CE2',
            opacity: dots === i + 1 ? 1 : 0.25,
            transition: 'opacity 0.3s',
          }} />
        ))}
      </div>
    </div>
  )
}

function SyncStatusBar() {
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 1px 4px rgba(15,15,26,0.04)' }}>
      <div style={{
        width: 32, height: 32, borderRadius: 16,
        background: '#E5F2FF',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 16,
        animation: 'spin 2s linear infinite',
      }}>
        🔄
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#0F0F1A', marginBottom: 2 }}>Senkronize ediliyor</p>
        <p style={{ fontSize: 11, color: '#6B6B80' }}>Gmail · Son güncelleme: az önce</p>
      </div>
      <div style={{ width: 48, height: 4, borderRadius: 2, background: '#E8E8F0', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: '60%', borderRadius: 2,
          background: '#007AFF',
          animation: 'shimmer 1.2s ease infinite',
        }} />
      </div>
    </div>
  )
}

export default function LoadingStates() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="Loading States" showBack />

      <div className="flex-1 mobile-scroll px-5 py-5">
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
            TASARIM SİSTEMİ — YÜKLEME KOMPONENTLERİ
          </p>
          <p style={{ fontSize: 13, color: '#6B6B80', lineHeight: 1.5 }}>
            Premium skeleton ve AI işleme durumları.
          </p>
        </div>

        <section style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#6B6B80', letterSpacing: '0.03em', textTransform: 'uppercase', marginBottom: 12 }}>
            AI İŞLEME DURUMU
          </p>
          <AIProcessingState />
        </section>

        <section style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#6B6B80', letterSpacing: '0.03em', textTransform: 'uppercase', marginBottom: 12 }}>
            SENKRON DURUMU
          </p>
          <SyncStatusBar />
        </section>

        <section style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#6B6B80', letterSpacing: '0.03em', textTransform: 'uppercase', marginBottom: 12 }}>
            INSIGHT KARTI SKELETON
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <InsightCardSkeleton />
            <InsightCardSkeleton />
          </div>
        </section>

        <section style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#6B6B80', letterSpacing: '0.03em', textTransform: 'uppercase', marginBottom: 12 }}>
            MAIL KARTI SKELETON
          </p>
          <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(15,15,26,0.05)' }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ borderBottom: i < 2 ? '1px solid #F2F2F8' : 'none', padding: '0 4px' }}>
                <div style={{ padding: 4 }}>
                  <EmailCardSkeleton />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#6B6B80', letterSpacing: '0.03em', textTransform: 'uppercase', marginBottom: 12 }}>
            TOPLANTI KARTI SKELETON
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <MeetingCardSkeleton />
            <MeetingCardSkeleton />
          </div>
        </section>

        <section style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#6B6B80', letterSpacing: '0.03em', textTransform: 'uppercase', marginBottom: 12 }}>
            TAM EKRAN YENİLEME
          </p>
          <div style={{ background: '#fff', borderRadius: 20, padding: '32px 20px', textAlign: 'center', boxShadow: '0 1px 4px rgba(15,15,26,0.05)' }}>
            <div style={{ fontSize: 36, marginBottom: 12, animation: 'spin 2s linear infinite', display: 'inline-block' }}>⟳</div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#0F0F1A', marginBottom: 4 }}>Güncelleniyor</p>
            <p style={{ fontSize: 12, color: '#A0A0B2' }}>Yeni içerik aranıyor...</p>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
