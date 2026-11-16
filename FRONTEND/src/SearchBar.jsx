import { useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "./api";

export default function SearchBar({ onFeedbackCreated }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        <form onSubmit={handleAddFeedback} className="w-full h-auto  bg-amber-300 p-[12px] flex flex-row justify-between">
            <div className="flex flex-col gap-2 p-1 w-3/4">
                <input type="text" value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Añadir authenticacion" className="bg-pink-300 h-10  " />
                <div className="flex flex-col">
                    <span>Details</span>
                    <textarea
                        onInput={(event) => {
                            event.currentTarget.style.height = "auto";
                            event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
                        }}

                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Agregar un formulario para ..."
                        className="bg-pink-300 min-h-8 overflow-hidden resize-none scrollbar-none"
                    />
                </div>
                <input type="file" id="imagen" accept="image/*" className="size-6 bg-yellow-950" />

            </div>

            <input
                type="submit"
                className="bg-blue-500 w-1/4 cursor-pointer"
                value={isSubmitting ? "Guardando..." : "Guardar"}
                disabled={isSubmitting}
            />


        </form>
    )
}