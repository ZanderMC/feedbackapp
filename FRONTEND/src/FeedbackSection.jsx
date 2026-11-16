import { useEffect , useState } from "react";
import Feedback from "./Feedback";
import SearchBar from "./SearchBar";
import { toast } from "sonner";
import { apiRequest } from "./api";


export default function FeedbackSection() {
 const [feedbacks, setFeedbacks] = useState([])

const handleFeedbackCreated = (newFeedback) => {
    setFeedbacks((currentFeedbacks) => [newFeedback, ...currentFeedbacks])
}

useEffect(()=>{
    const controller = new AbortController();

    async function GetFeedback(){
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
        }
    }  
    GetFeedback()

    return () => controller.abort();

},[ ])

    return (
       <main className=" flex flex-col gap-4 w-full">
      <div>
         <h2 className="text-[20px] font-medium">Solicitudes de funciones</h2>
       <span className="text-[16px]">Cuéntanos qué funciones te ayudarían a recopilar y gestionar mejor los comentarios de los usuarios.</span>
      </div>
        <section className="w-full h-full bg-red-400 p-[2rem] flex flex-col gap-10">

            <SearchBar onFeedbackCreated={handleFeedbackCreated} />
            <section className="bg-green-300   flex flex-col gap-2 ">
                <div className="bg-gray-500 w-full h-16">

                </div>

                <div className="bg-gray-500 w-full h-16 flex flex-col gap-6 h-auto">
                    
                     {feedbacks.map((feedback)=>(
                   
                    <Feedback key={feedback.id} title={feedback.title} description={feedback.description}  imageUrl={feedback.imageUrl} state={feedback.state} votes={feedback.votes} createdAt={feedback.createdAt} />
                    ))} 

                    
                </div>
            </section>

        </section>
       </main>
    )

}

 