import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cogTypes = [
  { en: 'Language-Visual', jp: '文章を映像化して処理するのが得意なタイプ' },
  { en: 'Language-Abstract', jp: '文章を図式化して処理するのが得意なタイプ' },
  { en: 'Spoken Language', jp: '聞いた言語情報の処理が得意なタイプ' },
  { en: 'Musical', jp: '音楽的な情報の処理が得意なタイプ' },
]

const stats = [
  { num: '20+', label: '年間の指導経験' },
  { num: '3', label: '話せる言語数' },
  { num: '小1〜小6', label: '対応学年' },
  { num: '北海道', label: '在住地' },
]

const Details = () => {
  const sectionRef = useRef(null)
  const aboutLabelRef = useRef(null)
  const aboutHeadRef = useRef(null)
  const aboutLineRef = useRef(null)
  const aboutTextRef = useRef([])
  const statsRef = useRef([])
  const serviceLabelRef = useRef(null)
  const serviceHeadRef = useRef(null)
  const serviceLineRef = useRef(null)
  const serviceTextRef = useRef([])
  const cogRef = useRef([])
  const dividerRef = useRef(null)

  useEffect(() => {
    // Give the browser one frame to finish layout before setting up triggers
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {

        const fromTo = (targets, trigger, extraFrom = {}, extraTo = {}) => {
          const els = Array.isArray(targets) ? targets.filter(Boolean) : [targets].filter(Boolean)
          if (!els.length) return
          gsap.fromTo(
            els,
            { opacity: 0, y: 40, ...extraFrom },
            {
              opacity: 1, y: 0, duration: 0.9, stagger: 0.14,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: els[0],
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
              ...extraTo,
            }
          )
        }

        // About label + heading + line
        fromTo(
          [aboutLabelRef.current, aboutHeadRef.current, aboutLineRef.current],
          aboutLabelRef.current
        )

        // About paragraphs
        fromTo(aboutTextRef.current.filter(Boolean), aboutTextRef.current[0])

        // Stats chips
        gsap.fromTo(
          statsRef.current.filter(Boolean),
          { opacity: 0, y: 28, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.65, stagger: 0.1, ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: statsRef.current[0],
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )

        // Divider scale in
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1, opacity: 1,
            duration: 1.2, ease: 'power3.inOut',
            transformOrigin: 'left center',
            scrollTrigger: {
              trigger: dividerRef.current,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        )

        // Service label + heading + line
        fromTo(
          [serviceLabelRef.current, serviceHeadRef.current, serviceLineRef.current],
          serviceLabelRef.current
        )

        // Service paragraphs
        fromTo(serviceTextRef.current.filter(Boolean), serviceTextRef.current[0])

        // Cognitive cards slide from left
        gsap.fromTo(
          cogRef.current.filter(Boolean),
          { opacity: 0, x: -32 },
          {
            opacity: 1, x: 0,
            duration: 0.7, stagger: 0.12, ease: 'power2.out',
            scrollTrigger: {
              trigger: cogRef.current[0],
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )

      }, sectionRef)

      ScrollTrigger.refresh()

      return () => ctx.revert()
    }, 100) // 100ms delay ensures DOM is fully painted

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      ref={sectionRef}
      style={{
        width: '100%',
        background: '#fff',
        padding: '9rem 2rem',
        boxSizing: 'border-box',
        fontFamily: "'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', sans-serif",
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* ── ABOUT ── */}
        <div style={{ marginBottom: '7rem' }}>

          

          <h2
            ref={aboutHeadRef}
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
              fontWeight: '600', color: '#1e3a5f',
              lineHeight: 1.1, letterSpacing: '-0.04em', margin: '0 0 2rem',
            }}
          >
            PJ先生について
          </h2>

          <div ref={aboutLineRef} style={{ width: '48px', height: '3px', background: '#7DD3FC', borderRadius: '2px', marginBottom: '2.5rem' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {[
              'PJ先生は、カナダのブリティッシュコロンビア大学を卒業しています。',
              'ご家族と共に日本の北海道に在住しており、英語・フランス語・日本語の3言語を話します。現在はタイ語を勉強中で、趣味はサイクリングです。',
              '20年以上にわたり、幼稚園児と小学生への指導を続けてきた経験豊富な先生です。',
            ].map((t, i) => (
              <p
                key={i}
                ref={el => aboutTextRef.current[i] = el}
                style={{
                  fontSize: '1.15rem', lineHeight: 1.9,
                  color: '#1e293b', margin: 0,
                  paddingLeft: '1.25rem', borderLeft: '2px solid #e2e8f0',
                }}
              >
                {t}
              </p>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginTop: '3.5rem' }}>
            {stats.map((s, i) => (
              <div
                key={i}
                ref={el => statsRef.current[i] = el}
                style={{
                  background: '#F0F9FF', border: '1px solid #BAE6FD',
                  borderRadius: '16px', padding: '1.4rem 1rem', textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '1.9rem', fontWeight: '800', color: '#1e3a5f', lineHeight: 1, marginBottom: '6px', letterSpacing: '-0.02em' }}>
                  {s.num}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#1e3a5f', fontWeight: '500' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SERVICES ── */}
        <div>

          

          <h2
            ref={serviceHeadRef}
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
              fontWeight: '800', color: '#1e3a5f',
              lineHeight: 1.1, letterSpacing: '-0.04em', margin: '0 0 2rem',
            }}
          >
            個別対応型<br />オンライン英語指導
          </h2>

          <div ref={serviceLineRef} style={{ width: '48px', height: '3px', background: '#7DD3FC', borderRadius: '2px', marginBottom: '2.5rem' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', marginBottom: '3.5rem' }}>
            {[
              'このサービスは、お子様の学習スタイルに合わせた、柔軟で個別対応型のオンライン英語指導を必要とする保護者の方々を対象としています。お子様が興味を持つトピックを取り入れたカスタマイズカリキュラムも追加可能です。',
              'オンライン授業中、教師は特別なアプリを使用します。まるで子どもが絵本を読んでページをめくっているかのような、臨場感あふれる学習体験を提供します。',
              '子どもの認知特性を理解することで、その子の得意な特性を活かした指導が可能となり、一人ひとりの理解度を最大限に高めることができます。',
              'お子様の認知能力に応じて学習教材が選定され、完全にオーダーメイドされた個別カリキュラムが作成されます。',
            ].map((t, i) => (
              <p
                key={i}
                ref={el => serviceTextRef.current[i] = el}
                style={{
                  fontSize: '1.15rem', lineHeight: 1.9,
                  color: '#1e293b', margin: 0,
                  paddingLeft: '1.25rem', borderLeft: '2px solid #e2e8f0',
                }}
              >
                {t}
              </p>
            ))}
          </div>

          <p className='font-semibold' style={{ fontSize: '0.78rem', letterSpacing: '0.12em', color: '#1e3a5f', marginBottom: '1.2rem' }}>
            Cognitive Learning Types
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            {cogTypes.map((t, i) => (
              <div
                key={i}
                ref={el => cogRef.current[i] = el}
                style={{
                  background: '#FAFAFA', border: '1px solid #E2E8F0',
                  borderTop: '3px solid #7DD3FC', borderRadius: '12px',
                  padding: '1.4rem 1.2rem',
                }}
              >
                <div style={{ fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1e3a5f', marginBottom: '8px' }}>
                  {t.en}
                </div>
                <div style={{ fontSize: '1rem', color: '#1e293b', lineHeight: 1.65, fontWeight: '500' }}>
                  {t.jp}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Details