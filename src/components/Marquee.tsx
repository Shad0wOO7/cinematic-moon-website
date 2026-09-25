const ITEMS = [
  "384 400 KM",
  "27,3 JOURS D'ORBITE",
  "1,62 M/S² DE GRAVITÉ",
  "12 HUMAINS",
  "4,5 MILLIARDS D'ANNÉES",
  "−173 °C À L'OMBRE",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative z-10 overflow-hidden border-y border-white/5 bg-night/60 py-5 backdrop-blur-sm">
      <div className="animate-marquee flex w-max items-center">
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-8 font-display text-lg font-light italic tracking-wide text-moon/60 md:text-xl">
              {item}
            </span>
            <span className="text-[8px] text-gold/70">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
