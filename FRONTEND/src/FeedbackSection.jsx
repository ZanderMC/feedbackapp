import { useEffect , useState } from "react";
import Feedback from "./Feedback";
import Header from "./Header";
import SearchBar from "./SearchBar";


export default function FeedbackSection() {
 const [feedbacks, setFeedbacks] = useState([])

useEffect(()=>{

    async function GetFeedback(){
        const res  = await fetch('http://localhost:4321/feedback')

        const data = await res.json()
           console.log("data founded:", data);
 
        setFeedbacks(data)
    }  
    GetFeedback()

},[ ])

    return (
       <main className=" flex flex-col gap-4 w-full">
      <div>
         <h2 className="text-[20px] font-medium">Solicitudes de funciones</h2>
       <span className="text-[16px]">Cuéntanos qué funciones te ayudarían a recopilar y gestionar mejor los comentarios de los usuarios.</span>
      </div>
        <section className="w-full h-full bg-red-400 p-[2rem] flex flex-col gap-10">

            <SearchBar />
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

 