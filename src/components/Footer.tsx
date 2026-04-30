import { Shield } from "lucide-react";

interface FooterProps {
  scrollTo: (id: string) => void;
}

export default function Footer({ scrollTo }: FooterProps) {
  return (
    <footer className="bg-white py-20 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">
            Wildland Fire Study
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-12 text-sm font-black text-slate-400 uppercase tracking-widest">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-orange-500 transition-colors"
          >
            Top
          </button>
          <button
            onClick={() => scrollTo("app-deeplink")}
            className="hover:text-orange-500 transition-colors"
          >
            Download
          </button>
          <a
            href="https://www.1018study.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500 transition-colors"
          >
            1018study.com
          </a>
        </div>

        <div className="max-w-2xl mx-auto pt-10 border-t border-slate-100">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed">
            © 2026 Wildland Fire Study · Fire Safety Education · All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
