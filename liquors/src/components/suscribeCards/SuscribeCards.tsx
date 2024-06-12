"use client";
import React from "react";
import SuscribeCard from "./SuscribeCard";
import { arraySuscribe } from "@/utils/arraySuscribe";
import { ISuscribe } from "@/interfaces/interfaz";

const SuscribeCards = () => {
  return (
    <div className="p-6 bg-greyVivino">
      {" "}
      <b>
        <h2 className="text-3xl font-plus-jakarta  text-center mb-6">
          Plan de suscripciones
        </h2>
      </b>
      <div className="flex flex-row justify-around items-center">
        {arraySuscribe?.map((p: ISuscribe) => (
          <SuscribeCard key={p.title} product={p} />
        ))}
      </div>
    </div>
  );
};

export default SuscribeCards;
