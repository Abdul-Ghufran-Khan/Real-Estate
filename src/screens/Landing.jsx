import React from 'react'
import { useRef } from "react";
import Navbar from "../components/Navbaar"
import { Toaster } from "sonner"
import Footer from "../components/Footer"
import Renthouse from '@/components/Renthouse'
import Buyhouse from '@/components/Buyhouse'

const Landing = () => {
  const buyHouseRef = useRef(null);
  const rentHouseRef = useRef(null);

  const scrollToBuyHouse = () => {
    buyHouseRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToRentHouse = () => {
    rentHouseRef.current?.scrollIntoView({ behavior: "smooth" });
  };

    return (
      <>
        <Toaster />
        <main className="min-h-screen">
          <Navbar onBuyClick={scrollToBuyHouse} onRentClick={scrollToRentHouse}/>
          <div ref={rentHouseRef}>
         <Renthouse/>
          </div>
         <div ref={buyHouseRef}>
         <Buyhouse/>
         </div>
          <Footer/>
        </main>
      </>
    )  
}

export default Landing