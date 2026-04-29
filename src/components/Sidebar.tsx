import { ArrowRight } from "lucide-react";

interface SidebarProps {
  sections: { id: string; title: string }[];
  activeSection: string;
  scrollTo: (id: string) => void;
}

export default function Sidebar({ sections, activeSection, scrollTo }: SidebarProps) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-32 space-y-1">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 ml-4">
          Table of Contents
        </p>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className={`w-full text-left px-4 py-3.5 text-sm font-bold rounded-2xl transition-all flex items-center justify-between group ${
              activeSection === s.id
                ? "bg-white text-orange-600 shadow-xl shadow-slate-200/50 scale-[1.02]"
                : "text-slate-400 hover:text-slate-900 hover:bg-white/50"
            }`}
          >
            <span className="flex items-center gap-3">
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  activeSection === s.id ? "bg-orange-500 scale-100" : "bg-slate-300 scale-0 group-hover:scale-100"
                }`}
              />
              {s.title}
            </span>
            <ArrowRight
              className={`w-4 h-4 transition-transform ${
                activeSection === s.id ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
              }`}
            />
          </button>
        ))}
      </div>
    </aside>
  );
}
