import { useEffect, useState } from "react";
import Feedback from "./Feedback";
 import { toast } from "sonner";
import { apiRequest } from "./api";
import AddFeedbackForm from "./AddFeedbackForm";

export default function FeedbackSection() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleFeedbackCreated = (newFeedback) => {
        setFeedbacks((currentFeedbacks) => [newFeedback, ...currentFeedbacks]);
    };

    useEffect(() => {
        const controller = new AbortController();

        async function getFeedback() {
            try {
                const data = await apiRequest('https://feedbackapp-production-671a1753.up.railway.app/feedback/', {
                    signal: controller.signal,
                });
                if (!Array.isArray(data)) {
                    throw new Error("El servidor devolvió una lista de feedbacks no válida.");
                }
                setFeedbacks(data);
            } catch (error) {
                if (error?.name !== "AbortError") {
                    toast.error(error instanceof Error ? error.message : "No se pudieron cargar los feedbacks.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }
        getFeedback();

        return () => controller.abort();
    }, []);

    return (
        <main className="flex min-w-0 flex-col gap-7">
            <header className="pt-1">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#bd674b]">Tablero de ideas</p>
                <h2 className="text-[clamp(28px,4vw,36px)] font-semibold leading-tight tracking-[-0.045em] text-[#332821]">
                    Solicitudes de funciones
                </h2>
                <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#817265]">
                    Comparte las funciones que te ayudarían a recopilar y gestionar mejor los comentarios de tus usuarios.
                </p>
            </header>

            <AddFeedbackForm onFeedbackCreated={handleFeedbackCreated} />

            <section aria-labelledby="feedback-list-heading">
                <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                        <h3 id="feedback-list-heading" className="text-base font-semibold text-[#43352b]">Ideas de la comunidad</h3>
                        <p className="mt-1 text-sm text-[#98877a]">
                            {feedbacks.length} {feedbacks.length === 1 ? "sugerencia" : "sugerencias"}
                        </p>
                    </div>
                    <span className="rounded-full border border-[#eee5dc] bg-white px-3 py-1.5 text-xs font-medium text-[#766457]">
                        Más recientes
                    </span>
                </div>

                <div className="flex flex-col gap-3">
                    {isLoading ? (
                        <div className="rounded-[20px] border border-[#eee5dc] bg-white px-6 py-10 text-center text-sm text-[#918174]" role="status">
                            Cargando sugerencias...
                        </div>
                    ) : feedbacks.length > 0 ? (
                        feedbacks.map((feedback) => (
                            <Feedback
                                key={feedback.id}
                                title={feedback.title}
                                description={feedback.description}
                                imageUrl={feedback.imageUrl}
                                state={feedback.state}
                                votes={feedback.votes}
                                createdAt={feedback.createdAt}
                            />
                        ))
                    ) : (
                        <div className="rounded-[20px] border border-dashed border-[#dfd1c4] bg-[#fffdfa] px-6 py-10 text-center">
                            <p className="text-sm font-medium text-[#57483c]">Todavía no hay sugerencias</p>
                            <p className="mt-2 text-sm text-[#918174]">Sé la primera persona en compartir una idea.</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
