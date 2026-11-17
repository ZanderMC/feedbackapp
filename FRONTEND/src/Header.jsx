
export default function Header() {
  return (
    <header className="border-b border-[#eee5dc] bg-white">
      <div className="mx-auto flex h-19 w-[min(1180px,calc(100%-48px))] items-center justify-between max-[760px]:w-[calc(100%-32px)]">
        <a href="/" className="flex items-center gap-3 no-underline" aria-label="Zandev's Corp, inicio">
          <span className="flex size-10 items-center justify-center rounded-[14px] bg-[#bd674b] text-lg font-bold text-white shadow-sm shadow-[#bd674b]/20">
            z
          </span>
          <span className="flex flex-col">
            <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#332821]">Zandev&apos;s Corp</span>
            <span className="text-xs text-[#8d7b6d]">Feedback board</span>
          </span>
        </a>
        <span className="hidden items-center gap-2 rounded-full border border-[#eee5dc] bg-white px-3 py-2 text-xs font-medium text-[#766457] sm:flex">
          <span className="size-2 rounded-full bg-[#829578]" />
          Construyendo en comunidad
        </span>
      </div>
    </header>
  )
}