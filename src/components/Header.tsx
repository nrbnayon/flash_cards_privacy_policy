import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

interface HeaderProps {
  sections: { id: string; title: string }[];
  activeSection: string;
  scrollTo: (id: string) => void;
  openApp: () => void;
}

export default function Header({ sections, activeSection, scrollTo, openApp }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        headerScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-200/40 border-b border-slate-200/50 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:rotate-6 transition-transform duration-300">
              <img src="/logo.png" alt="Wildland Fire Study Logo" className="w-10 h-10" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tight text-slate-900 leading-tight">
                Wildland Fire Study
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-orange-600 leading-none">
                Privacy First
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1.5">
            {sections.slice(0, 4).map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`px-3 py-2 text-sm font-bold rounded-full transition-all ${
                  activeSection === s.id
                    ? "text-orange-600 bg-orange-50"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {s.title.split(". ")[1]}
              </button>
            ))}
            <button
              onClick={openApp}
              className="ml-4 px-6 py-2.5 bg-slate-950 text-white text-sm font-bold rounded-full hover:bg-slate-800 transition-all"
            >
              Get App
            </button>
          </nav>

          <button
            className="lg:hidden p-2.5 rounded-xl bg-slate-100 text-slate-900"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-200 transition-all duration-500 overflow-hidden ${
          menuOpen ? "max-h-screen opacity-100 py-6" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 space-y-2">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                scrollTo(s.id);
                setMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${
                activeSection === s.id
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                  : "text-slate-600"
              }`}
            >
              {s.title}
            </button>
          ))}
          <div className="pt-4 grid grid-cols-2 gap-3">
            <button
              onClick={openApp}
              className="py-4 bg-orange-500 text-white font-bold rounded-2xl"
            >
              Launch
            </button>
            <button
              onClick={openApp}
              className="py-4 bg-slate-950 text-white font-bold rounded-2xl"
            >
              Get App
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
