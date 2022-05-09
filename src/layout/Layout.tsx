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
      {children}
      <Footer />
    </div>
  )
}

export default Layout