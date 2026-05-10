"use client";
import Image from "next/image";
import React, { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  useLayoutEffect(() => {
    // Hero section load animation
    gsap.from(".hero-title", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.from(".hero-subtext", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.3,
    });

    gsap.from(".hero-buttons", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.6,
    });

    // Scroll animation for all sections
    gsap.utils.toArray<HTMLElement>(".section").forEach((el) => {
      gsap.from(el, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%", // যখন element viewport এ আসবে
        },
      });
    });
  }, []);

  return (
    <div className="mx-auto w-full max-w-8xl px-4 py-16 sm:px-6 lg:px-8 relative">
      {/* Background */}
      <Image
        src="/Abstract.svg"
        alt="abstract_image"
        width={2920}
        height={1080}
        className="w-full h-auto absolute top-60 z-[-5]"
      />

      {/* Hero Section */}
      <div className="flex flex-col items-center gap-5 sm:gap-6 md:gap-7 xl:gap-15 w-full h-auto mt-0 2xl:mt-80">
        <h1
          className="hero-title text-center text-white
          text-4xl sm:text-6xl md:text-7xl xl:text-8xl 2xl:text-9xl
          font-semibold font-['Barlow']"
        >
          A Digital Product Studio that will Work
        </h1>

        <div className="hero-subtext px-4 sm:px-6 md:px-10 py-4 sm:py-5 md:py-6 bg-neutral-800/20 rounded-xl outline -outline-offset-1 outline-neutral-800 backdrop-blur-[6px] flex flex-wrap justify-start items-center gap-x-2 sm:gap-x-3 md:gap-x-4 space-y-2 sm:space-y-3 md:space-y-4">
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            for{" "}
            <span className="px-2 sm:px-3.5 py-2 sm:py-3 bg-neutral-800 rounded-lg inline-flex text-xs sm:text-sm md:text-base">
              Startups
            </span>
            ,{" "}
            <span className="px-2 sm:px-3.5 py-2 sm:py-3 bg-neutral-800 rounded-lg inline-flex text-xs sm:text-sm md:text-base">
              Enterprise leaders
            </span>
            ,{" "}
            <span className="px-2 sm:px-3.5 py-2 sm:py-3 bg-neutral-800 rounded-lg inline-flex text-xs sm:text-sm md:text-base">
              Media & Publishers
            </span>{" "}
            and{" "}
            <span className="px-2 sm:px-3.5 py-2 sm:py-3 bg-neutral-800 rounded-lg inline-flex text-xs sm:text-sm md:text-base">
              Social Goods
            </span>
          </p>
        </div>

        <div className="hero-buttons flex flex-row flex-wrap gap-3 sm:gap-4">
          <button className="px-4 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-4 bg-neutral-800/20 rounded-[10px] border border-zinc-800 backdrop-blur-[6px] text-sm sm:text-base md:text-lg">
            Our Works
          </button>
          <button className="px-4 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-4 bg-lime-400 rounded-[10px] text-sm sm:text-base md:text-lg">
            Contact Us
          </button>
        </div>
      </div>

      {/* Example Sections */}
      <div className="section mt-40 text-white text-center text-3xl">
        Section 1 Content
      </div>
      <div className="section mt-40 text-white text-center text-3xl">
        Section 2 Content
      </div>
      <div className="section mt-40 text-white text-center text-3xl">
        Section 3 Content
      </div>
    </div>
  );
};

export default Page;
