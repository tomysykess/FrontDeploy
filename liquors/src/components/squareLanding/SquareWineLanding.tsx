import React from "react";
import Link from "next/link";
import Image from "next/image";

const SquareWineLanding = () => {
  return (
    <div className="relative h-[25vw] w-[25vw] opacity-90">
      <Link href="/category/wine">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/squareWine.jpg"
            alt="categoryImage"
            className="object-cover w-full h-[110%]"
            layout="fill"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-700 bg-red-900 opacity-0 hover:opacity-80">
          <h2 className="text-center">Vinos</h2>
        </div>
      </Link>
    </div>
  );
};

export default SquareWineLanding;
