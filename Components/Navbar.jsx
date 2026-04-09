import { useState, useEffect } from "react";
 
const links = ["Home", "About", "FAQs", "Contact"];
 
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState("Home");
 
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
 
  const handleToggle = (e) => {
    if (isOpen && e.target.closest("a")) return;
    setIsOpen((prev) => !prev);
  };
 
  if (isMobile) {
    return (
      <div style={mobileStyles.wrapper}>
        {/* Pill button */}
        <div
          style={mobileStyles.btn}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span style={mobileStyles.label}>Menu</span>
          <div
            style={{
              ...mobileStyles.iconWrap,
              background: isOpen ? "#dbeafe" : "#f0efe9",
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            }}
          >
            {isOpen ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b6b68" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="8" x2="21" y2="8" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="16" x2="21" y2="16" />
              </svg>
            )}
          </div>
        </div>
 
        {/* Dropdown */}
        <div
          style={{
            ...mobileStyles.dropdown,
            maxHeight: isOpen ? "300px" : "0px",
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "all" : "none",
          }}
        >
          {links.map((link, i) => (
            <a
              key={link}
              style={{
                ...mobileStyles.dropLink,
                ...(active === link ? mobileStyles.dropLinkActive : {}),
                transitionDelay: isOpen ? `${i * 0.06}s` : "0s",
                transform: isOpen ? "translateY(0)" : "translateY(-6px)",
                opacity: isOpen ? 1 : 0,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setActive(link);
                setIsOpen(false);
              }}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    );
  }
 
  // Desktop — expands left
  return (
    <div className="fixed z-50 top-0 right-0" style={desktopStyles.scene}>
      <div
        style={{
          ...desktopStyles.navBtn,
          width: isOpen ? "380px" : "130px",
          borderColor: isOpen ? "#a8a7a2" : "#d1d0ca",
        }}
        onClick={handleToggle}
      >
        {/* Links */}
        <div
          style={{
            ...desktopStyles.linksArea,
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "all" : "none",
            transition: isOpen ? "opacity 0.35s ease 0.25s" : "opacity 0.2s ease",
          }}
        >
          {links.map((link, i) => (
            <span key={link} style={{ display: "flex", alignItems: "center" }}>
              {i !== 0 && <span style={desktopStyles.divider} />}
              <a
                style={{
                  ...desktopStyles.navLink,
                  ...(active === link ? desktopStyles.navLinkActive : {}),
                  transform: isOpen ? "translateX(0)" : "translateX(-8px)",
                  opacity: isOpen ? 1 : 0,
                  transition: isOpen
                    ? `background 0.18s, color 0.18s, transform 0.28s cubic-bezier(0.34,1.56,0.64,1) ${0.18 + i * 0.06}s, opacity 0.2s ease ${0.18 + i * 0.06}s`
                    : "none",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(link);
                }}
              >
                {link}
              </a>
            </span>
          ))}
        </div>
 
        {/* Label */}
        <span
          style={{
            ...desktopStyles.label,
            opacity: isOpen ? 0 : 1,
            pointerEvents: isOpen ? "none" : "auto",
          }}
        >
          Menu
        </span>
 
        {/* Icon */}
        <div
          style={{
            ...desktopStyles.iconWrap,
            background: isOpen ? "#dbeafe" : "#f0efe9",
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
          }}
        >
          {isOpen ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b6b68" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="8" x2="21" y2="8" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="16" x2="21" y2="16" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
 
// ─── Mobile styles ────────────────────────────────────────────
const mobileStyles = {
  wrapper: {
    position: "fixed",
    top: "1rem",
    right: "1rem",
    zIndex: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  btn: {
    display: "flex",
    alignItems: "center",
    height: "42px",
    background: "#ffffff",
    border: "0.5px solid #d1d0ca",
    borderRadius: "21px",
    cursor: "pointer",
    userSelect: "none",
    paddingRight: "8px",
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#1a1a1a",
    paddingLeft: "16px",
  },
  iconWrap: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "background 0.2s ease, transform 0.4s cubic-bezier(0.77,0,0.18,1)",
  },
  dropdown: {
    marginTop: "8px",
    background: "#ffffff",
    border: "0.5px solid #d1d0ca",
    borderRadius: "16px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "max-height 0.45s cubic-bezier(0.77,0,0.18,1), opacity 0.3s ease",
    minWidth: "140px",
  },
  dropLink: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#6b6b68",
    padding: "12px 20px",
    cursor: "pointer",
    textDecoration: "none",
    display: "block",
    transition: "background 0.18s ease, color 0.18s ease, transform 0.24s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease",
    borderBottom: "0.5px solid #f0efe9",
  },
  dropLinkActive: {
    color: "#1d4ed8",
    background: "#dbeafe",
  },
};
 
// ─── Desktop styles ───────────────────────────────────────────
const desktopStyles = {
  scene: {
    padding: "1.5rem",
  },
  navBtn: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: "46px",
    background: "#ffffff",
    border: "0.5px solid #d1d0ca",
    borderRadius: "23px",
    cursor: "pointer",
    overflow: "hidden",
    transition: "width 0.55s cubic-bezier(0.77, 0, 0.18, 1), border-color 0.3s ease",
    whiteSpace: "nowrap",
    userSelect: "none",
    flexShrink: 0,
  },
  linksArea: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
  },
  navLink: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#6b6b68",
    padding: "6px 13px",
    borderRadius: "14px",
    cursor: "pointer",
    textDecoration: "none",
    display: "block",
  },
  navLinkActive: {
    color: "#1d4ed8",
    background: "#dbeafe",
  },
  divider: {
    display: "inline-block",
    width: "1px",
    height: "16px",
    background: "#e5e4de",
    flexShrink: 0,
  },
  label: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#1a1a1a",
    paddingLeft: "18px",
    flexShrink: 0,
    transition: "opacity 0.2s ease",
  },
  iconWrap: {
    marginLeft: "auto",
    marginRight: "10px",
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "background 0.2s ease, transform 0.4s cubic-bezier(0.77,0,0.18,1)",
  },
};
 