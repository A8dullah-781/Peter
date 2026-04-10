// import React, { useState, useRef, useEffect } from 'react'

// const sections = [
//   {
//     label: 'NO',
//     labelJp: 'いいえ',
//     color: '#ef4444',
//     lightColor: '#fef2f2',
//     borderColor: '#fecaca',
//     faqs: [
//       { q: 'Is there a contract?', jp: '契約はありますか？', a: 'No. There is no contract required.', aJp: '契約は必要ありません。' },
//       { q: 'Do I need some English ability to start?', jp: 'レッスンを始めるには英語力が必要ですか？', a: 'No. No prior English ability is needed.', aJp: '事前の英語力は必要ありません。' },
//       { q: 'Can I use a smartphone?', jp: 'スマートフォンでレッスンに参加できますか？', a: 'No. A tablet or computer is required.', aJp: 'タブレットまたはパソコンが必要です。' },
//       { q: 'Can I reschedule a class?', jp: 'レッスンの日程変更はできますか？', a: 'No. Make-up lessons or rescheduling is not permitted. However, you may join late.', aJp: '補講やレッスンの日程変更はできません。ただし、途中参加は可能です。' },
//       { q: 'Will I get a certificate?', jp: 'コース修了後に修了証はもらえますか？', a: 'No. We do not issue certificates at this time.', aJp: '現在、修了証の発行は行っておりません。' },
//       { q: 'Is there homework or self-study materials?', jp: '宿題や自習教材はありますか？', a: 'No. All learning takes place during lessons.', aJp: 'すべての学習はレッスン中に行われます。' },
//       { q: 'Do I need to buy textbooks?', jp: '教科書を購入する必要がありますか？', a: 'No. All materials are provided by the teacher.', aJp: '教材はすべて先生が提供します。' },
//       { q: 'Do you offer refunds?', jp: '返金はありますか？', a: 'No. We do not offer refunds.', aJp: '返金は承っておりません。' },
//       { q: 'Do you offer discounts?', jp: '割引はありますか？', a: 'No. There are no discounts available at this time.', aJp: '現在、割引は行っておりません。' },
//       { q: 'Do you offer in-person lessons at home?', jp: '自宅での対面レッスンはありますか？', a: 'No. All lessons are conducted online only.', aJp: 'すべてのレッスンはオンラインのみで行われます。' },
//     ]
//   },
//   {
//     label: 'YES',
//     labelJp: 'はい',
//     color: '#16a34a',
//     lightColor: '#f0fdf4',
//     borderColor: '#bbf7d0',
//     faqs: [
//       { q: 'Do you offer a free trial class?', jp: '無料体験レッスンはありますか？', a: 'Yes. We offer a free trial lesson with no obligation.', aJp: 'はい。義務なしで無料体験レッスンをご提供しています。' },
//       { q: 'Can you quit anytime?', jp: 'いつでも解約できますか？', a: 'Yes. You can cancel your registration at any time by emailing PJ Sensei.', aJp: 'はい。PJ先生にメールを送ることでいつでも登録をキャンセルできます。' },
//       { q: 'Are your teachers native speakers?', jp: '講師はネイティブスピーカーですか？', a: 'Yes. All teachers are native English-speaking professionals.', aJp: 'はい。すべての講師は英語を母国語とするプロフェッショナルです。' },
//       { q: 'Are all lessons with a teacher?', jp: 'オンラインレッスンはすべて講師によるものですか？', a: 'Yes. Every lesson is conducted by a qualified teacher.', aJp: 'はい。すべてのレッスンは資格のある講師が行います。' },
//       { q: 'Can you send an invoice after payment?', jp: 'レッスン料金を支払った後、請求書を送ってもらえますか？', a: 'Yes. An invoice can be sent upon request after payment.', aJp: 'はい。お支払い後、ご要望に応じて請求書をお送りします。' },
//       { q: 'Can my child increase lesson frequency?', jp: 'レッスンの頻度を増やすことはできますか？', a: 'Yes. If your child wants more lessons, increased frequency is possible. Please consult PJ Sensei.', aJp: 'はい。お子様がより多くのレッスンを希望する場合、頻度を増やすことが可能です。PJ先生にご相談ください。' },
//     ]
//   },
//   {
//     label: 'Details',
//     labelJp: '詳細',
//     color: '#0369a1',
//     lightColor: '#f0f9ff',
//     borderColor: '#bae6fd',
//     faqs: [
//       {
//         q: 'From what age can I join?', jp: '何歳からレッスンに参加できますか？',
//         a: 'Ages 6 to 12 years old (Grade 1 to Grade 6).', aJp: '6歳から12歳まで（小学1年生から6年生）。'
//       },
//       {
//         q: 'How much is the monthly fee?', jp: '月謝はいくらですか？',
//         a: '6,000 yen per month.', aJp: '月額6,000円です。'
//       },
//       {
//         q: 'How do you pay?', jp: '支払い方法は？',
//         a: 'Payment is usually made via the PayPay app. Other payment options are available upon consultation.', aJp: '通常はPayPayアプリでのお支払いとなります。その他の支払い方法についてはご相談ください。'
//       },
//       {
//         q: 'How do I register and start lessons?', jp: '登録とレッスン開始方法は？',
//         a: 'Send PJ Sensei an email to begin registration and start lessons.', aJp: 'レッスン開始をご希望の方は、PJ先生までメールでご連絡ください。'
//       },
//       {
//         q: 'What teaching methods and materials are used?', jp: 'どのような指導方法と教材を使用していますか？',
//         a: 'We use a dynamic method based on the cognitive strengths of each child. Activities include phonics, conversation, listening, picture books, songs, chants, and interactive drawing activities. All books, music, and phonics materials are created by professional artists and musicians. Materials follow the ESL syllabus from Grade 1 to Grade 6.',
//         aJp: 'お子様一人ひとりの認知能力に合わせたダイナミックな指導法を採用しています。フォニックス、会話、リスニング、絵本、歌、チャント、インタラクティブな描画活動を取り入れています。絵本・音楽・フォニックス教材はプロのアーティストとミュージシャンが制作。教材は小1〜小6のESL語彙・文法目標に沿ったものです。'
//       },
//       {
//         q: 'How many lessons per year and how long?', jp: 'レッスンの回数と各レッスンの時間は？',
//         a: 'There are 86 lessons per year (30 minutes each), based on an April–March cycle. Generally two times a week: 30 minutes one-on-one, then 30 minutes in a group.',
//         aJp: '年間86レッスン（各30分）、4月〜3月のサイクルです。通常週2回：1回目はマンツーマン30分、2回目はグループ30分。'
//       },
//       {
//         q: 'What equipment do I need?', jp: '必要な機材は？',
//         a: 'A tablet or computer, child-sized headphones, and an internet connection.', aJp: 'タブレットまたはパソコン、子供用ヘッドホン、インターネット接続が必要です。'
//       },
//       {
//         q: 'What software do I need?', jp: 'ダウンロードするソフトウェアは？',
//         a: 'It is recommended to download the Zoom app for a smooth learning experience.', aJp: 'スムーズな学習のためにZoomアプリのダウンロードをお勧めします。'
//       },
//       {
//         q: 'What if I am late or miss a class?', jp: '遅刻や欠席した場合はどうなりますか？',
//         a: 'You may join late, but make-up lessons and rescheduling are not permitted.', aJp: '途中参加は可能ですが、補講やレッスンの日程変更はできません。'
//       },
//       {
//         q: 'How is progress assessed?', jp: '学習の進捗はどのように評価されますか？',
//         a: 'PJ Sensei will send a progress report email to parents at the end of each school term.', aJp: 'PJ先生は各学期末に保護者の方へ学習進捗レポートをメールでお送りします。'
//       },
//       {
//         q: 'How many students are in a group lesson?', jp: 'グループレッスンの生徒数は？',
//         a: 'The number of students is not fixed and may fluctuate from time to time.', aJp: 'グループの生徒数は固定されておらず、状況によって変動します。'
//       },
//       {
//         q: 'How do I cancel my registration?', jp: '登録をキャンセルするには？',
//         a: 'Send an email to PJ Sensei and your registration will be cancelled promptly.', aJp: 'PJ先生にメールを送っていただければ、登録をキャンセルできます。'
//       },
//     ]
//   }
// ]

// const FAQItem = ({ faq, isOpen, onClick, accentColor }) => {
//   const bodyRef = useRef(null)
//   const [height, setHeight] = useState(0)

//   useEffect(() => {
//     setHeight(isOpen ? bodyRef.current.scrollHeight : 0)
//   }, [isOpen])

//   return (
//     <div
//       onClick={onClick}
//       style={{
//         cursor: 'pointer',
//         borderBottom: '1px solid rgba(0,0,0,0.06)',
//         transition: 'background 0.2s',
//         borderRadius: '8px',
//         background: isOpen ? 'rgba(255,255,255,0.5)' : 'transparent',
//         padding: '0 0.75rem',
//       }}
//     >
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 0.25rem', gap: '1rem' }}>
//         <div>
//           <div style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a', lineHeight: 1.4 }}>{faq.q}</div>
//           <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px' }}>{faq.jp}</div>
//         </div>
//         <div style={{
//           width: '26px', height: '26px', minWidth: '26px', borderRadius: '50%',
//           background: isOpen ? accentColor : 'rgba(255,255,255,0.7)',
//           border: `1.5px solid ${accentColor}`,
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//           transition: 'all 0.3s ease',
//           flexShrink: 0,
//         }}>
//           <svg width="11" height="11" viewBox="0 0 12 12" style={{ transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
//             <line x1="6" y1="1" x2="6" y2="11" stroke={isOpen ? 'white' : accentColor} strokeWidth="2" strokeLinecap="round" />
//             <line x1="1" y1="6" x2="11" y2="6" stroke={isOpen ? 'white' : accentColor} strokeWidth="2" strokeLinecap="round" />
//           </svg>
//         </div>
//       </div>

//       <div style={{ height: `${height}px`, overflow: 'hidden', transition: 'height 0.38s cubic-bezier(0.4, 0, 0.2, 1)' }}>
//         <div ref={bodyRef} style={{ padding: '0 0.25rem 1.2rem' }}>
//           <p style={{ margin: '0 0 0.4rem', fontSize: '0.98rem', color: '#1e293b', lineHeight: 1.75 }}>{faq.a}</p>
//           <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b', lineHeight: 1.75, fontStyle: 'italic' }}>{faq.aJp}</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// const Faq = () => {
//   const [openIndex, setOpenIndex] = useState(null)

//   const handleClick = (sectionIdx, faqIdx) => {
//     const key = `${sectionIdx}-${faqIdx}`
//     setOpenIndex(prev => prev === key ? null : key)
//   }

//   return (
//     <>
//       <div style={{
//         minHeight: '100vh', width: '100%', background: '#7DD3FC',
//         display: 'flex', flexDirection: 'column', alignItems: 'center',
//         padding: '6rem 7.5vw',
//         fontFamily: "'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', sans-serif",
//       }}>

//         {/* Header */}
//         <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '1rem' }}>
//             <span style={{ display: 'inline-block', width: '32px', height: '2px', background: '#1e3a5f' }} />
//             <span style={{ fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#1e3a5f' }}>
//               Frequently Asked Questions
//             </span>
//             <span style={{ display: 'inline-block', width: '32px', height: '2px', background: '#1e3a5f' }} />
//           </div>
//           <h2 style={{
//             fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: '800',
//             color: '#0f172a', margin: 0, letterSpacing: '-0.03em', lineHeight: 1.1,
//           }}>
//             よくある質問
//           </h2>
//         </div>

//         {/* Sections */}
//         <div style={{ width: '100%', maxWidth: '860px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
//           {sections.map((section, sIdx) => (
//             <div key={sIdx}>

//               {/* Section header */}
//               <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
//               <div style={{
//   color: section.color,
//   fontSize: '1rem',
//   fontWeight: '600',
//   letterSpacing: '0.2em',
//   textTransform: 'uppercase',
//   flexShrink: 0,
// }}>
//   {section.label}
// </div>
//                 <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.12)' }} />
//                 <span style={{ fontSize: '0.8rem', color: '#1e3a5f', fontWeight: '600', flexShrink: 0 }}>
//                   {section.labelJp}
//                 </span>
//               </div>

//               {/* Cards */}
//               <div style={{
//                 background: 'rgba(255,255,255,0.28)',
//                 backdropFilter: 'blur(10px)',
//                 borderRadius: '16px',
//                 border: '1px solid rgba(255,255,255,0.55)',
//                 padding: '0.4rem 0.5rem',
//                 display: 'flex', flexDirection: 'column',
//               }}>
//                 {section.faqs.map((faq, fIdx) => (
//                   <FAQItem
//                     key={fIdx}
//                     faq={faq}
//                     isOpen={openIndex === `${sIdx}-${fIdx}`}
//                     onClick={() => handleClick(sIdx, fIdx)}
//                     accentColor={section.color}
//                   />
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div><img className='w-full' src="/images/cloudfooter.svg" alt="footer" /></div>
//     </>
//   )
// }

// export default Faq

import React, { useState, useRef, useEffect } from 'react'

const sections = [
  {
    label: 'NO',
    labelJp: 'いいえ',
    color: '#ef4444',
    lightColor: '#fef2f2',
    borderColor: '#fecaca',
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
    lightColor: '#f0fdf4',
    borderColor: '#bbf7d0',
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
    lightColor: '#f0f9ff',
    borderColor: '#bae6fd',
    faqs: [
      { q: 'From what age can I join?', jp: '何歳からレッスンに参加できますか？', a: 'Ages 6 to 12 years old (Grade 1 to Grade 6).', aJp: '6歳から12歳まで（小学1年生から6年生）。' },
      { q: 'How much is the monthly fee?', jp: '月謝はいくらですか？', a: '6,000 yen per month.', aJp: '月額6,000円です。' },
      { q: 'How do you pay?', jp: '支払い方法は？', a: 'Payment is usually made via the PayPay app. Other payment options are available upon consultation.', aJp: '通常はPayPayアプリでのお支払いとなります。その他の支払い方法についてはご相談ください。' },
      { q: 'How do I register and start lessons?', jp: '登録とレッスン開始方法は？', a: 'Send PJ Sensei an email to begin registration and start lessons.', aJp: 'レッスン開始をご希望の方は、PJ先生までメールでご連絡ください。' },
      { q: 'What teaching methods and materials are used?', jp: 'どのような指導方法と教材を使用していますか？', a: 'We use a dynamic method based on the cognitive strengths of each child. Activities include phonics, conversation, listening, picture books, songs, chants, and interactive drawing activities. All books, music, and phonics materials are created by professional artists and musicians. Materials follow the ESL syllabus from Grade 1 to Grade 6.', aJp: 'お子様一人ひとりの認知能力に合わせたダイナミックな指導法を採用しています。フォニックス、会話、リスニング、絵本、歌、チャント、インタラクティブな描画活動を取り入れています。絵本・音楽・フォニックス教材はプロのアーティストとミュージシャンが制作。教材は小1〜小6のESL語彙・文法目標に沿ったものです。' },
      { q: 'How many lessons per year and how long?', jp: 'レッスンの回数と各レッスンの時間は？', a: 'There are 86 lessons per year (30 minutes each), based on an April–March cycle. Generally two times a week: 30 minutes one-on-one, then 30 minutes in a group.', aJp: '年間86レッスン（各30分）、4月〜3月のサイクルです。通常週2回：1回目はマンツーマン30分、2回目はグループ30分。' },
      { q: 'What equipment do I need?', jp: '必要な機材は？', a: 'A tablet or computer, child-sized headphones, and an internet connection.', aJp: 'タブレットまたはパソコン、子供用ヘッドホン、インターネット接続が必要です。' },
      { q: 'What software do I need?', jp: 'ダウンロードするソフトウェアは？', a: 'It is recommended to download the Zoom app for a smooth learning experience.', aJp: 'スムーズな学習のためにZoomアプリのダウンロードをお勧めします。' },
      { q: 'What if I am late or miss a class?', jp: '遅刻や欠席した場合はどうなりますか？', a: 'You may join late, but make-up lessons and rescheduling are not permitted.', aJp: '途中参加は可能ですが、補講やレッスンの日程変更はできません。' },
      { q: 'How is progress assessed?', jp: '学習の進捗はどのように評価されますか？', a: 'PJ Sensei will send a progress report email to parents at the end of each school term.', aJp: 'PJ先生は各学期末に保護者の方へ学習進捗レポートをメールでお送りします。' },
      { q: 'How many students are in a group lesson?', jp: 'グループレッスンの生徒数は？', a: 'The number of students is not fixed and may fluctuate from time to time.', aJp: 'グループの生徒数は固定されておらず、状況によって変動します。' },
      { q: 'How do I cancel my registration?', jp: '登録をキャンセルするには？', a: 'Send an email to PJ Sensei and your registration will be cancelled promptly.', aJp: 'PJ先生にメールを送っていただければ、登録をキャンセルできます。' },
    ]
  }
]

const FAQItem = ({ faq, isOpen, onClick, accentColor }) => {
  const bodyRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    setHeight(isOpen ? bodyRef.current.scrollHeight : 0)
  }, [isOpen])

  return (
    <div 
      onClick={onClick}
      style={{
        cursor: 'pointer',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        transition: 'background 0.2s',
        borderRadius: '8px',
        background: isOpen ? 'rgba(255,255,255,0.5)' : 'transparent',
        padding: '0 0.75rem',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 0.25rem', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a', lineHeight: 1.4 }}>{faq.q}</div>
          <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px' }}>{faq.jp}</div>
        </div>
        <div style={{
          width: '26px', height: '26px', minWidth: '26px', borderRadius: '50%',
          background: isOpen ? accentColor : 'rgba(255,255,255,0.7)',
          border: `1.5px solid ${accentColor}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s ease',
          flexShrink: 0,
        }}>
          <svg width="11" height="11" viewBox="0 0 12 12" style={{ transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
            <line x1="6" y1="1" x2="6" y2="11" stroke={isOpen ? 'white' : accentColor} strokeWidth="2" strokeLinecap="round" />
            <line x1="1" y1="6" x2="11" y2="6" stroke={isOpen ? 'white' : accentColor} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div style={{ height: `${height}px`, overflow: 'hidden', transition: 'height 0.38s cubic-bezier(0.4, 0, 0.2, 1)' }}>
        <div ref={bodyRef} style={{ padding: '0 0.25rem 1.2rem' }}>
          <p style={{ margin: '0 0 0.4rem', fontSize: '0.98rem', color: '#1e293b', lineHeight: 1.75 }}>{faq.a}</p>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b', lineHeight: 1.75, fontStyle: 'italic' }}>{faq.aJp}</p>
        </div>
      </div>
    </div>
  )
}

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const handleClick = (sectionIdx, faqIdx) => {
    const key = `${sectionIdx}-${faqIdx}`
    setOpenIndex(prev => prev === key ? null : key)
  }

  return (
    <>
      {/* ── FAQ Section ── */}
      <div id='faqs' style={{
        minHeight: '100vh',
        width: '100%',
        background: '#7DD3FC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '6rem 7.5vw',
        fontFamily: "'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', sans-serif",
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '1rem' }}>
            <span style={{ display: 'inline-block', width: '32px', height: '2px', background: '#1e3a5f' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#1e3a5f' }}>
              Frequently Asked Questions
            </span>
            <span style={{ display: 'inline-block', width: '32px', height: '2px', background: '#1e3a5f' }} />
          </div>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
            fontWeight: '800',
            color: '#0f172a',
            margin: 0,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}>
            よくある質問
          </h2>
        </div>

        {/* FAQ Sections */}
        <div style={{ width: '100%', maxWidth: '860px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {sections.map((section, sIdx) => (
            <div key={sIdx}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                <div style={{ color: section.color, fontSize: '1rem', fontWeight: '600', letterSpacing: '0.2em', textTransform: 'uppercase', flexShrink: 0 }}>
                  {section.label}
                </div>
                <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.12)' }} />
                <span style={{ fontSize: '0.8rem', color: '#1e3a5f', fontWeight: '600', flexShrink: 0 }}>
                  {section.labelJp}
                </span>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.28)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.55)',
                padding: '0.4rem 0.5rem',
                display: 'flex',
                flexDirection: 'column',
              }}>
                {section.faqs.map((faq, fIdx) => (
                  <FAQItem
                    key={fIdx}
                    faq={faq}
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

      {/* ── Cloud transition — zero line-height so no gap ── */}
      <div className='bg-[url("/images/cloudfooter.svg")] bg-cover bg-no-repeat h-[90vh] w-screen'>
        <footer id='contact' className="  px-[8vw] pt-[30vh] pb-0 font-sans">

  {/* ── Center block ── */}
  <div className="flex flex-col items-center text-center pb-14 border-b border-black/[0.07]">

    {/* Big logo */}
    <div className="text-[clamp(3.5rem,10vw,7rem)] font-black tracking-[-0.04em] text-[#0f172a] leading-none mb-2">
      360
    </div>
    <div className="text-[clamp(0.9rem,3vw,1.4rem)] font-bold tracking-[0.5em] text-[#1e3a5f] uppercase mb-12">
      E N G L I S H
    </div>

    {/* Nav links */}
    <div className="flex gap-8 flex-wrap justify-center mb-10">
      {['Home', 'About PJ Sensei', 'FAQ'].map(l => (
        <a key={l} href="#"
          className="text-sm text-[#1e3a5f] no-underline hover:text-[#0f172a] transition-colors tracking-wide">
          {l}
        </a>
      ))}
    </div>

    {/* Social icons */}
    <div className="flex gap-5 items-center">
      {/* Instagram */}
      <a href="#" className="text-slate-400 hover:text-[#0f172a] transition-colors">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5"/>
          <circle cx="12" cy="12" r="5"/>
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
        </svg>
      </a>
      {/* YouTube */}
      <a href="#" className="text-slate-400 hover:text-[#0f172a] transition-colors">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="13" rx="3"/>
          <polygon points="10,9 16,12.5 10,16" fill="currentColor" stroke="none"/>
        </svg>
      </a>
      {/* LINE */}
      <a href="#" className="text-slate-400 hover:text-[#0f172a] transition-colors">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5C21 16.75 16.5 21 11 21c-1.5 0-3-.3-4.3-.9L3 21l1.5-3.5A9.5 9.5 0 0 1 3 12C3 6.75 7.5 3 12 3s9 4.25 9 8.5Z"/>
        </svg>
      </a>
      {/* Email */}
      <a href="mailto:pjsensei@360english.jp" className="text-slate-400 hover:text-[#0f172a] transition-colors">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="3"/>
          <polyline points="2,4 12,13 22,4"/>
        </svg>
      </a>
    </div>

  </div>

  {/* ── Bottom bar ── */}
  <div className="flex justify-between items-center py-5 flex-wrap gap-3">
    <div className="text-xs text-[#1e3a5f]">© 2025 · 360 English · PJ Sensei · All rights reserved.</div>
    <div className="flex gap-6 flex-wrap">
      {['Privacy Policy', 'Terms of Use', '特定商取引法'].map(l => (
        <a key={l} href="#" className="text-xs text-[#1e3a5f] no-underline hover:text-slate-500 transition-colors">{l}</a>
      ))}
    </div>
  </div>

</footer>
      </div>

     
    </>
  )
}

export default Faq