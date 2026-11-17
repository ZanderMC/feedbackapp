export default function Feedback({ title, description, imageUrl, state, votes, createdAt }) {
  return (
    <article className="rounded-[10px] border border-[#eee5dc] bg-white p-5 shadow-[0_10px_30px_-28px_rgba(74,49,32,0.35)] transition hover:border-[#dfc9b8] hover:shadow-[0_16px_34px_-28px_rgba(74,49,32,0.4)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {state && (
            <span className="mb-3 inline-flex rounded-full bg-[#f2eee7] px-2.5 py-1 text-[11px] font-semibold capitalize text-[#796b5e]">
              {state}
            </span>
          )}
          <h4 className="wrap-break-word text-[17px] font-semibold leading-6 tracking-[-0.02em] text-[#3d3027]">
            {title}
          </h4>
        </div>
        <div className=" cursor-pointer flex shrink-0 flex-col items-center rounded-xl border border-[#eee5dc] bg-[#fffdfa] px-3 py-2 text-[#a75c43]" aria-label={`${votes ?? 0} votos`}>
          <span className="text-[11px] leading-none" aria-hidden="true">▲</span>
          <span className="mt-1 text-sm font-semibold leading-none ">{votes ?? 0}</span>
        </div>
      </div>
      {description && (
        <p className="mt-3 whitespace-pre-line wrap-break-word text-sm leading-6 text-[#817265]">
          {description}
        </p>
      )}
      {imageUrl && (
        <img src={imageUrl} alt="" className="mt-4 max-h-64 w-full rounded-xl border border-[#eee5dc] object-cover" />
      )}
      {createdAt && (
        <div className="mt-5 border-t border-[#f1eae3] pt-4 text-xs text-[#a09184]">
          {createdAt}
        </div>
      )}
    </article>
  )
}
