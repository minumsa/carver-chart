import { useAtom } from "jotai";
import { DEFAULT_TAGS } from "../../../modules/constants";
import styles from "./MobileTagDisplay.module.css";
import {
  CurrentTagKeyAtom,
  albumDataAtom,
  scrollCountAtom,
  scrollPositionAtom,
} from "../../../modules/atoms";
import { useState } from "react";

export const MobileTagDisplay = () => {
  const [data, setData] = useAtom(albumDataAtom);
  const [scrollCount, setScrollCount] = useAtom(scrollCountAtom);
  const [currentTagKey, setCurrentTagKey] = useAtom(CurrentTagKeyAtom);
  const [scrollPosition, setScrollPosition] = useAtom(scrollPositionAtom);
  const [showAllTagItems, setShowAllTagItems] = useState<boolean>(false);

  return (
    <div
      className={styles["tag-display-container"]}
      style={showAllTagItems ? { flexWrap: "wrap", paddingRight: "31px" } : { flexWrap: "nowrap" }}
    >
      {Object.keys(DEFAULT_TAGS).map((key, index) => {
        return (
          <div
            key={index}
            className={styles["tag-display-item"]}
            onClick={() => {
              setData([]);
              setCurrentTagKey(key);
              setScrollCount(1);
              window.scrollTo(0, scrollPosition);
              setScrollPosition(0);
            }}
            style={
              currentTagKey === key || (currentTagKey === "" && key === "all")
                ? { boxShadow: "inset 0 0 0 1px var(--text-color)", order: -1 }
                : undefined
            }
          >
            {DEFAULT_TAGS[key]}
          </div>
        );
      })}
      <div
        className={styles["arrow-down-container"]}
        onClick={() => {
          setShowAllTagItems(!showAllTagItems);
        }}
      >
        <img
          className={styles["arrow-down"]}
          src={showAllTagItems ? "/music/arrow-up.svg" : "/music/arrow-down.svg"}
          alt="arrow-down"
        />
      </div>
    </div>
  );
};
