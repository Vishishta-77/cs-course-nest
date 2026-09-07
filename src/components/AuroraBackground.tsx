export function AuroraBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-0"
      aria-hidden="true"
    >
      <div className="aurora-blob absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full bg-aurora-teal/25 blur-3xl" />
      <div className="aurora-blob aurora-blob-slow aurora-blob-rev absolute top-1/4 -right-40 h-[560px] w-[560px] rounded-full bg-aurora-indigo/22 blur-3xl" />
      <div className="aurora-blob absolute -bottom-48 left-1/3 h-[520px] w-[520px] rounded-full bg-aurora-green/18 blur-3xl" />
    </div>
  );
}
