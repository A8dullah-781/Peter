import React, { useRef, useState } from "react";
import gsap from "gsap";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const menuRef = useRef(null);
  const linksRef = useRef(null);
  const [open, setOpen] = useState(false);

  const toggle = () => {
    if (!open) {
      // expand
      gsap.to(menuRef.current, {
        width: "40vw",
        duration: 0.5,
        ease: "power3.inOut",
      });

      gsap.to(linksRef.current, {
        opacity: 1,
        duration: 0.3,
        delay: 0.2,
        pointerEvents: "auto",
      });
    } else {
      // hide links first
      gsap.to(linksRef.current, {
        opacity: 0,
        duration: 0.2,
        pointerEvents: "none",
      });

      // then shrink
      gsap.to(menuRef.current, {
        width: "8vw",
        duration: 0.5,
        ease: "power3.inOut",
        delay: 0.2,
      });
    }

    setOpen(!open);
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <div
        ref={menuRef}
        onClick={toggle}
        className="bg-sky-500 border border-black text-white rounded-full flex items-center justify-between px-5 overflow-hidden cursor-pointer"
        style={{ width: "8vw", height: "3vw" }}
      >
        {/* LINKS */}
        <div
          ref={linksRef}
          className={`flex gap-6 whitespace-nowrap ${
            open ? "block" : "hidden"
          }`}
          style={{ opacity: 0 }}
        >
          {["Home", "About", "Faqs", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-white text-sm font-medium hover:opacity-60 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              {link}
            </a>
          ))}
        </div>

        {/* MENU BUTTON */}
        <div className="flex flex-row justify-center mr-2 items-center gap-2 whitespace-nowrap ml-auto">
          <span className="text-[1.2vw] font-medium">
            {open ? "Close" : "menu"}
          </span>
          {open ? <RxCross2 size={16} /> : <RxHamburgerMenu size={16} />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;