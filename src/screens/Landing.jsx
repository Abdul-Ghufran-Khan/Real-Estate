import React from 'react'
import Navbar from "../components/Navbaar"
import { Toaster } from "sonner"
import Footer from "../components/Footer"
import Renthouse from '@/components/Renthouse'
import Buyhouse from '@/components/Buyhouse'

const Landing = () => {
    return (
      <>
        <Toaster />
        <main className="min-h-screen">
          <Navbar />
         <Renthouse/>
         <Buyhouse/>
          <Footer/>
        </main>
      </>
    )  
}

export default Landing