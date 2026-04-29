import { useState, useEffect, useRef } from "react";
import {
  Shield,
  ChevronUp,
  Menu,
  X,
  Copy,
  Check,
  Smartphone,
  Zap,
  Lock,
  Database,
  ArrowRight,
  ExternalLink,
  Mail,
  Globe,
  FileText,
  Camera,
  Image as ImageIcon,
  Share2,
  Trash2,
  UserCheck,
  AlertTriangle,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

const APP_PACKAGE = "com.flashcards1018.app";
const DEEP_LINK_URL = `intent://flashcards/privacy#Intent;package=${APP_PACKAGE};scheme=flashcards;end`;
const STORE_URL = `https://play.google.com/store/apps/details?id=${APP_PACKAGE}`;

const sections = [
  {
    id: "information",
    title: "1. Information We Collect",
    icon: <Database className="w-5 h-5" />,
  },
  {
    id: "usage",
    title: "2. How We Use Your Information",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: "storage",
    title: "3. Data Storage & Security",
    icon: <Lock className="w-5 h-5" />,
  },
  {
    id: "sharing",
    title: "4. Data Sharing",
    icon: <Share2 className="w-5 h-5" />,
  },
  {
    id: "third-party",
    title: "5. Third-Party Links",
    icon: <ExternalLink className="w-5 h-5" />,
  },
  {
    id: "children",
    title: "6. Children's Privacy",
    icon: <UserCheck className="w-5 h-5" />,
  },
  {
    id: "controls",
    title: "7. Your Controls",
    icon: <Trash2 className="w-5 h-5" />,
  },
  { id: "contact", title: "8. Contact Us", icon: <Mail className="w-5 h-5" /> },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [copiedDeepLink, setCopiedDeepLink] = useState(false);
  const [, setIsMobile] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        ),
      );
    };
    checkMobile();

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      setHeaderScrolled(window.scrollY > 60);

      const offsets = sections
        .map((s) => {
          const el = document.getElementById(s.id);
          return el ? { id: s.id, top: el.getBoundingClientRect().top } : null;
        })
        .filter(Boolean) as { id: string; top: number }[];

      const current = offsets.filter((o) => o.top <= 200).pop();
      if (current) setActiveSection(current.id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setMenuOpen(false);
    }
  };

  const copyDeepLink = async () => {
    try {
      await navigator.clipboard.writeText(DEEP_LINK_URL);
      setCopiedDeepLink(true);
      setTimeout(() => setCopiedDeepLink(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const openApp = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);

    if (isAndroid) {
      window.location.href = DEEP_LINK_URL;
    } else if (isIOS) {
      window.location.href = `flashcards://privacy`;
    } else {
      window.open(STORE_URL, "_blank");
      return;
    }

    const start = Date.now();
    const timeout = setTimeout(() => {
      if (Date.now() - start < 3000 && document.visibilityState === "visible") {
        window.open(STORE_URL, "_blank");
      }
    }, 2500);

    window.addEventListener(
      "visibilitychange",
      () => {
        clearTimeout(timeout);
      },
      { once: true },
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-100 selection:text-orange-900 font-sans">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-orange-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
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
                <img
                  src="/logo.png"
                  alt="FlashCards Logo"
                  className="w-10 h-10"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg tracking-tight text-slate-900 leading-tight">
                  FlashCards
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
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-200 transition-all duration-500 overflow-hidden ${menuOpen ? "max-h-screen opacity-100 py-6" : "max-h-0 opacity-0"}`}
        >
          <div className="px-4 space-y-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${activeSection === s.id ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "text-slate-600"}`}
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

      <main className="relative z-10">
        {/* 1. Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-b from-white to-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-700 text-[10px] uppercase tracking-[0.2em] font-black px-4 py-2 rounded-full mb-4 animate-fade-in">
              <Zap className="w-3.5 h-3.5" />
              Last Updated: April 27, 2026
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tight leading-none mb-6">
              Privacy{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
                Policy
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-12">
              FlashCards respects your privacy. We believe fire safety education
              should be accessible, secure, and entirely under your control.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                {
                  icon: <Lock />,
                  label: "Local Only",
                  sub: "Data stays on device",
                },
                {
                  icon: <Shield />,
                  label: "Privacy First",
                  sub: "No user tracking",
                },
                {
                  icon: <Database />,
                  label: "No Accounts",
                  sub: "Zero signup required",
                },
                {
                  icon: <Zap />,
                  label: "Secure Ops",
                  sub: "No server uploads",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 bg-white rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <p className="font-bold text-slate-900 text-sm mb-1">
                    {item.label}
                  </p>
                  <p className="text-slate-400 text-[10px] font-medium uppercase tracking-wider">
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Policy Contents Section */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[300px,1fr] gap-16">
            {/* Sidebar TOC */}
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
                        className={`w-1.5 h-1.5 rounded-full transition-all ${activeSection === s.id ? "bg-orange-500 scale-100" : "bg-slate-300 scale-0 group-hover:scale-100"}`}
                      />
                      {s.title}
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${activeSection === s.id ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`}
                    />
                  </button>
                ))}
              </div>
            </aside>

            {/* Main Content */}
            <div className="space-y-6 pb-24">
              {/* Intro Card */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm leading-relaxed text-slate-600 text-lg">
                <p>
                  <strong className="text-slate-900">FlashCards</strong> ("we,"
                  "our," or "us") respects your privacy. This Privacy Policy
                  explains how the app uses information when you use FlashCards
                  for fire safety education, quiz progress, certificate storage,
                  Fire Tracker incident logging, image capture, and exports.
                </p>
              </div>

              {/* Section 1 */}
              <section id="information" className="scroll-mt-24 space-y-6">
                <SectionHeader number="01" title="Information We Collect" />
                <div className="grid gap-8">
                  <div className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm">
                    <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                      <Smartphone className="w-6 h-6 text-orange-500" />
                      1.1 Device Permissions & Local Data
                    </h3>
                    <p className="text-slate-500 mb-4 leading-relaxed">
                      The app may request access to the following device
                      features to provide its core functionality:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        {
                          icon: <FileText />,
                          title: "Files & Documents",
                          desc: "Used to select certificate files and optional documents from your device.",
                        },
                        {
                          icon: <Camera />,
                          title: "Camera Access",
                          desc: "Used only when you choose to capture a certificate or Fire Tracker photo.",
                        },
                        {
                          icon: <ImageIcon />,
                          title: "Photo Library",
                          desc: "Used to select certificate images and Fire Tracker photos from your device.",
                        },
                        {
                          icon: <Share2 />,
                          title: "Share Sheet",
                          desc: "Used when you export Fire Tracker data as CSV or PDF to send or save it.",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex gap-4 hover:border-orange-200 hover:bg-orange-50/30 transition-all duration-300"
                        >
                          <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-orange-600 flex-shrink-0">
                            {item.icon}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 mb-1">
                              {item.title}
                            </p>
                            <p className="text-xs text-slate-500 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-125" />
                    <h3 className="text-xl font-black mb-4 flex items-center gap-3">
                      <Lock className="w-6 h-6 text-orange-500" />
                      1.2 User Data Privacy
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      We store your quiz progress, Fire Tracker entries
                      (including daily logs and photos), and certificate file
                      references{" "}
                      <span className="text-white font-black underline decoration-orange-500 decoration-2 underline-offset-4">
                        locally on your device
                      </span>
                      . We do not require account signup and do not collect
                      personal identifiers unless you voluntarily contact
                      support.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section id="usage" className="scroll-mt-24 space-y-6">
                <SectionHeader
                  number="02"
                  title="How We Use Your Information"
                />
                <div className="bg-white rounded-2xl p-10 border border-slate-200/60 shadow-sm">
                  <p className="text-slate-500 mb-10 text-lg">
                    The limited data used by the app is processed strictly to:
                  </p>
                  <div className="space-y-6">
                    {[
                      "Provide fire safety flashcards and quizzes, including shuffle mode and progress features.",
                      "Enable local certificate management and organization.",
                      "Let you create and manage Fire Tracker incident records, including attachments.",
                      "Generate professional safety reports (CSV/PDF) upon your request.",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-6 group">
                        <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 font-black text-xs flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                          {i + 1}
                        </div>
                        <p className="text-slate-700 font-bold text-lg">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="storage" className="scroll-mt-24 space-y-6">
                <SectionHeader number="03" title="Storage & Security" />
                <div className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm h-full flex flex-col">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                    <Lock className="w-8 h-8" />
                  </div>
                  <p className="text-slate-600 leading-relaxed flex-1">
                    Most app data is stored locally using on-device storage
                    (AsyncStorage and app-managed local files). We{" "}
                    <strong className="text-slate-900">do not upload</strong>{" "}
                    your incident data, certificate data, or photos to our
                    servers.
                  </p>
                </div>
              </section>

              <section id="sharing" className="scroll-mt-24 space-y-6">
                <SectionHeader number="04" title="Data Sharing" />
                <div className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm h-full flex flex-col">
                  <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-4">
                    <Shield className="w-8 h-8" />
                  </div>
                  <p className="text-slate-600 leading-relaxed flex-1">
                    We do not sell your data or share it for advertising. We do
                    not use account-based tracking. Data leaves your device{" "}
                    <strong className="text-slate-900">only</strong> when you
                    explicitly export files or open external links.
                  </p>
                </div>
              </section>

              {/* Section 5 */}
              <section id="third-party" className="scroll-mt-24 space-y-6">
                <SectionHeader
                  number="05"
                  title="Third-Party Links & Services"
                />
                <div className="bg-white rounded-2xl p-10 border border-slate-200/60 shadow-sm">
                  <p className="text-slate-500 mb-4 leading-relaxed">
                    The app includes external links that open in your browser or
                    external apps:
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    {[
                      {
                        name: "Prisoners of Fire",
                        platform: "YouTube",
                        url: "https://www.youtube.com/watch?v=t6YvoxTr2zM&rco=1",
                      },
                      {
                        name: "Sano Unda Foundation",
                        platform: "Website",
                        url: "https://sanoundafoundation.org/home-2",
                      },
                      {
                        name: "Flashcards/Poker Cards",
                        platform: "Shop Page",
                        url: "https://1018study.com/shop",
                      },
                    ].map((item, i) => (
                      <a
                        key={i}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-slate-900 transition-all duration-300 block"
                      >
                        <p className="font-black text-slate-900 group-hover:text-white mb-1 flex items-center justify-between">
                          {item.name}
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </p>
                        <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest">
                          {item.platform}
                        </p>
                      </a>
                    ))}
                  </div>
                  <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
                    <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                    <p className="text-sm text-amber-800 leading-relaxed font-medium">
                      External site interactions are governed by their own terms
                      and privacy policies. We do not control those sites and
                      are not responsible for their practices or payment
                      processing.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 6 & 7 Grid */}
              <section id="children" className="scroll-mt-24 space-y-6">
                <SectionHeader number="06" title="Children's Privacy" />
                <div className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
                    <UserCheck className="w-7 h-7" />
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    FlashCards is not intended for children under 13. We do not
                    knowingly collect personal data from children.
                  </p>
                </div>
              </section>

              <section id="controls" className="scroll-mt-24 space-y-6">
                <SectionHeader number="07" title="Your Controls" />
                <div className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm">
                  <div className="space-y-3">
                    {[
                      "Edit or delete Fire Tracker entries any time.",
                      "Delete certificate data from within the app.",
                      "Uninstall to remove all local app data.",
                      "Deny camera/photo access at any time.",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 group">
                        <Check className="w-4 h-4 text-green-500 group-hover:scale-125 transition-transform" />
                        <p className="text-sm font-bold text-slate-700">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 8 */}
              <section id="contact" className="scroll-mt-24 space-y-6">
                <SectionHeader number="08" title="Contact Us" />
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: <Mail />,
                      label: "Support Email",
                      val: "support@1018study.com",
                      href: "mailto:support@1018study.com",
                    },
                    {
                      icon: <Mail />,
                      label: "Privacy Officer",
                      val: "openroadexperience@gmail.com",
                      href: "mailto:openroadexperience@gmail.com",
                    },
                    {
                      icon: <Globe />,
                      label: "Official Website",
                      val: "www.1018study.com",
                      href: "https://www.1018study.com",
                    },
                  ].map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      className="p-8 bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:border-orange-500 hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center"
                    >
                      <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                        {item.icon}
                      </div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                        {item.label}
                      </p>
                      <p className="font-bold text-slate-900 break-all">
                        {item.val}
                      </p>
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>

        {/* 3. Deeplink & QR Section */}
        <section
          id="app-deeplink"
          className="py-32 bg-slate-950 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[60px] border border-slate-800 p-8 md:p-20 shadow-2xl overflow-hidden relative group">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />

              <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-10">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-white rounded-2xl p-5 shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-500">
                      <img
                        src="/logo.png"
                        alt="FlashCards Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                        Experience <br />
                        <span className="text-orange-500">FlashCards</span>
                      </h2>
                    </div>
                  </div>

                  <p className="text-xl text-slate-400 leading-relaxed max-w-lg">
                    Access your fire safety modules, quizzes, and certificates
                    instantly. Optimized for seamless learning on the go.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      onClick={openApp}
                      className="flex-1 px-8 py-5 bg-orange-500 text-white font-black rounded-2xl hover:bg-orange-600 transition-all flex items-center justify-center gap-3 shadow-xl"
                    >
                      <Smartphone className="w-6 h-6" />
                      Open App Now
                    </button>
                    <button
                      onClick={copyDeepLink}
                      className="px-8 py-5 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700 transition-all flex items-center justify-center gap-3"
                    >
                      {copiedDeepLink ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                      {copiedDeepLink ? "Copied!" : "Copy Link"}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="relative p-10 bg-white rounded-[48px] shadow-2xl group/qr">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      Scan to Launch
                    </div>
                    <div
                      ref={qrRef}
                      className="rounded-2xl overflow-hidden p-2 bg-white"
                    >
                      <QRCodeCanvas
                        value={DEEP_LINK_URL}
                        size={220}
                        level="H"
                        fgColor="#0f172a"
                        imageSettings={{
                          src: "/logo.png",
                          height: 44,
                          width: 44,
                          excavate: true,
                        }}
                      />
                    </div>
                  </div>
                  <p className="mt-8 text-slate-500 font-bold text-sm tracking-widest uppercase">
                    Android & iOS Compatible
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Footer Section */}
        <footer className="bg-white py-20 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/20">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-black text-slate-900 tracking-tight">
                FlashCards
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
                className="hover:text-orange-500 transition-colors"
              >
                1018study.com
              </a>
            </div>

            <div className="max-w-2xl mx-auto pt-10 border-t border-slate-100">
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed">
                © 2026 FlashCards · Fire Safety Education · All Rights Reserved
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-10 right-10 w-14 h-14 bg-slate-900 text-white rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-500 z-50 hover:bg-orange-500 hover:-translate-y-2 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-20"
        }`}
      >
        <ChevronUp className="w-6 h-6" />
      </button>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-6">
      <span className="text-5xl font-black text-slate-300/90 tracking-tighter tabular-nums leading-none">
        {number}
      </span>
      <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
        {title}
      </h2>
      <div className="h-px bg-slate-200 flex-1 hidden md:block" />
    </div>
  );
}
