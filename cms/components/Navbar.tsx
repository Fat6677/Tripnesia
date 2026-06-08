"use client";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const menus = [
        "Beranda",
        "Tentang",
        "Galeri",
        "Fasilitas",
        "Lokasi",
         "Kontak",
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
         <h1 className="font-bold text-sky-700 text-xl">
          Pantai Setigi Heni
         </h1>

         <div className="hidden md:flex gap-6">
            {menus.map((menu) => (
                <a
              key={menu}
              href="#"
              className="hover:text-sky-600"
            >
                 {menu}
            </a>
              ))}
         </div>

         <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
            <Menu />
        </button>
        </div>

         {open && (
        <div className="md:hidden bg-white p-4">
            {menus.map((menu) => (
            <a
              key={menu}
              href="#"
              className="block py-2"
            >
                {menu}
            </a>
            ))}
        </div>
         )}
    </nav>
    );
}