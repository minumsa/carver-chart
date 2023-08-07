"use client";

import Image from "next/image";
import React, { createContext, useEffect, useState } from "react";
import styles from "./divdivdiv/divdivdiv.module.css";
import { Language, LanguageContext, Weather, fetchData } from "./divdivdiv/data";
import Clock from "./divdivdiv/Clock";
import About from "./divdivdiv/About";
import Contact from "./divdivdiv/Contact";
import Main from "./divdivdiv/Main";
import NoSSR from "./divdivdiv/NoSSR";

type Tab = "main" | "about" | "contact";
interface RenderButtonProps {
  text: string;
  tab: Tab;
}

export default function Home() {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = currentDate.getDate();
  const [dayOfWeek, dayOfEngWeek] = getDayOfWeek(currentDate);

  function getDayOfWeek(date: Date): [string, string] {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const daysOfEngWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayIndex = date.getDay();
    return [daysOfWeek[dayIndex], daysOfEngWeek[dayIndex]];
  }

  // FIXME: language 를 React.Context 일것!
  // => 모든 컴포넌트의 props 에 language 가 없어야 함!
  const [language, setLanguage] = useState<Language>("ko");
  const [weather, setWeather] = useState<Weather>({
    icon: null,
    temp: null,
  });
  const [activeTab, setActiveTab] = useState<Tab>("main");

  useEffect(() => {
    fetchData(setWeather);
  }, []);

  function RenderButtonLeft({ text, tab }: RenderButtonProps) {
    return (
      <div
        className={styles["button-left"]}
        style={{ fontWeight: activeTab === tab ? "600" : "400" }}
        onClick={() => setActiveTab(tab)}
      >
        {text}
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={language}>
      <div className={styles["container-background"]}>
        <div className={styles["container"]}>
          <div className={styles["nav-container"]}>
            <div className={styles["nav"]}>
              <RenderButtonLeft text="divdivdiv" tab="main" />
              <RenderButtonLeft text={language === "en" ? "About" : "소개"} tab="about" />
              <RenderButtonLeft text={language === "en" ? "Contact" : "연결"} tab="contact" />
              <div className={styles["blank-space"]}></div>
              <React.Fragment>
                {weather.icon && (
                  <div className={`${styles["button-right"]} ${styles["weather"]}`}>
                    <Image
                      src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                      width={35}
                      height={35}
                      alt="Weather Icon"
                    />
                  </div>
                )}
                <div className={`${styles["button-right"]} ${styles["temperature"]}`}>
                  {weather.temp && `${(weather.temp - 273.15).toFixed(1)}°`}
                </div>
              </React.Fragment>
              <div
                className={`${styles["button-right"]} ${styles["language"]}`}
                onClick={() => {
                  setLanguage(language === "en" ? "ko" : "en");
                }}
              >
                {language === "en" ? "A" : "한"}
              </div>
              <div className={`${styles["button-right"]} ${styles["calender"]}`}>
                {language === "en"
                  ? `${months[month - 1]} ${day} (${dayOfEngWeek})`
                  : `${month}월 ${day}일 (${dayOfWeek})`}
              </div>
              <div className={`${styles["button-right"]} ${styles["clock"]}`}>
                <Clock />
              </div>
            </div>
          </div>
          <div className={styles["content"]}>
            {activeTab === "main" && (
              <NoSSR>
                <Main />
              </NoSSR>
            )}
            {activeTab === "about" && <About />}
            {activeTab === "contact" && <Contact />}
          </div>
        </div>
      </div>
    </LanguageContext.Provider>
  );
}
