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

        <p className="text-center mt-4">
          Pantai Setigi Heni merupakan salah satu
          wisata pantai menarik di Lampung Selatan.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 shadow"
            >
              <div className="text-sky-600">
                {item.icon}
              </div>

              <h3 className="font-bold mt-4">
                {item.title}
              </h3>

              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}