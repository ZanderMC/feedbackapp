import FeedbackSection from './FeedbackSection'
import Header from './Header'
import AsideSection from './AsideSection'
import { Toaster } from 'sonner'



export default function App() {

  return (
    <>
      <Header />
      <section className='flex flex-row gap-12 px-[30rem] py-[2rem]'>
        <AsideSection/>
        <FeedbackSection />
      </section>
      <Toaster position="top-right" richColors />
    </>

  )
}


