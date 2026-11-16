import { useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "./api";

export default function AddFeedbackForm({ onFeedbackCreated }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    async function handleAddFeedback(e) {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const result = await apiRequest('https://feedbackapp-production-671a1753.up.railway.app/feedback/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description }),
            });

            onFeedbackCreated(result.data);
            setTitle("");
            setDescription("");
            setIsOpen(false);
            toast.success("Feedback agregado correctamente.");
        } catch (error) {
            if (error?.name !== "AbortError") {
                toast.error(error instanceof Error ? error.message : "No se pudo agregar el feedback.");
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className="rounded-[10px] border border-[#eee5dc] bg-white p-5   sm:p-6">
            <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                    <h3 className="text-base font-semibold text-[#43352b]">Comparte una idea</h3>
                    <p className="mt-1 text-sm text-[#918174]">
                        {isOpen ? "Describe tu propuesta para que podamos valorarla." : "¿Tienes una sugerencia para mejorar?"}
                    </p>
                </div>
                <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls="feedback-create-form"
                    onClick={() => setIsOpen((open) => !open)}
                    className="inline-flex h-10 shrink-0 items-center gap-2 rounded-[10px] bg-[#e98563] px-4 text-sm font-semibold text-white transition hover:bg-[#bd674b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd674b]"
                >
                    {isOpen ? "Cerrar" : "Escribir idea"}
                    <span aria-hidden="true" className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
                        <svg  width="30px" height="50px" viewBox="0 0 25 25" >
                        <g>  <path fill="none" d="M0 0h24v24H0z" />
                            <path fill="white" d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z" />
                        </g>
                    </svg>
                    </span>
                </button>
            </div>

            {isOpen && (
                <form id="feedback-create-form" onSubmit={handleAddFeedback} className="mt-6 border-t border-[#f1eae3] pt-5">
                    <div className="flex flex-col gap-4">
                        <label className="flex flex-col gap-2 text-sm font-medium text-[#625246]">
                            Título
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Ej. Añadir inicio de sesión con Google"
                                className="h-11 rounded-xl border border-[#e9dfd5] bg-[#fffdfa] px-3.5 text-sm font-normal text-[#332821] outline-none transition placeholder:text-[#b4a69a] focus:border-[#bd8068] focus:ring-4 focus:ring-[#bd674b]/10"
                            />
                        </label>
                        <label className="flex flex-col gap-2 text-sm font-medium text-[#625246]">
                            Detalles
                            <textarea
                                onInput={(event) => {
                                    event.currentTarget.style.height = "auto";
                                    event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
                                }}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="¿Qué problema resolvería esta función?"
                                rows={3}
                                className="min-h-24 resize-y rounded-xl border border-[#e9dfd5] bg-[#fffdfa] px-3.5 py-3 text-sm font-normal leading-6 text-[#332821] outline-none transition placeholder:text-[#b4a69a] focus:border-[#bd8068] focus:ring-4 focus:ring-[#bd674b]/10"
                            />
                        </label>
                        <div className="flex flex-col gap-4 border-t border-[#f1eae3] pt-4 sm:flex-row sm:items-center sm:justify-between">
                            <button
                                type="button"
                                onClick={() => window.alert("Esta función aún no está disponible.")}
                                className="flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-sm text-[#827265] transition hover:text-[#bd674b]"
                            >
                                <span  className="flex size-8 items-center justify-center rounded-lg bg-[#f8f3ee] text-base" aria-hidden="true">＋</span>
                                Adjuntar imagen
                            </button>
                            <button
                                type="submit"
                                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#e98563] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#a9583e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd674b] disabled:cursor-not-allowed disabled:opacity-60"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Guardando..." : "Publicar sugerencia"}
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </section>
    );
}
