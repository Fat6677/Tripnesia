"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return ( 
     <section
      className="h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('/hero.jpg')",
      }}
    >
        <div className="absolute inset-0 bg-black/50" />
    </section>