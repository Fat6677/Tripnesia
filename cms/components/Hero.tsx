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

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold"
        >
          Pantai Setigi Heni
        </motion.h1>

        <p className="max-w-2xl mt-6 text-lg">
          Destinasi wisata pantai yang menawarkan
          panorama laut indah, pasir alami dan
          suasana tropis yang menenangkan.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="bg-sky-600 px-6 py-3 rounded-xl">
            Jelajahi Sekarang
          </button>

          <button className="bg-white text-black px-6 py-3 rounded-xl">
            Lihat Galeri
          </button>
        </div>
      </div>
    </section>
  );
}
