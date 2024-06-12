import React from "react";
import Image from 'next/image';

export const WorkProcessPage = () => {
  return (
    <div className="flex flex-col justify-center items-center my-10">
      <Image
        src="/work in process.png"
        alt="workProcess"
        width={500} // Ajusta estos valores según sea necesario
        height={500} // Ajusta estos valores según sea necesario
      />
      <h1 className="text-black">Estamos trabajando para crear esta pagina</h1>
    </div>
  );
};
