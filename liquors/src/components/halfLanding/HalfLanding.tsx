"use client";
import React, { useState, useEffect } from "react";
import Image from 'next/image';

const HalfLanding = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative w-1/2 h-screen bg-gray-200 opacity-90 flex flex-col items-center justify-center shadow-lg overflow-hidden">
      <div
        className="absolute object-cover w-full h-[300%] z-0"
        style={{ transform: `translateY(-${scrollY * 0.3}px)` }}
      >
        <Image
          src="/liquors1.jpg"
          alt=""
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="relative z-10">
        <h1 className="text-4xl font-bold">Componente HalfLanding</h1>
        <p className="mt-4 text-lg">
          Este es un componente que ocupa media pantalla.
        </p>
      </div>
    </div>
  );
};

export default HalfLanding;
