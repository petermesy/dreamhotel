import React from "react";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function ContactHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-indigo-500/20" id="contact-hero">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-500 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-indigo-300 blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 rounded-full text-[10px] font-accent uppercase tracking-widest mb-4"
        >
          <Sparkles className="w-3 h-3 text-indigo-400" />
          24/7 Front Desk & Admin
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-serif font-medium text-white tracking-tight mb-4"
        >
          Contact Our Desk
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-16 h-0.5 bg-indigo-500 my-2"
        ></motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-slate-300 font-serif text-sm sm:text-base max-w-2xl leading-relaxed italic"
        >
          "Get immediate assistance from our dedicated hospitality specialists on-site in Sawla"
        </motion.p>
      </div>
    </div>
  );
}
