"use client";

import { useEffect } from "react";

const Fruits = () => {
  const fruitsArr: string[] = [
    "🍇",
    "🍈",
    "🍉",
    "🍊",
    "🍋",
    "🍌",
    "🍍",
    "🥭",
    "🍎",
    "🍏",
    "🍐",
    "🍑",
    "🍒",
    "🍓",
    "🫐",
    "🥝",
    "🍅",
  ];

  useEffect(() => {
    const container = document.getElementById("fruit-container");
    const interval = setInterval(() => {
      const fruit = document.createElement("div");
      fruit.innerHTML = fruitsArr[Math.floor(Math.random() * fruitsArr.length)];
      fruit.style.left = `${Math.random() * 100}%`;
      container?.appendChild(fruit);

      setTimeout(() => {
        container?.removeChild(fruit);
      }, 10000);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className="fruits-container"
        style={{
          backgroundSize: "111.428571428571429px 111.428571428571429px",
          backgroundPosition:
            "0 0, 0 55.714285714285714px, 55.714285714285714px -55.714285714285714px, -55.714285714285714px 0px",
        }}
      >
        <div id="fruit-container" className="falling-fruits"></div>
      </div>
    </>
  );
};

export default Fruits;
