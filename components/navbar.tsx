"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement | null>(null);

  // Escape চাপলে menu বন্ধ হবে
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // GSAP animation trigger
  useEffect(() => {
    if (isOpen) {
      setShowMenu(true);

      // OPEN animation (items staggered)
      setTimeout(() => {
        gsap.fromTo(
          ".mobile-link",
          { y: -20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.15,
          }
        );
      }, 0);
    } else if (showMenu) {
      // CLOSE animation → fade+shrink towards menu button
      const btnRect = menuBtnRef.current?.getBoundingClientRect();
      const navRect = document
        .getElementById("mobile-navigation")
        ?.getBoundingClientRect();

      if (btnRect && navRect) {
        const dx = btnRect.left + btnRect.width / 2 - (navRect.left + navRect.width / 2);
        const dy = btnRect.top + btnRect.height / 2 - (navRect.top + navRect.height / 2);

        gsap.to("#mobile-navigation", {
          opacity: 0,
          scale: 0.3,
          x: dx,
          y: dy,
          duration: 0.35,
          ease: "power2.in",
          onComplete: () => setShowMenu(false),
        });
      } else {
        // fallback: simple fade+shrink
        gsap.to("#mobile-navigation", {
          opacity: 0,
          scale: 0.7,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => setShowMenu(false),
        });
      }
    }
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 bg-[#262626]">
      <nav className="mx-auto w-full max-w-8xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <Image
              src="/Logo.svg"
              alt="SquareUp Logo"
              width={64}
              height={64}
              className="h-12 w-12 shrink-0 sm:h-16 sm:w-16"
            />
            <p className="truncate text-xl font-medium text-white sm:text-3xl">
              SquareUp
            </p>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden flex-1 items-center justify-center gap-5 text-md font-medium text-white md:flex 2xl:gap-15">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative transition hover:text-[#9EFF00] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#93ff00] after:origin-center after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Contact */}
          <Link
            href="/contact"
            className="hidden rounded-md bg-[#9EFF00] px-4 py-2 text-md font-semibold text-black transition duration-300 hover:bg-[#a0f11dfd] hover:shadow-[0_0_15px_#9EFF00] md:block"
          >
            Contact Us
          </Link>

          {/* Mobile Toggle */}
          <button
            ref={menuBtnRef}
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-white/15 text-white transition hover:bg-white/10 md:hidden"
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen((open) => !open)}
          >
            <Image src="/menu.svg" alt="Menu" width={24} height={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay + Menu */}
      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setIsOpen(false)}
          ></div>

          <div
            id="mobile-navigation"
            className="fixed top-20 right-0 z-50 h-auto w-3/4 max-w-xs bg-[#262626] px-4 py-6 shadow-[0_20px_40px_rgba(0,0,0,0.25)] md:hidden rounded-xl"
          >
            <div className="flex flex-col gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="mobile-link rounded-md border border-white/10 bg-white/5 px-3 py-3 text-sm font-medium text-white hover:bg-white/10 hover:text-[#d8ff99]"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="mobile-link mt-3 rounded-md bg-[#9EFF00] px-5 py-3 text-center text-sm font-semibold text-black hover:shadow-[0_0_20px_#9EFF00]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
