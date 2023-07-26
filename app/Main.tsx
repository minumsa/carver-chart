"use client";

import Image from "next/image";
import { useState } from "react";
import Draggable from "react-draggable";
import styles from "./index.module.css";
import { fortuneArr, fortuneEngArr } from "./data";

interface PageProps {
  language: string;
}

export default function Main({ language }: PageProps) {
  const [folderWidth, setFolderWidth] = useState<number>(80);
  const [folderHeight, setFolderHeight] = useState<number>(65);
  const [mobileFolderWidth, setMobileFolderWidth] = useState<number>(
    folderWidth * 0.9
  );
  const [mobileFolderHeight, setMobileFolderHeight] = useState<number>(
    folderHeight * 0.9
  );
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showImage, setShowImage] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [imgAlt, setImgAlt] = useState<string>("");
  const imgFileWidth: number = 72;
  const imgFileHeight: number = 96;
  const [MobileImgFileWidth, setMobileImgFileWidth] = useState<number>(
    imgFileWidth * 0.9
  );
  const [MobileImgFileHeight, setMobileImgFileHeight] = useState<number>(
    imgFileHeight * 0.9
  );

  const [isMemo, setIsMemo] = useState<boolean>(false);

  interface ImageModalProps {
    src: string;
    alt: string;
    onClick: any;
  }

  const ImageModal = ({ src, alt, onClick }: ImageModalProps) => {
    let width = 720;
    let height = 961;

    if (isMobile) {
      width /= 2;
      height /= 2;
    }

    return isMemo ? (
      <div
        className={styles["modal-container"]}
        style={{
          boxShadow:
            imgSrc === "/divdivdiv/readme-nav-ko.webp" ||
            imgSrc === "/divdivdiv/readme-nav-en.webp"
              ? "1px 2px 5px gray"
              : undefined,
        }}
        onClick={onClick}
      >
        <div className={styles["modal"]}>
          <Image
            src={src}
            alt={alt}
            width={isMobile ? 0 : 620}
            height={isMobile ? 0 : 50}
          />
          <div
            style={{
              height: isMobile
                ? language === "A"
                  ? "760px"
                  : "660px"
                : language === "A"
                ? "980px"
                : "850px",
              width: isMobile ? "370px" : "620px",
            }}
          >
            <div
              className={styles["main-exp-updated"]}
              style={{
                marginTop: isMobile ? "10px" : 0,
                fontWeight: isMobile ? 600 : 400,
              }}
            >
              {language === "A"
                ? "Last Updated: 2023-07-04"
                : "최근 업데이트: 2023년 7월 4일"}
            </div>
            <div className={styles["main-exp-paragraph"]}>
              <div
                className={styles["main-exp-paragraph-title"]}
                onClick={() => clickIconHandler("https://blog.divdivdiv.com")}
              >
                {language === "A" ? "1. Blog ✍️" : "1. 블로그 ✍️"}
              </div>
              {language === "A"
                ? "This page was created to provide a space for writing and posting freely. It features a layout similar to a book, focusing more on text than images, despite being a web page."
                : "자유롭게 글을 써서 올린 공간이 필요해 만든 페이지입니다. 이미지보다는 텍스트를 중심으로 업로드하기 위해, 웹이지만 책과 유사한 형태의 레이아웃을 구성했습니다."}
            </div>
            <div className={styles["main-exp-paragraph"]}>
              <div
                className={styles["main-exp-paragraph-title"]}
                onClick={() => clickIconHandler("/cinephile")}
              >
                {language === "A"
                  ? "2. Cinephile Test 🍿"
                  : "2. 시네필 테스트 🍿"}
              </div>
              {language === "A"
                ? "Test This page allows you to take quizzes about movies. After answering the questions, you can see your cinephile rating and your rank among all participants. You can also share the page."
                : "영화 퀴즈를 풀 수 있는 페이지입니다. 문제를 다 풀고 나면 나의 시네필 별점과 내가 전체 참가자 중 몇 등인지 알 수 있고, 페이지를 공유할 수 있습니다."}
            </div>
            <div className={styles["main-exp-paragraph"]}>
              <div
                className={styles["main-exp-paragraph-title"]}
                onClick={() => clickIconHandler("/pomodoro")}
              >
                {language === "A" ? "3. Pomodoro 🐑" : "3. 뽀모도로 🐑"}
              </div>
              {language === "A"
                ? "I have implemented a web version of the popular Pomodoro timer, which has been popular as a productivity tool for several years. Users can set their daily goals, as well as focus and rest times according to their preferences."
                : "몇 년 전부터 생산성 향상을 위한 아이템으로 인기를 끈 뽀모도로 타이머를 웹으로 구현했습니다. 사용자가 원하는 대로 하루 목표량, 집중 및 휴식 시간을 설정할 수 있습니다."}
            </div>
            <div className={styles["main-exp-paragraph"]}>
              <div
                className={styles["main-exp-paragraph-title"]}
                onClick={() => clickIconHandler("/fruits")}
              >
                <span>
                  {language === "A"
                    ? "4. Fruit Generator 🍇"
                    : "4. 과일 생성기 🍇"}
                </span>
              </div>
              {language === "A"
                ? "Fruits are continuously generated from the top of the page and descend. When you click on your favorite fruit, interesting or useful information about that fruit appears on the screen."
                : "페이지 상단에서 과일이 무한하게 생성되며 하강합니다. 특정 과일을 클릭하면 해당 과일에 대한 재밌고 유용한 정보가 화면에 나타납니다."}
            </div>
            <div className={styles["main-exp-paragraph"]}>
              <div
                className={styles["main-exp-paragraph-title"]}
                onClick={() => clickIconHandler("/pride-2023")}
              >
                {language === "A"
                  ? "5. Sentence Generator 🌈"
                  : "5. 문장 생성기 🌈"}
              </div>
              {language === "A"
                ? "This page was created to commemorate the 2023 Pride Month. Predefined subjects, objects, and verbs are randomly combined to generate various sentences, depending on the circumstances."
                : "2023 프라이드 먼스를 기념해 만든 페이지로, 미리 입력해둔 주어와 목적어, 동사가 경우의 수에 따라 랜덤하게 조합되며 다양한 문장을 만들어냅니다."}
            </div>
            <div className={styles["main-exp-paragraph"]}>
              <div
                className={styles["main-exp-paragraph-title"]}
                onClick={() => clickIconHandler("/pride-2023")}
              >
                {language === "A" ? "0. Carver Chart 🎶" : "0. 카버 차트 🎶"}
              </div>
              {language === "A"
                ? "The project I'm currently working on is a page that introduces favorite albums. It utilizes the Spotify API to upload album information along with short write-ups. When the administrator enters a password on the management page, they can write, modify, or delete the write-ups. All relevant data is stored in MongoDB."
                : "현재 작업 중인 프로젝트로, 좋아하는 음반을 소개하는 페이지입니다. 스포티파이에서 제공하는 API를 활용해 음반 정보, 짧은 글을 함께 업로드합니다. 관리자 페이지에서 암호를 입력하면 글을 쓰거나 수정, 삭제할 수 있습니다. 관련 데이터는 모두 MongoDB에 저장해두었습니다."}
            </div>
            <div className={styles["main-exp-paragraph"]}>
              <div
                className={styles["main-exp-paragraph-title"]}
                style={{ cursor: "help" }}
              >
                {language === "A" ? "*Tech Stack ⚙️" : "*테크 스택 ⚙️"}
              </div>
              TypeScript, CSS, Next.js, React
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div
        className={styles["image-modal"]}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={onClick}
      >
        <Image src={src} alt={alt} width={width} height={height} />
      </div>
    );
  };

  const clickIconHandler = (path: string) => {
    if (path.startsWith("http")) {
      window.open(path, "_blank");
    } else {
      const newTab = window.open(path, "_blank");
      newTab?.focus();
    }
  };

  const handleImageClick = () => {
    setShowImage(false);
    setImgSrc("");
    setImgAlt("");
  };

  const handleDoubleClick = (index: number) => {
    if (index === 6) {
      setImgSrc("/divdivdiv/cat.webp");
      setImgAlt("Cat");
    } else if (index === 7) {
      setImgSrc("/divdivdiv/me.webp");
      setImgAlt("Me");
    } else if (index === 8) {
      language === "A"
        ? setImgSrc("/divdivdiv/readme-nav-en.webp")
        : setImgSrc("/divdivdiv/readme-nav-ko.webp");
      setImgAlt("README.txt");
    }
    setShowImage(true);
  };

  const handleFortuneClick = () => {
    return language === "A"
      ? alert(fortuneEngArr[Math.floor(Math.random() * fortuneArr.length)])
      : alert(fortuneArr[Math.floor(Math.random() * fortuneArr.length)]);
  };

  return (
    <>
      {showImage && (
        <ImageModal src={imgSrc} alt={imgAlt} onClick={handleImageClick} />
      )}
      <Draggable>
        <div
          className={styles["index-icon-container-1"]}
          onDoubleClick={() => clickIconHandler("https://blog.divdivdiv.com")}
        >
          <div
            className={styles["index-icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/folder.webp)`,
              width: folderWidth,
              height: folderHeight,
            }}
          ></div>
          <div className={styles["index-icon-text"]}>
            <div>{language === "A" ? "Project 1" : "프로젝트 1"}</div>
            <div>{language === "A" ? "(Blog)" : "(블로그)"}</div>
          </div>
        </div>
      </Draggable>
      <Draggable>
        <div
          className={styles["index-icon-container-2"]}
          onDoubleClick={() => clickIconHandler("/cinephile")}
        >
          <div
            className={styles["index-icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/folder.webp)`,
              width: folderWidth,
              height: folderHeight,
            }}
          ></div>
          <div className={styles["index-icon-text"]}>
            <div>{language === "A" ? "Project 2" : "프로젝트 2"}</div>
            <div>
              {language === "A" ? "(Cinephile Test)" : "(시네필 테스트)"}
            </div>
          </div>
        </div>
      </Draggable>
      <Draggable>
        <div
          className={styles["index-icon-container-3"]}
          onDoubleClick={() => clickIconHandler("/pomodoro")}
        >
          <div
            className={styles["index-icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/folder.webp)`,
              width: folderWidth,
              height: folderHeight,
            }}
          ></div>
          <div className={styles["index-icon-text"]}>
            <div>{language === "A" ? "Project 3" : "프로젝트 3"}</div>
            <div>{language === "A" ? "(Pomodoro)" : "(뽀모도로)"}</div>
          </div>
        </div>
      </Draggable>
      <Draggable>
        <div
          className={styles["index-icon-container-4"]}
          onDoubleClick={() => clickIconHandler("/fruits")}
        >
          <div
            className={styles["index-icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/folder.webp)`,
              width: folderWidth,
              height: folderHeight,
            }}
          ></div>
          <div className={styles["index-icon-text"]}>
            <div>{language === "A" ? "Project 4" : "프로젝트 4"}</div>
            <div>{language === "A" ? "(fruits)" : "(과일 생성기)"}</div>
          </div>
        </div>
      </Draggable>
      <Draggable>
        <div
          className={styles["index-icon-container-5"]}
          onDoubleClick={() => clickIconHandler("/pride-2023")}
        >
          <div
            className={styles["index-icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/folder.webp)`,
              width: folderWidth,
              height: folderHeight,
            }}
          ></div>
          <div className={styles["index-icon-text"]}>
            <div>{language === "A" ? "Project 5" : "프로젝트 5"}</div>
            <div>{language === "A" ? "(Sentences)" : "(문장 생성기)"}</div>
          </div>
        </div>
      </Draggable>
      <Draggable>
        <div className={styles["index-icon-container-6"]}>
          <div
            className={styles["index-icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/cat.webp)`,
              width: imgFileWidth,
              height: imgFileHeight,
              boxShadow: "1px 2px 5px gray",
            }}
            onDoubleClick={() => {
              setIsMemo(false);
              handleDoubleClick(6);
            }}
          ></div>
          <div className={styles["index-img-text"]}>
            {language === "A" ? "cat.webp" : "고양이.webp"}
          </div>
        </div>
      </Draggable>
      <Draggable>
        <div className={styles["index-icon-container-7"]}>
          <div
            className={styles["index-icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/me.webp)`,
              width: imgFileWidth,
              height: imgFileHeight,
              boxShadow: "1px 2px 5px gray",
            }}
            onDoubleClick={() => {
              setIsMemo(false);
              handleDoubleClick(7);
            }}
          ></div>
          <div className={styles["index-img-text"]}>
            {language === "A" ? "me.webp" : "나.webp"}
          </div>
        </div>
      </Draggable>
      <Draggable>
        <div className={styles["index-icon-container-8"]}>
          <div
            className={styles["index-icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/fortune.webp)`,
              width: 80,
              height: 83,
            }}
            onDoubleClick={() => handleFortuneClick()}
          ></div>
          <div className={styles["index-icon-text"]}>
            <div> {language === "A" ? "fortune.exe" : "포춘쿠키.exe"}</div>
          </div>
        </div>
      </Draggable>
      <Draggable>
        <div className={styles["index-icon-container-9"]}>
          <div
            className={styles["index-icon-image"]}
            style={{
              backgroundImage: "url(/divdivdiv/readme-icon.webp)",
              width: imgFileWidth,
              height: imgFileHeight,
              boxShadow: "1px 2px 5px gray",
              border: 0,
            }}
            onDoubleClick={() => {
              setIsMemo(true);
              handleDoubleClick(8);
            }}
          ></div>
          <div
            className={styles["index-icon-text"]}
            style={{ marginTop: "13px" }}
          >
            <div> {language === "A" ? "README.txt" : "프로젝트 설명.txt"}</div>
          </div>
        </div>
      </Draggable>
      <Draggable>
        <div
          className={styles["index-icon-container-10"]}
          onDoubleClick={() => clickIconHandler("/music")}
        >
          <div
            className={styles["index-icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/folder.webp)`,
              width: folderWidth,
              height: folderHeight,
            }}
          ></div>
          <div className={styles["index-icon-text"]}>
            <div>{language === "A" ? "Project 0" : "프로젝트 0"}</div>
            <div>{language === "A" ? "(Carver Chart)" : "(카버 차트)"}</div>
          </div>
        </div>
      </Draggable>
      <div className={styles["index-mobile-content-container"]}>
        <div
          className={styles["index-mobile-icon-container"]}
          onClick={() => clickIconHandler("https://blog.divdivdiv.com")}
        >
          <div
            className={styles["index-icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/folder.webp)`,
              width: mobileFolderWidth,
              height: mobileFolderHeight,
            }}
          ></div>
          <div className={styles["index-mobile-icon-text"]}>
            <div>{language === "A" ? "Project 1" : "프로젝트 1"}</div>
            <div>{language === "A" ? "(Blog)" : "(블로그)"}</div>
          </div>
        </div>
        <div
          className={styles["index-mobile-icon-container"]}
          onClick={() => clickIconHandler("/cinephile")}
        >
          <div
            className={styles["index-icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/folder.webp)`,
              width: mobileFolderWidth,
              height: mobileFolderHeight,
            }}
          ></div>
          <div className={styles["index-mobile-icon-text"]}>
            <div>{language === "A" ? "Project 2" : "프로젝트 2"}</div>
            <div>
              {language === "A" ? "(Cinephile Test)" : "(시네필 테스트)"}
            </div>
          </div>
        </div>
        <div
          className={styles["index-mobile-icon-container"]}
          onClick={() => clickIconHandler("/pomodoro")}
        >
          <div
            className={styles["index-icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/folder.webp)`,
              width: mobileFolderWidth,
              height: mobileFolderHeight,
            }}
          ></div>
          <div className={styles["index-mobile-icon-text"]}>
            <div>{language === "A" ? "Project 3" : "프로젝트 3"}</div>
            <div>{language === "A" ? "(Pomodoro)" : "(뽀모도로)"}</div>
          </div>
        </div>
        <div
          className={styles["index-mobile-icon-container-5"]}
          onClick={() => clickIconHandler("/fruits")}
          style={{ marginLeft: "20px" }}
        >
          <div
            className={styles["index-icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/folder.webp)`,
              width: mobileFolderWidth,
              height: mobileFolderHeight,
            }}
          ></div>
          <div className={styles["index-mobile-icon-text"]}>
            <div>{language === "A" ? "Project 4" : "프로젝트 4"}</div>
            <div>{language === "A" ? "(Fruits)" : "(과일 생성기)"}</div>
          </div>
        </div>
        <div
          className={styles["index-mobile-icon-container-5"]}
          onClick={() => clickIconHandler("/pride-2023")}
        >
          <div
            className={styles["index-icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/folder.webp)`,
              width: mobileFolderWidth,
              height: mobileFolderHeight,
            }}
          ></div>
          <div className={styles["index-mobile-icon-text"]}>
            <div>{language === "A" ? "Project 5" : "프로젝트 5"}</div>
            <div>{language === "A" ? "(Sentences)" : "(문장 생성기)"}</div>
          </div>
        </div>
        <div
          className={styles["index-mobile-icon-container"]}
          onClick={() => clickIconHandler("/music")}
        >
          <div
            className={styles["index-icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/folder.webp)`,
              width: mobileFolderWidth,
              height: mobileFolderHeight,
            }}
          ></div>
          <div className={styles["index-mobile-icon-text"]}>
            <div>{language === "A" ? "Project 0" : "프로젝트 0"}</div>
            <div>{language === "A" ? "(Carver Chart)" : "(카버 차트)"}</div>
          </div>
        </div>
        <div className={styles["index-mobile-icon-container"]}>
          <div
            className={styles["index-icon-image"]}
            style={{
              backgroundImage: "url(/divdivdiv/readme-icon.webp)",
              width: MobileImgFileWidth,
              height: MobileImgFileHeight,
              boxShadow: "1px 2px 5px gray",
              border: 0,
            }}
            onClick={() => {
              setIsMobile(true);
              setIsMemo(true);
              handleDoubleClick(8);
            }}
          ></div>
          <div className={styles["index-mobile-img-text"]}>
            <div> {language === "A" ? "README.txt" : "프로젝트 설명.txt"}</div>
          </div>
        </div>

        <div className={styles["index-mobile-icon-container"]}>
          <div
            className={styles["index-icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/me.webp)`,
              width: MobileImgFileWidth,
              height: MobileImgFileHeight,
              boxShadow: "1px 2px 5px gray",
            }}
            onClick={() => {
              setIsMemo(false);
              setIsMobile(true);
              handleDoubleClick(7);
            }}
          ></div>
          <div className={styles["index-mobile-img-text"]}>
            {language === "A" ? "me.webp" : "나.webp"}
          </div>
        </div>
        <div className={styles["index-mobile-icon-container"]}>
          <div
            className={styles["index-icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/cat.webp)`,
              width: MobileImgFileWidth,
              height: MobileImgFileHeight,
              boxShadow: "1px 2px 5px gray",
            }}
            onClick={() => {
              setIsMobile(true);
              setIsMemo(false);
              handleDoubleClick(6);
            }}
          ></div>
          <div className={styles["index-mobile-img-text"]}>
            {language === "A" ? "cat.webp" : "고양이.webp"}
          </div>
        </div>
        <div
          className={styles["index-mobile-icon-container"]}
          style={{ marginLeft: "10px" }}
        >
          <div
            className={styles["index-icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/fortune.webp)`,
              width: 80 * 0.9,
              height: 83 * 0.9,
              marginTop: "10px",
              border: undefined,
              boxShadow: undefined,
            }}
            onClick={() => {
              setIsMobile(true);
              handleFortuneClick();
            }}
          ></div>
          <div className={styles["index-mobile-img-text"]}>
            {language === "A" ? "fortune.exe" : "포춘쿠키.exe"}
          </div>
        </div>
      </div>
    </>
  );
}
