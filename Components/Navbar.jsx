// import { useState, useEffect, useCallback, useRef } from "react"

// // Static — never recreated on render
// const links = [
//   { name: "Home",    id: "home"    },
//   { name: "About",   id: "about"   },
//   { name: "FAQs",    id: "faqs"    },
//   { name: "Contact", id: "contact" },
// ]

// export default function Navbar() {
//   const [isOpen,    setIsOpen]    = useState(false)
//   const [isMobile,  setIsMobile]  = useState(false)
//   const [active,    setActive]    = useState("Home")
//   const menuRef = useRef(null)

//   // ── Responsive check ─────────────────────────────────────────────
//   // ResizeObserver is more efficient than window resize — fires only
//   // when the document root actually changes width, not on every frame.
//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 768)
//     check()
//     const ro = new ResizeObserver(check)
//     ro.observe(document.documentElement)
//     return () => ro.disconnect()
//   }, [])

//   // ── Close menu on outside click (desktop) ────────────────────────
//   useEffect(() => {
//     if (!isOpen) return
//     const handler = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setIsOpen(false)
//       }
//     }
//     document.addEventListener("mousedown", handler)
//     return () => document.removeEventListener("mousedown", handler)
//   }, [isOpen])

//   // ── Close on Escape ──────────────────────────────────────────────
//   useEffect(() => {
//     const handler = (e) => { if (e.key === "Escape") setIsOpen(false) }
//     document.addEventListener("keydown", handler)
//     return () => document.removeEventListener("keydown", handler)
//   }, [])

//   // ── Scroll handler — stable reference via useCallback ────────────
//   const scrollToSection = useCallback((id, name) => {
//     setActive(name)
//     setIsOpen(false)
//     if (id === "home") {
//       window.scrollTo({ top: 0, behavior: "smooth" })
//       return
//     }
//     document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
//   }, [])

//   const handleToggle = useCallback(() => setIsOpen(prev => !prev), [])

//   // ── Shared link renderer ─────────────────────────────────────────
//   // Using <a href="#id"> instead of onClick-only spans:
//   //   - crawlers follow anchor hrefs → sections are indexable
//   //   - works with JS disabled (graceful degradation)
//   //   - gives correct semantics for screen readers
//   const NavLink = ({ link, className, activeClassName, baseClassName, onClick: handleClick }) => {
//     const isActive = active === link.name
//     return (
//       <a
//         href={`#${link.id}`}
//         aria-current={isActive ? "page" : undefined}
//         onClick={(e) => { e.preventDefault(); handleClick(link.id, link.name) }}
//         className={`${baseClassName} ${isActive ? activeClassName : className}`}
//       >
//         {link.name}
//       </a>
//     )
//   }

//   // ── Mobile ───────────────────────────────────────────────────────
//   if (isMobile) {
//     return (
//       <div
//         ref={menuRef}
//         className="fixed top-4 right-4 z-50 flex flex-col items-end"
//       >
//         {/* Toggle button — <button> gives free keyboard support & ARIA */}
//         <button
//           onClick={handleToggle}
//           aria-expanded={isOpen}
//           aria-controls="mobile-menu"
//           aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
//           className="flex items-center h-[42px] bg-white border border-[#d1d0ca]/50 rounded-[21px] pr-2 gap-1.5 cursor-pointer"
//         >
//           <span className="text-sm pl-4 select-none">Menu</span>
//           <span
//             aria-hidden="true"
//             className="w-7 h-7 rounded-full flex justify-center items-center transition-transform duration-300"
//             style={{ background: isOpen ? "#dbeafe" : "#f0efe9", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
//           >
//             {isOpen ? "✕" : "≡"}
//           </span>
//         </button>

//         {/* Dropdown nav — <nav> + id so aria-controls resolves */}
//         <nav
//           id="mobile-menu"
//           aria-label="モバイルナビゲーション"
//           hidden={!isOpen}
//           className="mt-2 bg-white border border-[#d1d0ca]/50 rounded-2xl overflow-hidden flex flex-col"
//           style={{
//             maxHeight: isOpen ? "300px" : "0px",
//             opacity: isOpen ? 1 : 0,
//             pointerEvents: isOpen ? "auto" : "none",
//             transition: "max-height 0.3s ease, opacity 0.3s ease",
//           }}
//         >
//           {links.map((link, i) => (
//             <NavLink
//               key={link.id}
//               link={link}
//               baseClassName="px-5 py-3 text-sm cursor-pointer border-b border-[#f0efe9] last:border-b-0 no-underline"
//               className="text-slate-800 hover:bg-slate-50"
//               activeClassName="bg-blue-100 text-blue-700 font-semibold"
//               onClick={scrollToSection}
//             />
//           ))}
//         </nav>
//       </div>
//     )
//   }

//   // ── Desktop ──────────────────────────────────────────────────────
//   return (
//     <div
//       ref={menuRef}
//       className="fixed top-0 right-0 z-50 p-6"
//     >
//       {/*
//         role="navigation" + aria-label make this a landmark region.
//         Screen reader users can jump straight to it via the landmarks menu.
//       */}
//       <nav
//         aria-label="メインナビゲーション"
//         className="relative flex items-center h-[46px] bg-white border border-[#d1d0ca]/50 rounded-[23px] overflow-hidden"
//         style={{
//           width: isOpen ? "380px" : "130px",
//           transition: "width 0.5s cubic-bezier(0.23,1,0.32,1)",
//         }}
//       >
//         {/* Nav links */}
//         <ul
//           role="list"
//           aria-hidden={!isOpen}
//           className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center m-0 p-0 list-none"
//           style={{
//             opacity: isOpen ? 1 : 0,
//             pointerEvents: isOpen ? "auto" : "none",
//             transition: "opacity 0.3s ease",
//           }}
//         >
//           {links.map((link, i) => (
//             <li key={link.id} className="flex items-center">
//               {i !== 0 && (
//                 <span aria-hidden="true" className="w-px h-4 bg-[#e5e4de] mx-0 shrink-0" />
//               )}
//               <NavLink
//                 link={link}
//                 baseClassName="px-3.5 py-1.5 text-[13px] cursor-pointer select-none whitespace-nowrap no-underline rounded-[14px]"
//                 className="text-slate-800 hover:bg-slate-100"
//                 activeClassName="bg-blue-100 text-blue-700 font-semibold"
//                 onClick={(id, name) => { scrollToSection(id, name) }}
//               />
//             </li>
//           ))}
//         </ul>

//         {/* "Menu" label — decorative, hidden from AT */}
//         <span
//           aria-hidden="true"
//           className="pl-[18px] text-sm select-none whitespace-nowrap pointer-events-none transition-opacity duration-200"
//           style={{ opacity: isOpen ? 0 : 1 }}
//         >
//           Menu
//         </span>

//         {/* Toggle — <button> for keyboard + AT support */}
//         <button
//           onClick={handleToggle}
//           aria-expanded={isOpen}
//           aria-controls="desktop-menu"
//           aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
//           className="ml-auto mr-2.5 w-7 h-7 rounded-full flex justify-center items-center shrink-0 cursor-pointer border-0 transition-[transform,background] duration-300 z-10"
//           style={{ background: isOpen ? "#dbeafe" : "#f0efe9", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
//         >
//           <span aria-hidden="true">{isOpen ? "✕" : "≡"}</span>
//         </button>
//       </nav>

//       {/* Hidden id target so aria-controls resolves on desktop too */}
//       <span id="desktop-menu" className="sr-only" aria-live="polite">
//         {isOpen ? "ナビゲーション展開中" : ""}
//       </span>
//     </div>
//   )
// }



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