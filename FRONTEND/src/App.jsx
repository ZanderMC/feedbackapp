import { Toaster } from 'sonner'
import AsideSection from './AsideSection'
import FeedbackSection from './FeedbackSection'
import Header from './Header'

export default function App() {
  return (
    <>
      {/* <Header /> */}
      <div className="app-shell">
        <AsideSection />
        <FeedbackSection />
      </div>
      <Toaster position="top-right" richColors />
    </>
  )
}


