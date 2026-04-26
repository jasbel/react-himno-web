import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import BottomNavigation from './BottomNavigation'
import { ERoutes } from '@/utils/enum'

interface Props {
  children: ReactNode
}

const LayoutGlobal = ({children}: Props) => {
  const location = useLocation()
  const isHomePage = location.pathname === '/' || location.pathname === `/${ERoutes.principal}`

  return (
    <div className={`min-h-screen bg-background flex flex-col font-sans antialiased text-foreground ${!isHomePage ? 'pb-16 md:pb-0' : ''}`}>
      <Header />

      <main className="flex-1 w-full max-w-6xl mx-auto sm:px-6 lg:px-8 sm:py-10">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
          {children}
        </div>
      </main>

      {isHomePage && <Footer />}
      {!isHomePage && <BottomNavigation />}
    </div>
  )
}

export default LayoutGlobal