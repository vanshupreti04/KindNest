"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "../../lib/utils";

export default function StickyScrollItem({ content, className }) {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const breakpoints = content.map((_, i) => i / content.length);
    const closest = breakpoints.reduce((acc, bp, i) => {
      return Math.abs(latest - bp) < Math.abs(latest - breakpoints[acc]) ? i : acc;
    }, 0);
    setActiveCard(closest);
  });

  return (
    <motion.div
      className={cn(
        "flex h-[40rem] justify-center space-x-10 overflow-y-auto rounded-md p-10 bg-slate-900",
        "no-scrollbar", // Add this class to hide scrollbar
        className
      )}
      ref={ref}
    >
      <div className="w-full lg:w-1/2 px-4 lg:px-8">
        <div className="max-w-2xl">
          {content.map((item, i) => (
            <div key={i} className="my-24">
              <motion.h2
                animate={{ opacity: activeCard === i ? 1 : 0.3 }}
                className="text-3xl md:text-4xl  font-bold text-black" // Keeping your black text
              >
                {item.title}
              </motion.h2>
              <motion.p
                animate={{ opacity: activeCard === i ? 1 : 0.3 }}
                className="mt-6 text-lg md:text-xl text-gray-600 max-w-md"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      
      <div className="sticky top-10 hidden lg:flex items-center justify-center w-[60vh] h-[60vh] min-w-[400px] min-h-[400px]">
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
          {content[activeCard].content}
        </div>
      </div>
    </motion.div>
  );
}