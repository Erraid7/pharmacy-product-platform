export function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm animate-pulse">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-2xl bg-slate-200" />
        <div className="flex-1">
          <div className="mb-3 h-5 w-2/3 rounded-full bg-slate-200" />
          <div className="mb-2 h-4 w-1/2 rounded-full bg-slate-100" />
          <div className="h-3 w-1/3 rounded-full bg-slate-100" />
        </div>
        <div className="h-7 w-20 rounded-full bg-slate-200" />
      </div>

      <div className="my-5 border-t border-slate-100" />

      <div className="flex gap-2">
        <div className="h-9 w-24 rounded-xl bg-slate-200" />
        <div className="h-9 w-28 rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}