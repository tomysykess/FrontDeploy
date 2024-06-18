"use client";

import { useEffect } from "react";
declare global {
  interface Window {
    myLandbot?: any;
    Landbot?: any;
  }
}
const Landbot = () => {
  useEffect(() => {
    const initLandbot = () => {
      if (!window.myLandbot) {
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.addEventListener("load", () => {
          window.myLandbot = new (window as any).Landbot.Livechat({
            configUrl:
              "https://storage.googleapis.com/landbot.online/v3/H-2522202-46DFHRJXU8XYH48G/index.json",
          });
        });
        s.src = "https://cdn.landbot.io/landbot-3/landbot-3.0.0.js";
        const x = document.getElementsByTagName("script")[0];
        if (x && x.parentNode) {
          x.parentNode.insertBefore(s, x);
        }
      }
    };

    window.addEventListener("mouseover", initLandbot, { once: true });
    window.addEventListener("touchstart", initLandbot, { once: true });

    return () => {
      window.removeEventListener("mouseover", initLandbot);
      window.removeEventListener("touchstart", initLandbot);
    };
  }, []);

  return null;
};

export default Landbot;
