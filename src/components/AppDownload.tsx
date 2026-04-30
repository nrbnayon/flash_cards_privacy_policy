import { Smartphone, Check, Copy } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";

interface AppDownloadProps {
  openApp: () => void;
  copyDeepLink: () => void;
  copiedDeepLink: boolean;
  deepLinkUrl: string;
}

export default function AppDownload({ openApp, copyDeepLink, copiedDeepLink, deepLinkUrl }: AppDownloadProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  return (
    <section id="app-deeplink" className="py-32 bg-slate-950 relative overflow-hidden">
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
                    alt="Wildland Fire Study Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                    Experience <br />
                    <span className="text-orange-500">Wildland Fire Study</span>
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
                <div ref={qrRef} className="rounded-2xl overflow-hidden p-2 bg-white">
                  <QRCodeCanvas
                    value={deepLinkUrl}
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
  );
}
