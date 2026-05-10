"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

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

  // Escape key চাপলে menu বন্ধ হবে
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#262626]">
      <nav className="mx-auto w-full max-w-8xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo Section */}
          <Link href="/" className="flex min-w-0 items-center gap-3 text-black">
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

          {/* Desktop Navigation Links */}
          <div className="hidden flex-1 items-center justify-center gap-5 text-md font-medium text-white md:flex 2xl:gap-15">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative transition hover:text-[#9EFF00] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#93ff00] after:origin-center after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 focus:after:scale-x-100 active:after:scale-x-100"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Contact Button */}
          <Link
            href="/contact"
            className="hidden rounded-md bg-[#9EFF00] px-4 py-2 text-md font-semibold text-black transition duration-300 hover:bg-[#a0f11dfd] hover:shadow-[0_0_15px_#9EFF00] active:shadow-[0_0_20px_#9EFF00] focus:shadow-[0_0_20px_#9EFF00] md:block"
          >
            Contact Us
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-white/15 text-white transition hover:bg-white/10 md:hidden"
            aria-label="Toggle navigation menu"
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((open) => !open)}
          >
            <Image src="/menu.svg" alt="Menu" width={24} height={24} />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <>
            {/* Overlay: blank space এ click করলে menu বন্ধ হবে */}
            <div
              className="fixed inset-0 z-40 bg-black/40"
              onClick={() => setIsOpen(false)}
            ></div>

            <div
              id="mobile-navigation"
              className="relative z-50 mt-4 rounded-md border border-white/10 bg-[#262626] px-3 py-3 shadow-[0_20px_40px_rgba(0,0,0,0.25)] md:hidden"
            >
              <div className="flex flex-col gap-2">
                {/* Mobile Navigation Links */}
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md border border-white/10 bg-white/5 px-3 py-3 text-sm font-medium text-white transition hover:bg-white/10 hover:text-[#d8ff99] active:bg-white/10 active:text-[#d8ff99]"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Mobile Contact Button */}
                <Link
                  href="/contact"
                  className="mt-2 rounded-md bg-[#9EFF00] px-5 py-3 text-center text-sm font-semibold text-black transition duration-300 hover:shadow-[0_0_20px_#9EFF00] focus:shadow-[0_0_20px_#9EFF00] active:shadow-[0_0_20px_#9EFF00]"
                  onClick={() => setIsOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
