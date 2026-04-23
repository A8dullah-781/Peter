import React, { useState, useRef, useEffect } from 'react'

const sections = [
  {
    label: 'NO',
    labelJp: 'いいえ',
    color: '#ef4444',
    faqs: [
      { q: 'Is there a contract?', jp: '契約はありますか？', a: 'No. There is no contract required.', aJp: '契約は必要ありません。' },
      { q: 'Do I need some English ability to start?', jp: 'レッスンを始めるには英語力が必要ですか？', a: 'No. No prior English ability is needed.', aJp: '事前の英語力は必要ありません。' },
      { q: 'Can I use a smartphone?', jp: 'スマートフォンでレッスンに参加できますか？', a: 'No. A tablet or computer is required.', aJp: 'タブレットまたはパソコンが必要です。' },
      { q: 'Can I reschedule a class?', jp: 'レッスンの日程変更はできますか？', a: 'No. Make-up lessons or rescheduling is not permitted. However, you may join late.', aJp: '補講やレッスンの日程変更はできません。ただし、途中参加は可能です。' },
      { q: 'Will I get a certificate?', jp: 'コース修了後に修了証はもらえますか？', a: 'No. We do not issue certificates at this time.', aJp: '現在、修了証の発行は行っておりません。' },
      { q: 'Is there homework or self-study materials?', jp: '宿題や自習教材はありますか？', a: 'No. All learning takes place during lessons.', aJp: 'すべての学習はレッスン中に行われます。' },
      { q: 'Do I need to buy textbooks?', jp: '教科書を購入する必要がありますか？', a: 'No. All materials are provided by the teacher.', aJp: '教材はすべて先生が提供します。' },
      { q: 'Do you offer refunds?', jp: '返金はありますか？', a: 'No. We do not offer refunds.', aJp: '返金は承っておりません。' },
      { q: 'Do you offer discounts?', jp: '割引はありますか？', a: 'No. There are no discounts available at this time.', aJp: '現在、割引は行っておりません。' },
      { q: 'Do you offer in-person lessons at home?', jp: '自宅での対面レッスンはありますか？', a: 'No. All lessons are conducted online only.', aJp: 'すべてのレッスンはオンラインのみで行われます。' },
    ]
  },
  {
    label: 'YES',
    labelJp: 'はい',
    color: '#16a34a',
    faqs: [
      { q: 'Do you offer a free trial class?', jp: '無料体験レッスンはありますか？', a: 'Yes. We offer a free trial lesson with no obligation.', aJp: 'はい。義務なしで無料体験レッスンをご提供しています。' },
      { q: 'Can you quit anytime?', jp: 'いつでも解約できますか？', a: 'Yes. You can cancel your registration at any time by emailing PJ Sensei.', aJp: 'はい。PJ先生にメールを送ることでいつでも登録をキャンセルできます。' },
      { q: 'Are your teachers native speakers?', jp: '講師はネイティブスピーカーですか？', a: 'Yes. All teachers are native English-speaking professionals.', aJp: 'はい。すべての講師は英語を母国語とするプロフェッショナルです。' },
      { q: 'Are all lessons with a teacher?', jp: 'オンラインレッスンはすべて講師によるものですか？', a: 'Yes. Every lesson is conducted by a qualified teacher.', aJp: 'はい。すべてのレッスンは資格のある講師が行います。' },
      { q: 'Can you send an invoice after payment?', jp: 'レッスン料金を支払った後、請求書を送ってもらえますか？', a: 'Yes. An invoice can be sent upon request after payment.', aJp: 'はい。お支払い後、ご要望に応じて請求書をお送りします。' },
      { q: 'Can my child increase lesson frequency?', jp: 'レッスンの頻度を増やすことはできますか？', a: 'Yes. If your child wants more lessons, increased frequency is possible. Please consult PJ Sensei.', aJp: 'はい。お子様がより多くのレッスンを希望する場合、頻度を増やすことが可能です。PJ先生にご相談ください。' },
    ]
  },
  {
    label: 'Details',
    labelJp: '詳細',
    color: '#0369a1',
    faqs: [
      { q: 'From what age can I join?', jp: '何歳からレッスンに参加できますか？', a: 'Ages 6 to 12 years old (Grade 1 to Grade 6).', aJp: '6歳から12歳まで（小学1年生から6年生）。' },
      { q: 'How much is the monthly fee?', jp: '月謝はいくらですか？', a: '6,000 yen per month.', aJp: '月額6,000円です。' },
      { q: 'How do you pay?', jp: '支払い方法は？', a: 'Payment is usually made via the PayPay app. Other payment options are available upon consultation.', aJp: '通常はPayPayアプリでのお支払いとなります。その他の支払い方法についてはご相談ください。' },
      { q: 'How do I register and start lessons?', jp: '登録とレッスン開始方法は？', a: 'Send PJ Sensei an email to begin registration and start lessons.', aJp: 'レッスン開始をご希望の方は、PJ先生までメールでご連絡ください。' },
      { q: 'What teaching methods and materials are used?', jp: 'どのような指導方法と教材を使用していますか？', a: 'We use a dynamic method based on the cognitive strengths of each child. Activities include phonics, conversation, listening, picture books, songs, chants, and interactive drawing activities.', aJp: 'お子様一人ひとりの認知能力に合わせたダイナミックな指導法を採用しています。' },
      { q: 'How many lessons per year and how long?', jp: 'レッスンの回数と各レッスンの時間は？', a: '86 lessons per year (30 minutes each), based on an April–March cycle. Generally two times a week: 30 minutes one-on-one, then 30 minutes in a group.', aJp: '年間86レッスン（各30分）、4月〜3月のサイクルです。通常週2回。' },
      { q: 'What equipment do I need?', jp: '必要な機材は？', a: 'A tablet or computer, child-sized headphones, and an internet connection.', aJp: 'タブレットまたはパソコン、子供用ヘッドホン、インターネット接続が必要です。' },
      { q: 'What software do I need?', jp: 'ダウンロードするソフトウェアは？', a: 'It is recommended to download the Zoom app for a smooth learning experience.', aJp: 'スムーズな学習のためにZoomアプリのダウンロードをお勧めします。' },
      { q: 'What if I am late or miss a class?', jp: '遅刻や欠席した場合はどうなりますか？', a: 'You may join late, but make-up lessons and rescheduling are not permitted.', aJp: '途中参加は可能ですが、補講やレッスンの日程変更はできません。' },
      { q: 'How is progress assessed?', jp: '学習の進捗はどのように評価されますか？', a: 'PJ Sensei will send a progress report email to parents at the end of each school term.', aJp: 'PJ先生は各学期末に保護者の方へ学習進捗レポートをメールでお送りします。' },
      { q: 'How many students are in a group lesson?', jp: 'グループレッスンの生徒数は？', a: 'The number of students is not fixed and may fluctuate from time to time.', aJp: 'グループの生徒数は固定されておらず、状況によって変動します。' },
      { q: 'How do I cancel my registration?', jp: '登録をキャンセルするには？', a: 'Send an email to PJ Sensei and your registration will be cancelled promptly.', aJp: 'PJ先生にメールを送っていただければ、登録をキャンセルできます。' },
    ]
  }
]

/* ─── Intersection observer ────────────────────────────────────────────────── */
const useInView = (threshold = 0.12) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

/* ─── FAQ Item ─────────────────────────────────────────────────────────────── */
const FAQItem = ({ faq, isOpen, onClick, accentColor, idx }) => {
  const bodyRef = useRef(null)
  const [height, setHeight] = useState(0)
  const [ref, inView] = useInView(0.05)

  useEffect(() => {
    setHeight(isOpen ? bodyRef.current.scrollHeight : 0)
  }, [isOpen])

  return (
    <div
      ref={ref}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        borderRadius: '10px',
        background: isOpen ? 'rgba(255,255,255,0.55)' : 'transparent',
        padding: '0 0.75rem',
        transition: 'background 0.25s ease, box-shadow 0.25s ease',
        boxShadow: isOpen ? '0 2px 18px rgba(0,0,0,0.06)' : 'none',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(-20px)',
        transitionProperty: 'opacity, transform, background, box-shadow',
        transitionDuration: `0.45s, 0.45s, 0.25s, 0.25s`,
        transitionDelay: `${idx * 0.04}s, ${idx * 0.04}s, 0s, 0s`,
        transitionTimingFunction: 'cubic-bezier(0.23,1,0.32,1)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.15rem 0.25rem', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a', lineHeight: 1.45, fontFamily: "'Helvetica Neue', sans-serif" }}>{faq.q}</div>
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '3px', fontFamily: "'Hiragino Kaku Gothic ProN', sans-serif" }}>{faq.jp}</div>
        </div>
        <div style={{
          width: '26px', height: '26px', minWidth: '26px', borderRadius: '50%',
          background: isOpen ? accentColor : 'rgba(255,255,255,0.7)',
          border: `1.5px solid ${accentColor}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)',
          flexShrink: 0,
          boxShadow: isOpen ? `0 0 12px ${accentColor}44` : 'none',
        }}>
          <svg width="11" height="11" viewBox="0 0 12 12" style={{ transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
            <line x1="6" y1="1" x2="6" y2="11" stroke={isOpen ? 'white' : accentColor} strokeWidth="2" strokeLinecap="round" />
            <line x1="1" y1="6" x2="11" y2="6" stroke={isOpen ? 'white' : accentColor} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div style={{ height: `${height}px`, overflow: 'hidden', transition: 'height 0.42s cubic-bezier(0.4, 0, 0.2, 1)' }}>
        <div ref={bodyRef} style={{ padding: '0 0.25rem 1.2rem' }}>
          <p style={{ margin: '0 0 0.4rem', fontSize: '0.95rem', color: '#1e293b', lineHeight: 1.8 }}>{faq.a}</p>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.8, fontStyle: 'italic', fontFamily: "'Hiragino Kaku Gothic ProN', sans-serif" }}>{faq.aJp}</p>
        </div>
      </div>
    </div>
  )
}

/* ─── Footer Contact Chip ──────────────────────────────────────────────────── */
const ContactChip = ({ href, icon, label, sub }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '14px',
        padding: '14px 20px',
        borderRadius: '14px',
        border: `1.5px solid ${hovered ? 'rgba(30,58,95,0.35)' : 'rgba(30,58,95,0.12)'}`,
        background: hovered ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(8px)',
        textDecoration: 'none',
        transition: 'all 0.28s cubic-bezier(0.23,1,0.32,1)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 28px rgba(30,58,95,0.12)' : 'none',
        cursor: 'pointer',
      }}
    >
      <div style={{
        width: '38px', height: '38px', borderRadius: '10px',
        background: hovered ? '#1e3a5f' : 'rgba(30,58,95,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.28s ease', flexShrink: 0,
      }}>
        <span style={{ color: hovered ? 'white' : '#1e3a5f', transition: 'color 0.28s ease', fontSize: '16px' }}>{icon}</span>
      </div>
      <div>
        <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: '#64748b', textTransform: 'uppercase', fontWeight: '600', marginBottom: '2px' }}>{label}</div>
        <div style={{ fontSize: '0.85rem', color: '#1e293b', fontWeight: '600', letterSpacing: '0.01em' }}>{sub}</div>
      </div>
    </a>
  )
}

/* ─── Footer Nav Link ──────────────────────────────────────────────────────── */
const FooterLink = ({ href, children }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: 'none',
        fontSize: '0.85rem',
        color: hovered ? '#0f172a' : '#1e3a5f',
        letterSpacing: '0.05em',
        transition: 'color 0.22s ease',
        borderBottom: `1px solid ${hovered ? '#1e3a5f' : 'transparent'}`,
        paddingBottom: '1px',
        transitionProperty: 'color, border-color',
        transitionDuration: '0.22s',
      }}
    >
      {children}
    </a>
  )
}

/* ─── Social Icon ──────────────────────────────────────────────────────────── */
const SocialIcon = ({ href, children, label }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '42px', height: '42px', borderRadius: '50%',
        border: `1.5px solid ${hovered ? '#1e3a5f' : 'rgba(30,58,95,0.2)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: hovered ? '#1e3a5f' : 'rgba(255,255,255,0.25)',
        backdropFilter: 'blur(6px)',
        color: hovered ? 'white' : '#1e3a5f',
        transition: 'all 0.28s cubic-bezier(0.23,1,0.32,1)',
        transform: hovered ? 'translateY(-3px) scale(1.08)' : 'translateY(0) scale(1)',
        textDecoration: 'none',
      }}
    >
      {children}
    </a>
  )
}

/* ─── Main Component ───────────────────────────────────────────────────────── */
const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null)
  const [headerRef, headerInView] = useInView(0.2)
  const [footerRef, footerInView] = useInView(0.05)

  const handleClick = (sIdx, fIdx) => {
    const key = `${sIdx}-${fIdx}`
    setOpenIndex(prev => prev === key ? null : key)
  }

  return (
    <>
      {/* ══════════════════ FAQ SECTION ══════════════════ */}
      <div
        id="faqs"
        style={{
          minHeight: '100vh',
          width: '100%',
          background: '#7DD3FC',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '6rem 7.5vw 5rem',
          fontFamily: "'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', sans-serif",
        }}
      >
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: 'center', marginBottom: '4rem',
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.23,1,0.32,1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '1rem' }}>
            <span style={{ display: 'inline-block', width: '32px', height: '2px', background: '#1e3a5f' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#1e3a5f' }}>
              Frequently Asked Questions
            </span>
            <span style={{ display: 'inline-block', width: '32px', height: '2px', background: '#1e3a5f' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: '800', color: '#0f172a', margin: 0, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            よくある質問
          </h2>
        </div>

        {/* FAQ Sections */}
        <div style={{ width: '100%', maxWidth: '860px', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {sections.map((section, sIdx) => (
            <div key={sIdx}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                <div style={{ color: section.color, fontSize: '0.9rem', fontWeight: '700', letterSpacing: '0.22em', textTransform: 'uppercase', flexShrink: 0 }}>
                  {section.label}
                </div>
                <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.12)' }} />
                <span style={{ fontSize: '0.78rem', color: '#1e3a5f', fontWeight: '600', flexShrink: 0, fontFamily: "'Hiragino Kaku Gothic ProN', sans-serif" }}>
                  {section.labelJp}
                </span>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.28)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.55)',
                padding: '0.4rem 0.5rem',
                display: 'flex', flexDirection: 'column',
              }}>
                {section.faqs.map((faq, fIdx) => (
                  <FAQItem
                    key={fIdx}
                    faq={faq}
                    idx={fIdx}
                    isOpen={openIndex === `${sIdx}-${fIdx}`}
                    onClick={() => handleClick(sIdx, fIdx)}
                    accentColor={section.color}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════ CLOUD TRANSITION ══════════════════ */}
      <div
        className="bg-[url('/images/cloudfooter.webp')] bg-cover bg-no-repeat bg-top"
        style={{ width: '100%' }}
      >
        {/* ══════════════════ FOOTER ══════════════════ */}
        <footer
          id="contact"
          ref={footerRef}
          style={{
            paddingTop: '28vh',
            paddingBottom: '0',
            paddingLeft: '8vw',
            paddingRight: '8vw',
            fontFamily: "'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', sans-serif",
          }}
        >

          {/* ── Logo & Tagline ── */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            textAlign: 'center', marginBottom: '3.5rem',
            opacity: footerInView ? 1 : 0,
            transform: footerInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.23,1,0.32,1) 0.1s',
          }}>
            <img className="invert w-[40vw] md:w-[15vw]" src="/images/360logo.webp" alt="360 English" />
            <div style={{ fontSize: 'clamp(0.75rem,2vw,1rem)', fontWeight: '700', marginTop: '2rem', letterSpacing: '0.5em', color: '#1e3a5f', textTransform: 'uppercase' }}>
              E N G L I S H
            </div>
          </div>

          {/* ── Contact Cards Grid ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '12px',
            maxWidth: '900px',
            margin: '0 auto 3rem',
            opacity: footerInView ? 1 : 0,
            transform: footerInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.65s ease 0.25s, transform 0.65s cubic-bezier(0.23,1,0.32,1) 0.25s',
          }}>
            <ContactChip
              href="mailto:pj@abckid360.com"
              label="Primary Email"
              sub="pj@abckid360.com"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="3"/>
                  <polyline points="2,4 12,13 22,4"/>
                </svg>
              }
            />
            <ContactChip
              href="mailto:abckid360@gmail.com"
              label="General Email"
              sub="abckid360@gmail.com"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="3"/>
                  <polyline points="2,4 12,13 22,4"/>
                </svg>
              }
            />
            <ContactChip
              href="https://maps.google.com/?q=北海道札幌市北区麻生町3-2-4-206"
              label="Physical Address"
              sub="〒001-0045 北海道札幌市北区麻生町3-2-4-206 GTS内"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              }
            />
          </div>

          {/* ── Divider ── */}
          <div style={{
            maxWidth: '900px', margin: '0 auto',
            height: '1px', background: 'rgba(0,0,0,0.07)',
            opacity: footerInView ? 1 : 0,
            transition: 'opacity 0.5s ease 0.4s',
          }} />

          {/* ── Nav + Socials ── */}
         

          {/* ── Bottom bar ── */}
          <div style={{
            maxWidth: '900px', margin: '0 auto',
            borderTop: '1px solid rgba(0,0,0,0.07)',
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
            alignItems: 'center', gap: '12px', paddingTop: '1.25rem', paddingBottom: '6rem',
            opacity: footerInView ? 1 : 0,
            transition: 'opacity 0.5s ease 0.6s',
          }}>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>
              © 2025 · 360 English · PJ Sensei · All rights reserved.
            </div>
           
          </div>

        </footer>
      </div>
    </>
  )
}

export default Faq