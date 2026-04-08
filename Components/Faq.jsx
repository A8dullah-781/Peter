import React, { useState, useRef, useEffect } from 'react'

const faqs = [
  {
    q: "What age groups do you teach?",
    a: "We teach elementary school students from grade 1 through grade 6, ages 6 to 12. Our curriculum is carefully designed to match each grade level's learning pace and vocabulary needs."
  },
  {
    q: "How are the online lessons structured?",
    a: "Each week includes two sessions: the first is a 30-minute one-on-one lesson with a foreign teacher, and the second is a 30-minute group session. This balance helps build both confidence and conversational fluency."
  },
  {
    q: "What equipment do I need to join the classes?",
    a: "All you need is a tablet or computer with a stable internet connection and a camera. We recommend using headphones for the best audio quality during lessons."
  },
  {
    q: "Who are the teachers?",
    a: "All our teachers are native English-speaking professionals with experience in teaching children. They are carefully selected and trained in our phonics-based curriculum."
  },
  {
    q: "What teaching methods do you use?",
    a: "We use a combination of phonics instruction, picture book reading, songs, rhymes, memory techniques, and fun puzzles. This multi-sensory approach keeps children engaged and accelerates learning."
  },
  {
    q: "How do you keep children motivated?",
    a: "We use gamified rewards, encouraging feedback, and interactive activities that make learning feel like play. Progress milestones and achievement badges also help sustain long-term motivation."
  },
  {
    q: "Can I try a lesson before committing?",
    a: "Yes! We offer a free trial lesson so your child can experience the class format, meet a teacher, and see if it's a good fit — with no obligation to continue."
  },
  {
    q: "How do I track my child's progress?",
    a: "Parents receive regular progress reports after each lesson cycle. You can also access a dashboard showing attendance, topics covered, and teacher feedback at any time."
  },
  {
    q: "What happens if we miss a lesson?",
    a: "We understand that schedules can change. Missed lessons can be rescheduled up to 24 hours in advance. We also record group sessions so students can catch up if needed."
  },
  {
    q: "How do I enroll my child?",
    a: "Simply fill out the enrollment form on our website, choose a suitable time slot, and complete the registration. Our team will reach out within 24 hours to confirm your schedule and get started."
  },
]

const FAQItem = ({ faq, isOpen, onClick }) => {
  const bodyRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(isOpen ? bodyRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <div
      onClick={onClick}
      style={{
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'background 0.2s',
        padding: '0 0.5rem',
        borderRadius: '8px',
        background: isOpen ? 'rgba(255,255,255,0.35)' : 'transparent',
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.1rem 0.5rem',
        gap: '1rem',
      }}>
        <span style={{
          fontSize: '1.05rem',
          fontWeight: '600',
          color: '#1e3a5f',
          lineHeight: 1.4,
        }}>
          {faq.q}
        </span>

        <div style={{
          width: '28px',
          height: '28px',
          minWidth: '28px',
          borderRadius: '50%',
          background: isOpen ? '#1e3a5f' : 'rgba(255,255,255,0.6)',
          border: '1.5px solid #1e3a5f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
        }}>
          <svg
            width="12" height="12" viewBox="0 0 12 12"
            style={{ transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
          >
            <line x1="6" y1="1" x2="6" y2="11" stroke={isOpen ? 'white' : '#1e3a5f'} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="1" y1="6" x2="11" y2="6" stroke={isOpen ? 'white' : '#1e3a5f'} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div style={{
        height: `${height}px`,
        overflow: 'hidden',
        transition: 'height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        <div ref={bodyRef} style={{ padding: '0 0.5rem 1.1rem', }}>
          <p style={{
            margin: 0,
            fontSize: '0.95rem',
            color: '#2c4a6e',
            lineHeight: 1.7,
          }}>
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  )
}

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const handleClick = (index) => {
    setOpenIndex(prev => prev === index ? null : index)
  }

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      background: '#7DD3FC',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '5rem 7.5vw',

    }}>
      <h2 style={{
        fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
        fontWeight: '700',
        color: '#1e3a5f',
        marginBottom: '0.5rem',
        textAlign: 'center',
        letterSpacing: '-0.02em',
      }}>
        よくある質問
      </h2>
      <p style={{
        color: '#2c4a6e',
        marginBottom: '3rem',
        fontSize: '1rem',
        textAlign: 'center',
      }}>
        Frequently Asked Questions
      </p>

      <div style={{
        width: '100%',
        maxWidth: '1220px',
        background: 'rgba(255,255,255,0.25)',
        backdropFilter: 'blur(8px)',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.5)',
        padding: '0.5rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.2rem',
      }}>
        {faqs.map((faq, i) => (
          <FAQItem
            key={i}
            faq={faq}
            isOpen={openIndex === i}
            onClick={() => handleClick(i)}
          />
        ))}
      </div>
    </div>
  )
}

export default Faq