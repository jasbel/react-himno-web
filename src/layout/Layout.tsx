import React, { ReactNode } from 'react'
import Footer from './Footer'
import Header from './Header'

interface Props {
  children: ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className="App">
      <Header />
      
      <main style={{minHeight: 'calc(100vh - 100px)'}}>
       {children}
      </main>

      <Footer />
    </div>
  )
}

export default Layout