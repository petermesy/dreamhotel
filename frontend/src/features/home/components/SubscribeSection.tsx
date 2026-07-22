import React from "react";
import { motion, AnimatePresence } from "motion/react";

export default function SubscribeSection() {
  const [subForm, setSubForm] = React.useState({ name: "", email: "", phone: "" });
  const [subSuccess, setSubSuccess] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subForm.name && subForm.email) {
      setSubSuccess(true);
      setTimeout(() => {
        setSubSuccess(false);
        setSubForm({ name: "", email: "", phone: "" });
      }, 5000);
    }
  };

  return (
    <section className="py-16 bg-white text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-serif font-medium text-slate-950 tracking-tight mb-3">
          Subscribe
        </h2>
        <p className="text-slate-500 text-sm font-sans mb-8 max-w-lg mx-auto">
          Be the first to hear about new Dream Hotel special packages and seasonal offers that are perfect for you.
        </p>
        <AnimatePresence mode="wait">
          {!subSuccess ? (
            <motion.form
              onSubmit={handleSubscribe}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-sm max-w-3xl mx-auto"
            >
              <input
                type="text"
                placeholder="Name"
                required
                value={subForm.name}
                onChange={(e) => setSubForm(prev => ({ ...prev, name: e.target.value }))}
                className="bg-white border border-slate-300 rounded px-4 py-3 text-xs w-full focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 shadow-sm"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={subForm.email}
                onChange={(e) => setSubForm(prev => ({ ...prev, email: e.target.value }))}
                className="bg-white border border-slate-300 rounded px-4 py-3 text-xs w-full focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 shadow-sm"
              />
              <input
                type="tel"
                placeholder="Phone (Optional)"
                value={subForm.phone}
                onChange={(e) => setSubForm(prev => ({ ...prev, phone: e.target.value }))}
                className="bg-white border border-slate-300 rounded px-4 py-3 text-xs w-full focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 shadow-sm"
              />
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold py-3 px-6 rounded text-xs transition-all tracking-wider uppercase cursor-pointer shadow-sm border border-amber-700/20"
              >
                Subscribe
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-indigo-50 border border-indigo-200 text-indigo-900 p-6 rounded-2xl max-w-xl mx-auto flex flex-col items-center gap-2 shadow-sm"
            >
              <span className="text-2xl">🎉</span>
              <h4 className="font-serif font-bold text-lg text-indigo-950">Subscription Successful!</h4>
              <p className="text-xs font-mono text-slate-600">
                Thank you, <span className="font-bold text-indigo-900">{subForm.name}</span>. You have successfully joined the Dream Hotel Newsletter list. We will send updates to <span className="font-bold text-indigo-900">{subForm.email}</span>.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}