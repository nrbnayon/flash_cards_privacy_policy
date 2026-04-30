import { Zap, Lock, Shield, Database, Sparkles } from "lucide-react";

export default function Hero() {
  const features = [
    {
      icon: <Lock className="w-6 h-6" />,
      label: "Local Only",
      sub: "Data stays on device",
      color: "bg-blue-500",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      label: "Privacy First",
      sub: "No user tracking",
      color: "bg-orange-500",
    },
    {
      icon: <Database className="w-6 h-6" />,
      label: "No Accounts",
      sub: "Zero signup required",
      color: "bg-purple-500",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      label: "Secure Ops",
      sub: "No server uploads",
      color: "bg-emerald-500",
    },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "4s" }}
        />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Last Updated Badge */}
        <div className="inline-flex items-center gap-2.5 bg-white/50 backdrop-blur-md border border-slate-200/50 text-slate-600 text-[11px] uppercase tracking-[0.2em] font-black px-5 py-2.5 rounded-full mb-8 shadow-sm animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          Last Updated: April 27, 2026
        </div>

        {/* Hero Title */}
        <h1 className="text-6xl md:text-[9rem] font-black text-slate-900 tracking-tight leading-[0.85] mb-8 animate-fade-in-up">
          Privacy <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-600 via-orange-500 to-amber-400">
            Simplified.
          </span>
        </h1>

        <p
          className="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed mb-16 font-medium animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Wildland Fire Study respects your privacy. We believe fire safety education
          should be accessible, secure, and{" "}
          <span className="text-slate-900 font-bold">
            entirely under your control.
          </span>
        </p>

        {/* Feature Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          {features.map((item, i) => (
            <div
              key={i}
              className="group relative p-8 bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              <div
                className={`absolute top-0 right-0 w-24 h-24 ${item.color} opacity-[0.03] rounded-bl-full transition-all duration-500 group-hover:scale-150`}
              />

              <div
                className={`w-14 h-14 ${item.color} text-white rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-${item.color.split("-")[1]}-500/20 group-hover:rotate-6 transition-transform duration-500`}
              >
                {item.icon}
              </div>

              <h3 className="font-black text-slate-900 text-lg mb-2">
                {item.label}
              </h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                {item.sub}
              </p>

              {/* Corner Accent */}
              <div
                className={`absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity`}
              >
                <Sparkles className={`w-4 h-4 text-orange-400`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
