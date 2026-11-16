
export default function AsideSection() {
  return (
    <aside className="flex flex-col gap-5">
      <section className="rounded-[14px] border border-[#eee5dc] bg-[#e98563] p-6 shadow-[0_12px_35px_-28px_rgba(74,49,32,0.28)]">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
          Espacio de producto
        </p>
        <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-[#f7eee6] text-xl text-[#a75c43]" aria-hidden="true">
          1
        </div>
        <h1 className="text-[25px] font-semibold leading-tight tracking-[-0.04em] text-[#332821]">
          Feedback App
        </h1>
        <p className="mt-3 text-sm leading-6 text-white">
          Un lugar para compartir ideas y ayudarnos a crear un producto mejor.
        </p>
        <div className="mt-6 border-t border-[#f1eae3] pt-5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#edf1e9] text-sm text-[#687b5d]" aria-hidden="true">
              ↗
            </span>
            <div>
              <p className="text-sm font-medium text-[#514238]">Tu voz sí cuenta</p>
              <p className="mt-1 text-xs leading-5 text-white">Cada sugerencia nos ayuda a decidir qué construir.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[14px] bg-[#f2e8de] p-5">
        <p className="text-sm font-semibold text-[#594637]">¿Tienes una idea?</p>
        <p className="mt-2 text-sm leading-6 text-[#806d5d]">
          Cuéntanos qué te gustaría ver. Las ideas claras hacen grandes productos.
        </p>
      </section>
    </aside>
  )
}