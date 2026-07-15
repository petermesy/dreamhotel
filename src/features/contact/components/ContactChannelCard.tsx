import React from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin } from "lucide-react";

interface ContactChannelCardProps {
  icon: "map" | "phone" | "mail";
  title: string;
  line1: React.ReactNode;
  line2?: React.ReactNode;
  delay?: number;
}

export default function ContactChannelCard({ icon, title, line1, line2, delay = 0 }: ContactChannelCardProps) {
  const iconMap = {
    map: <MapPin className="w-6 h-6" />,
    phone: <Phone className="w-6 h-6" />,
    mail: <Mail className="w-6 h-6" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white p-8 rounded-3xl border border-slate-200 flex flex-col items-start gap-5 shadow-sm hover:shadow-md transition-all duration-300 group"
    >
      <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
        {iconMap[icon]}
      </div>
      <div>
        <h3 className="font-sans font-bold text-slate-900 text-sm tracking-tight">{title}</h3>
        <div className="text-xs font-mono text-slate-500 mt-2 leading-relaxed">{line1}</div>
        {line2 ? <div className="text-[11px] font-mono text-slate-400 mt-1.5 leading-normal">{line2}</div> : null}
      </div>
    </motion.div>
  );
}
