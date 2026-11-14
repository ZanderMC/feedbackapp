
export default function Feedback({title , description , imageUrl , state , votes , createdAt}) {
 
   return (
      <article className="h-auto w-full px-4 py-4 bg-blue-500 flex flex-col ">
         <div className="flex flex-row justify-between items-center">
            <h2 className="text-[20px] font-medium">{title}</h2>
            <div className="bg-green-500 p-2 flex flex-col rounded-full text-[12px]" ><span>{votes}</span></div>
            </div>
         <span className="text-[1rem] leading-tight">{description}</span>
         {imageUrl}
         <div className="flex flex-row justify-between pt-4">
            {createdAt}
            <span className="underline cursor-pointer">Edit</span>
             <span  className="underline cursor-pointer">Delete</span>
         </div>
      </article>
   )

}