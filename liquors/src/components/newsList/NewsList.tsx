// src/components/NewsList.js
import React from "react";

import { arrayNewsletter } from "@/utils/arrayNewsletter";
import NewsItem from "../newsCard/NewsCard";

const NewsList = () => {
  return (
    <div className="flex flex-col justify-center">
      {arrayNewsletter.map((newItem, index) => (
        <NewsItem key={index} newItem={newItem} />
      ))}
    </div>
  );
};

export default NewsList;
