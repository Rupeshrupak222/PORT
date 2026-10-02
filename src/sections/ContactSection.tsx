"use client";

import React, { useState } from "react";
import {
  Send,
  Check,
  MapPin,
  Clock,
  Github,
  Linkedin,
  Mail,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { audio } from "@/lib/audio";

export const ContactSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const email = "rupeshrupak609@gmail.com";
  const phone = "+91 8292244709";
  const github = "https://github.com/Rupeshrupak222";
  const linkedin = "https://www.linkedin.com/in/rupesh-kumar-rupak-bb4b44265";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      audio.playClick();

      // Direct AJAX submission to FormSubmit for rupeshrupak609@gmail.com
      const res = await fetch("https://formsubmit.co/ajax/rupeshrupak609@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
          _captcha: "false",
          _template: "table",
        }),
      });

      if (!res.ok) {
        // Fallback to server route if client request encounters cors/adblock
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      audio.playChime();
      setFormSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch {
      // Direct mailto fallback if network fails
      window.open(
        `mailto:${email}?subject=${encodeURIComponent(
          `Portfolio Message from ${formData.name}`
        )}&body=${encodeURIComponent(formData.message)}`,
        "_blank"
      );
      setFormSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen md:py-24 py-4 px-6 sm:px-12 lg:px-20 w-full max-w-[1700px] mx-auto z-10 select-none flex flex-col justify-center"
    >
      {/* Headline */}
      <div className="mb-12">
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Let&apos;s Build Together.
        </h2>
        <p className="mt-2 text-white text-sm sm:text-base max-w-xl">
          Open for full-time engineering roles, high-impact projects, and freelance commissions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Info & Contacts */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Email Box */}
          <a
            href={`mailto:${email}`}
            onClick={() => audio.playClick()}
            className="group p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/30 hover:bg-white/[0.04] transition-all flex items-center justify-between gap-3 cursor-pointer"
            data-cursor="EMAIL"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white group-hover:bg-white group-hover:text-black transition-colors shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-white uppercase block">Email Address</span>
                <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-white truncate block">
                  {email}
                </span>
              </div>
            </div>

            <ArrowUpRight className="w-4 h-4 text-white group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </a>

          {/* Phone Box */}
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            onClick={() => audio.playClick()}
            className="group p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/30 hover:bg-white/[0.04] transition-all flex items-center justify-between gap-3 cursor-pointer"
            data-cursor="CALL"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white group-hover:bg-white group-hover:text-black transition-colors shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-white uppercase block">Phone / WhatsApp</span>
                <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-white truncate block">
                  {phone}
                </span>
              </div>
            </div>

            <ArrowUpRight className="w-4 h-4 text-white group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </a>

          {/* Location & Status Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-1.5 text-white mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono uppercase">Location</span>
              </div>
              <span className="text-xs font-medium text-white">Hyderabad</span>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-1.5 text-white mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono uppercase">Response</span>
              </div>
              <span className="text-xs font-medium text-white">&lt; 6 Hours</span>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audio.playClick()}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-white text-white hover:text-white transition-all text-xs font-mono"
              data-cursor="GITHUB"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audio.playClick()}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-white text-white hover:text-white transition-all text-xs font-mono"
              data-cursor="LINKEDIN"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Right Column: Clean Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-2xl bg-[#09090D]/80 border border-white/15 backdrop-blur-xl flex flex-col gap-4"
          >
            {formSubmitted ? (
              <div className="py-10 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
                  <Check className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-white max-w-sm mb-6 leading-relaxed">
                  Thank you! I will get back to you as soon as possible.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono text-white uppercase">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 focus:border-white text-xs text-white placeholder:text-white/40 outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono text-white uppercase">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="elena@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 focus:border-white text-xs text-white placeholder:text-white/40 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-mono text-white uppercase">
                    Your Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell me about your project, team, or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 focus:border-white text-xs text-white placeholder:text-white/40 outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-silver-200 disabled:opacity-60 transition-all flex items-center justify-center gap-2 shadow-md mt-1 cursor-pointer hover:scale-[1.01] active:scale-95"
                  data-cursor="SEND"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
