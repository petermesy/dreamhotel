import { Eye, EyeOff, Lock } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { LoginSectionProps } from "./types";

export default function AdminLoginSection(props: LoginSectionProps) {
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  return (
    <div className="w-full bg-slate-50 py-20 flex justify-center items-center px-4 animate-fade-in">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-200 font-mono">
        <div className="mx-auto bg-indigo-50 text-indigo-600 p-4 rounded-2xl w-fit mb-6">
          <Lock className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-extrabold text-center text-slate-950 font-sans tracking-tight mb-1">{props.isSignUp ? "Create Guest Account" : "Access Your Portal"}</h3>
        <p className="text-xs text-slate-500 text-center mb-6">{props.isSignUp ? "Sign up to book and track your reservations" : "Sign in as customer or authorized hotel staff"}</p>
        <div className="flex border-b border-slate-100 pb-4 mb-6 text-center text-xs font-bold font-sans">
          <button type="button" onClick={() => props.onToggleMode(false)} className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${!props.isSignUp ? "bg-slate-900 text-white font-bold" : "text-slate-400 hover:text-slate-900"}`}>Sign In (All Roles)</button>
          <button type="button" onClick={() => props.onToggleMode(true)} className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${props.isSignUp ? "bg-slate-900 text-white font-bold" : "text-slate-400 hover:text-slate-900"}`}>Sign Up (New Guest)</button>
        </div>
        {!props.isSignUp ? (
          <form onSubmit={props.onSubmitLogin} className="space-y-5 text-sm">
            <div className="flex flex-col gap-1.5"><label htmlFor="login-email" className="text-xs font-bold text-slate-700">Email Address</label><input type="email" id="login-email" required placeholder="Email Address" value={props.email} onChange={(e) => props.onEmailChange(e.target.value)} className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all" /></div>
            <div className="flex flex-col gap-1.5"><label htmlFor="login-pass" className="text-xs font-bold text-slate-700">Password</label><div className="relative"><input type={showLoginPassword ? "text" : "password"} id="login-pass" required placeholder="••••••••" value={props.password} onChange={(e) => props.onPasswordChange(e.target.value)} className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 pr-10 text-slate-950 outline-none transition-all" /><button type="button" aria-label={showLoginPassword ? "Hide password" : "Show password"} onClick={() => setShowLoginPassword((value) => !value)} className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-700 transition-colors"><span className="sr-only">Toggle password visibility</span>{showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div></div>
            {props.loginError && <div className="text-xs bg-rose-50 border border-rose-100 text-rose-700 p-3 rounded-lg font-bold">✕ Login failed: {props.loginError}</div>}
            <button type="submit" disabled={props.loginLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold py-3.5 rounded-xl transition-all flex justify-center items-center gap-2 cursor-pointer font-sans">{props.loginLoading ? "Authenticating Account..." : "Confirm Credentials"}</button>
          </form>
        ) : (
          <form onSubmit={props.onSubmitSignUp} className="space-y-4 text-sm">
            <div className="flex flex-col gap-1.5"><label className="text-xs font-bold text-slate-700">Full Name</label><input type="text" required placeholder="e.g. Abebe Kebede" value={props.signUpName} onChange={(e) => props.onSignUpNameChange(e.target.value)} className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all" /></div>
            <div className="flex flex-col gap-1.5"><label className="text-xs font-bold text-slate-700">Email Address</label><input type="email" required placeholder="Choose unique email" value={props.signUpEmail} onChange={(e) => props.onSignUpEmailChange(e.target.value)} className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all" /></div>
            <div className="flex flex-col gap-1.5"><label className="text-xs font-bold text-slate-700">Password</label><div className="relative"><input type={showSignUpPassword ? "text" : "password"} required placeholder="Create strong password" value={props.signUpPassword} onChange={(e) => props.onSignUpPasswordChange(e.target.value)} className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 pr-10 text-slate-950 outline-none transition-all" /><button type="button" aria-label={showSignUpPassword ? "Hide password" : "Show password"} onClick={() => setShowSignUpPassword((value) => !value)} className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-700 transition-colors"><span className="sr-only">Toggle password visibility</span>{showSignUpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div></div>
            {props.signUpError && <div className="text-xs bg-rose-50 border border-rose-100 text-rose-700 p-3 rounded-lg font-bold">✕ Registration failed: {props.signUpError}</div>}
            {props.signUpSuccess && <div className="text-xs bg-emerald-50 border border-emerald-100 text-emerald-800 p-3 rounded-lg font-bold">✓ Account registered! Toggling to sign in...</div>}
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold py-3.5 rounded-xl transition-all flex justify-center items-center gap-2 cursor-pointer font-sans">Register Account</button>
          </form>
        )}
        <div className="h-px bg-slate-100 my-6"></div>
        <p className="text-[10px] text-slate-400 text-center leading-relaxed">Note: Standard default accounts created upon seeding: <br /> Owner: <strong>owner</strong> / <strong>owner123</strong> <br /> Receptionist: <strong>reception</strong> / <strong>staff123</strong></p>
      </motion.div>
    </div>
  );
}
