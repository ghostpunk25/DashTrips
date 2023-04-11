import { BsFillChatHeartFill } from "react-icons/bs";

export const Feedback = () => {
   return (
      <section className='py-5'>
         <h1 className="text-white bg-danger py-2 mb-5 text-center d-flex align-items-center justify-content-center gap-3"><BsFillChatHeartFill />Feedback</h1>
         <p className="fs-1 text-secondary text-center py-5">There is no information</p>
      </section>
   )
}