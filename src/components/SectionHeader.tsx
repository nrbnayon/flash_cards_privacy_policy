interface SectionHeaderProps {
  number: string;
  title: string;
}

export default function SectionHeader({ number, title }: SectionHeaderProps) {
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
