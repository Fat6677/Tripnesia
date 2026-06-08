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
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50"></nav>