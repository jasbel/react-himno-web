import React, { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import BottomNavigation from './BottomNavigation'
import { ERoutes } from '@/utils/enum'

interface Props {
  children: ReactNode
}

const Layout = ({children}: Props) => {
  const location = useLocation()
  const isHomePage = location.pathname === '/' || location.pathname === `/${ERoutes.principal}`

  return (
    <div className="min-h-screen bg-background flex flex-col pb-16 md:pb-0">
      <Header />

      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
       {children}
      </main>

      {isHomePage && <Footer className="hidden md:block" />}
      <BottomNavigation />
    </div>
  )
}

export default Layout