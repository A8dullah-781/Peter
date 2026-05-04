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
  const imgColRef = useRef(null)
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
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {

        const fadeUp = (targets, extraFrom = {}, extraTo = {}) => {
          const els = Array.isArray(targets) ? targets.filter(Boolean) : [targets].filter(Boolean)
          if (!els.length) return
          gsap.fromTo(els,
            { opacity: 0, y: 40, ...extraFrom },
            {
              opacity: 1, y: 0, duration: 0.9, stagger: 0.14, ease: 'power3.out',
              scrollTrigger: { trigger: els[0], start: 'top 88%', toggleActions: 'play none none none' },
              ...extraTo,
            }
          )
        }

        gsap.fromTo(imgColRef.current,
          { opacity: 0, x: -48 },
          {
            opacity: 1, x: 0, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: imgColRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          }
        )

        fadeUp([aboutHeadRef.current, aboutLineRef.current])
        fadeUp(aboutTextRef.current.filter(Boolean))

        gsap.fromTo(statsRef.current.filter(Boolean),
          { opacity: 0, y: 28, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: statsRef.current[0], start: 'top 90%', toggleActions: 'play none none none' },
          }
        )

        gsap.fromTo(dividerRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1, opacity: 1, duration: 1.2, ease: 'power3.inOut', transformOrigin: 'left center',
            scrollTrigger: { trigger: dividerRef.current, start: 'top 92%', toggleActions: 'play none none none' },
          }
        )

        fadeUp([serviceLabelRef.current, serviceHeadRef.current, serviceLineRef.current])
        fadeUp(serviceTextRef.current.filter(Boolean))

        gsap.fromTo(cogRef.current.filter(Boolean),
          { opacity: 0, x: -32 },
          {
            opacity: 1, x: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
            scrollTrigger: { trigger: cogRef.current[0], start: 'top 90%', toggleActions: 'play none none none' },
          }
        )

      }, sectionRef)

      ScrollTrigger.refresh()
      return () => ctx.revert()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    // SEO: div → section with aria-labelledby pointing at the h2
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      style={{
        width: '100%',
        background: '#fff',
        padding: '9rem 2rem',
        boxSizing: 'border-box',
        fontFamily: "'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', sans-serif",
      }}
    >
      <style>{`
        @keyframes borderFloat {
          0%, 100% { transform: translate(14px, 14px); opacity: 0.55; }
          50%       { transform: translate(20px, 20px); opacity: 1; }
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; gap: 3rem; }
          .img-sticky { position: static !important; }
        }

        .img-wrapper {
          position: relative;
          padding-bottom: 20px;
          padding-right: 20px;
        }
        .img-deco-border {
          position: absolute;
          top: 0;
          left: 0;
          right: 20px;
          bottom: 20px;
          border: 2px solid #7DD3FC;
          border-radius: 24px;
          transform: translate(14px, 14px);
          animation: borderFloat 5s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }
        .img-frame {
          position: relative;
          z-index: 1;
          border-radius: 24px;
          overflow: hidden;
          aspect-ratio: 4 / 5;
          box-shadow: 0 24px 64px rgba(30, 58, 95, 0.16);
        }
        .img-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: transform 0.7s ease;
        }
        .img-frame:hover img { transform: scale(1.04); }

        .pj-badge {
          position: absolute;
          bottom: 14px;
          right: 14px;
          z-index: 2;
          background: rgba(30, 58, 95, 0.85);
          backdrop-filter: blur(8px);
          color: #7DD3FC;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 0.5rem 0.9rem;
          border-radius: 10px;
        }

        .stat-chip {
          background: #F0F9FF;
          border: 1px solid #BAE6FD;
          border-radius: 16px;
          padding: 1.2rem 1rem;
          text-align: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .stat-chip:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(30,58,95,0.1);
        }

        .cog-card {
          background: #FAFAFA;
          border: 1px solid #E2E8F0;
          border-top: 3px solid #7DD3FC;
          border-radius: 12px;
          padding: 1.4rem 1.2rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(30,58,95,0.09);
          border-top-color: #1e3a5f;
        }
      `}</style>

      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* ── ABOUT ── */}
        <div className="about-grid">

          {/* Left: Image + stats */}
          <div ref={imgColRef} className="img-sticky" style={{ position: 'sticky', top: '6rem' }}>

            <figure className="img-wrapper" style={{ margin: 0 }}>
              {/* SEO: aria-hidden on purely decorative border */}
              <div className="img-deco-border" aria-hidden="true" />
              <div className="img-frame">
                {/* SEO: descriptive alt, eager loading, fetchPriority, explicit dimensions */}
                <img
                  src="/images/peter.webp"
                  alt="PJ先生 — カナダ出身、20年以上の指導経験を持つオンライン英会話教師"
                  width={480}
                  height={600}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
                {/* SEO: aria-hidden — badge is decorative, alt text already names the teacher */}
                <div className="pj-badge" aria-hidden="true">PJ先生</div>
              </div>
            </figure>

            {/* SEO: div grid → dl with dt/dd pairs for semantic stat markup */}
            <dl style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '2.5rem' }}>
              {stats.map((s, i) => (
                <div key={i} ref={el => statsRef.current[i] = el} className="stat-chip">
                  <dd style={{ fontSize: '1.7rem', fontWeight: '800', color: '#1e3a5f', lineHeight: 1, marginBottom: '4px', letterSpacing: '-0.02em', margin: 0 }}>
                    {s.num}
                  </dd>
                  <dt style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: '500' }}>{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: Bio text */}
          <div>
            {/* SEO: aria-hidden — "About" is a decorative label, not meaningful heading content */}
            <p aria-hidden="true" style={{ fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#7DD3FC', margin: '0 0 1rem' }}>
              About
            </p>

            {/* SEO: id="about-heading" referenced by the section's aria-labelledby */}
            <h2
              id="about-heading"
              ref={aboutHeadRef}
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: '700', color: '#1e3a5f', lineHeight: 1.1, letterSpacing: '-0.04em', margin: '0 0 1.6rem' }}
            >
              PJ先生について
            </h2>

            {/* SEO: aria-hidden on decorative line */}
            <div ref={aboutLineRef} aria-hidden="true" style={{ width: '48px', height: '3px', background: '#7DD3FC', borderRadius: '2px', marginBottom: '2.5rem' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              {[
                'PJ先生は、カナダのブリティッシュコロンビア大学を卒業しています。',
                'ご家族と共に日本の北海道に在住しており、英語・フランス語・日本語の3言語を話します。現在はタイ語を勉強中で、趣味はサイクリングです。',
                '20年以上にわたり、幼稚園児と小学生への指導を続けてきた経験豊富な先生です。',
              ].map((t, i) => (
                <p
                  key={i}
                  ref={el => aboutTextRef.current[i] = el}
                  style={{ fontSize: '1.08rem', lineHeight: 1.9, color: '#1e293b', margin: 0, paddingLeft: '1.25rem', borderLeft: '2px solid #e2e8f0' }}
                >
                  {t}
                </p>
              ))}
            </div>

            <div style={{
              marginTop: '2.5rem',
              background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
              border: '1px solid #BAE6FD',
              borderRadius: '16px',
              padding: '1.4rem 1.6rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}>
              {/* SEO: aria-hidden on decorative icon */}
              <div aria-hidden="true" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1e3a5f', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#7DD3FC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500', marginBottom: '2px' }}>卒業校</div>
                <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1e3a5f' }}>University of British Columbia, Canada</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── DIVIDER ── */}
        {/* SEO: aria-hidden — purely decorative */}
        <div ref={dividerRef} aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', margin: '7rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #BAE6FD, transparent)' }} />
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7DD3FC' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#1e3a5f' }} />
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7DD3FC' }} />
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, #BAE6FD)' }} />
        </div>

        {/* ── SERVICES ── */}
        {/* SEO: div → section with aria-labelledby */}
        <section aria-labelledby="services-heading">

          {/* SEO: aria-hidden — decorative label */}
          <p ref={serviceLabelRef} aria-hidden="true" style={{ fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#7DD3FC', margin: '0 0 1rem' }}>
            Services
          </p>

          {/* SEO: id="services-heading" referenced by the section's aria-labelledby */}
          <h2
            id="services-heading"
            ref={serviceHeadRef}
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: '800', color: '#1e3a5f', lineHeight: 1.1, letterSpacing: '-0.04em', margin: '0 0 1.6rem' }}
          >
            個別対応型<br />オンライン英語指導
          </h2>

          {/* SEO: aria-hidden on decorative line */}
          <div ref={serviceLineRef} aria-hidden="true" style={{ width: '48px', height: '3px', background: '#7DD3FC', borderRadius: '2px', marginBottom: '2.5rem' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.2rem 3rem', marginBottom: '3.5rem' }}>
            {[
              'このサービスは、お子様の学習スタイルに合わせた、柔軟で個別対応型のオンライン英会話・英語学習を必要とする保護者の方々を対象としています。発達障害のお子様にも対応しており、お子様が興味を持つトピックを取り入れたカスタマイズカリキュラムも追加可能です。',
              'オンライン授業中、教師は特別なアプリを使用します。まるで子どもが絵本を読んでページをめくっているかのような、臨場感あふれる学習体験を提供します。',
              '子どもの認知特性を理解することで、その子の得意な特性を活かした指導が可能となり、一人ひとりの理解度を最大限に高めることができます。発達障害・学習障害のあるお子様の英会話学習も丁寧にサポートします。',
              'お子様の認知能力に応じて学習教材が選定され、完全にオーダーメイドされた個別カリキュラムが作成されます。',
            ].map((t, i) => (
              <p
                key={i}
                ref={el => serviceTextRef.current[i] = el}
                style={{ fontSize: '1.05rem', lineHeight: 1.9, color: '#1e293b', margin: 0, paddingLeft: '1.25rem', borderLeft: '2px solid #e2e8f0' }}
              >
                {t}
              </p>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.4rem' }}>
            {/* SEO: p → h3 for correct heading hierarchy (h2 → h3) */}
            <h3 style={{ fontSize: '0.74rem', fontWeight: '700', letterSpacing: '0.14em', color: '#1e3a5f', margin: 0, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              Cognitive Learning Types
            </h3>
            <div aria-hidden="true" style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
          </div>

          {/* SEO: div grid → ul/li for semantic list markup */}
          <ul
            aria-label="認知学習タイプ一覧"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', listStyle: 'none', padding: 0, margin: 0 }}
          >
            {cogTypes.map((t, i) => (
              <li key={i} ref={el => cogRef.current[i] = el} className="cog-card">
                <div style={{ fontSize: '0.68rem', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1e3a5f', marginBottom: '8px' }}>
                  {t.en}
                </div>
                <div style={{ fontSize: '0.96rem', color: '#1e293b', lineHeight: 1.65, fontWeight: '500' }}>
                  {t.jp}
                </div>
              </li>
            ))}
          </ul>

        </section>
      </div>
    </section>
  )
}

export default Details