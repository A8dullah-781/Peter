import { useState, useEffect } from "react";

const links = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "FAQs", id: "faqs" },
  { name: "Contact", id: "contact" },
];

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

  const scrollToSection = (id, name) => {
    setActive(name);
    setIsOpen(false);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleToggle = () => setIsOpen((prev) => !prev);

  if (isMobile) {
    return (
      <div style={mobileStyles.wrapper}>
        <div style={mobileStyles.btn} onClick={handleToggle}>
          <span style={mobileStyles.label}>Menu</span>
          <div
            style={{
              ...mobileStyles.iconWrap,
              background: isOpen ? "#dbeafe" : "#f0efe9",
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            }}
          >
            {isOpen ? "✕" : "≡"}
          </div>
        </div>

        <div
          style={{
            ...mobileStyles.dropdown,
            maxHeight: isOpen ? "300px" : "0px",
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "auto" : "none",
          }}
        >
          {links.map((link, i) => (
            <a
              key={link.id}
              style={{
                ...mobileStyles.dropLink,
                ...(active === link.name ? mobileStyles.dropLinkActive : {}),
                transitionDelay: isOpen ? `${i * 0.05}s` : "0s",
              }}
              onClick={() => scrollToSection(link.id, link.name)}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 right-0 z-50" style={desktopStyles.scene}>
      <div
        style={{
          ...desktopStyles.navBtn,
          width: isOpen ? "380px" : "130px",
        }}
      >
        {/* Links — clicking these scrolls, does NOT toggle the menu */}
        <div
          style={{
            ...desktopStyles.linksArea,
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "auto" : "none",
          }}
        >
          {links.map((link, i) => (
            <span
              key={link.id}
              style={{ display: "flex", alignItems: "center" }}
            >
              {i !== 0 && <span style={desktopStyles.divider} />}
              <a
                style={{
                  ...desktopStyles.navLink,
                  ...(active === link.name ? desktopStyles.navLinkActive : {}),
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToSection(link.id, link.name);
                }}
              >
                {link.name}
              </a>
            </span>
          ))}
        </div>

        {/* "Menu" label — purely decorative, no click */}
        <span
          style={{
            ...desktopStyles.menuLabel,
            opacity: isOpen ? 0 : 1,
            pointerEvents: "none",
          }}
        >
          Menu
        </span>

        {/* Icon — the ONLY element that opens/closes the menu */}
        <div
          style={{
            ...desktopStyles.iconWrap,
            background: isOpen ? "#dbeafe" : "#f0efe9",
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
          }}
          onClick={handleToggle}
        >
          {isOpen ? "✕" : "≡"}
        </div>
      </div>
    </div>
  );
}

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
    background: "#fff",
    border: "0.5px solid #d1d0ca",
    borderRadius: "21px",
    paddingRight: "8px",
    gap: "6px",
    cursor: "pointer",
  },
  label: { fontSize: "14px", paddingLeft: "16px" },
  iconWrap: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "transform 0.3s",
  },
  dropdown: {
    marginTop: "8px",
    background: "#fff",
    border: "0.5px solid #d1d0ca",
    borderRadius: "16px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "max-height 0.3s, opacity 0.3s",
  },
  dropLink: {
    padding: "12px 20px",
    cursor: "pointer",
    borderBottom: "0.5px solid #f0efe9",
  },
  dropLinkActive: {
    background: "#dbeafe",
    color: "#1d4ed8",
  },
};

const desktopStyles = {
  scene: { padding: "1.5rem" },
  navBtn: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: "46px",
    background: "#fff",
    border: "0.5px solid #d1d0ca",
    borderRadius: "23px",
    overflow: "hidden",
    transition: "width 0.5s",
  },
  linksArea: {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    transition: "opacity 0.3s",
  },
  navLink: {
    padding: "6px 13px",
    fontSize: "13px",
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
  },
  navLinkActive: {
    background: "#dbeafe",
    color: "#1d4ed8",
    borderRadius: "14px",
  },
  divider: {
    width: "1px",
    height: "16px",
    background: "#e5e4de",
    flexShrink: 0,
  },
  menuLabel: {
    paddingLeft: "18px",
    fontSize: "14px",
    transition: "opacity 0.2s",
    userSelect: "none",
    whiteSpace: "nowrap",
  },
  iconWrap: {
    marginLeft: "auto",
    marginRight: "10px",
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "transform 0.3s, background 0.3s",
    cursor: "pointer",
    flexShrink: 0,
    zIndex: 1,
  },
};