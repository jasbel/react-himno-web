import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface Props {
  children: ReactNode
}

const LayoutGlobal = ({children}: Props) => {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans antialiased text-foreground">
      <Header />
      
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default LayoutGlobal