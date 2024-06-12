import { INews } from "@/interfaces/interfaz";
import React from "react";

const NewsItem = ({ newItem }: { newItem: INews }) => {
  const isImageRight = newItem.direction === "right";

  return (
    <div
      className={`overflow-hidden m-4 p-4 flex ${
        isImageRight ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <img
        src={newItem.imageB}
        alt={newItem.title}
        className="z-20 absolute  w-auto h-1/2 object-contain flex-shrink-0"
      />
      <img
        src={newItem.imageF}
        alt={newItem.title}
        className="z-30  w-1/4 h-1/5 object-contain flex-shrink-0 opacity-85"
      ></img>
      <div
        className={`flex flex-col justify-center ${
          isImageRight ? "text-right mr-4" : "text-left ml-4"
        }`}
      >
        <div className="z-50">
          <b>
            <h2 className="z-40 text-2xl font-plus-jakarta-sans text-gray-800 mb-2">
              {newItem.title}
            </h2>
          </b>
        </div>
        <div className="z-50">
          <p className="  text-gray-700 text-base font-plus-jakarta-sans">
            {newItem.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
