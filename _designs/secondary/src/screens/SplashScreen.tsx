import { useEffect } from 'react'
import { useNavigation } from '../context/NavigationContext'

export default function SplashScreen() {
  const { navigate } = useNavigation()

  useEffect(() => {
    const t = setTimeout(() => navigate('onboarding'), 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex flex-col flex-1 items-center justify-center" style={{ background: '#0F0F1A' }}>
      <div className="animate-scale-in" style={{ textAlign: 'center' }}>
        <div className="animate-float" style={{ marginBottom: 20 }}>
          <div style={{
            width: 88, height: 88, borderRadius: 26,
            background: 'linear-gradient(135deg, #7879F1 0%, #5B5CE2 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 20px 60px rgba(91,92,226,0.5)',
            margin: '0 auto',
          }}>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <circle cx="22" cy="22" r="20" stroke="white" strokeWidth="2" fill="none" strokeOpacity="0.3"/>
              <path d="M13 22h7l3-9 4 18 3-9h5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', marginBottom: 6 }}>
          Dijital Asistan
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
          Bugün bilmen gerekenleri, sen sormadan söyler.
        </p>
      </div>

      {/* Loading dots */}
      <div style={{ position: 'absolute', bottom: 60, display: 'flex', gap: 6 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: 3,
            background: 'rgba(255,255,255,0.3)',
            animation: `wavePulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
    </div>
  )
}
