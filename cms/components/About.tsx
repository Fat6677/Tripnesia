import { Waves, Camera, Trees } from "lucide-react";

export default function About() {
    const items = [
    {
      icon: <Waves />,
      title: "Pantai Alami",
      desc: "Air laut jernih dan panorama indah."
    },
     {
      icon: <Trees />,
      title: "Nuansa Tropis",
      desc: "Pepohonan hijau yang sejuk."
    },
    {
      icon: <Camera />,
      title: "Spot Foto",
      desc: "Banyak tempat instagramable."
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

         <h2 className="text-4xl font-bold text-center">
          Tentang Pantai
        </h2>
        
      </div>