import styles from "./Category.module.css";
import Link from "next/link";
import { Hamburger } from "./Hamburger";
import { usePathname } from "next/navigation";
import { useAtom } from "jotai";
import { CurrentTagKeyAtom } from "../../../modules/atoms";
import { isAdminPage } from "../../../modules/utils";
import { toSearchPage } from "../../../modules/paths";

export const Category = () => {
  const pathName = usePathname();
  const [currentTagKey, setCurrentTagKey] = useAtom(CurrentTagKeyAtom);
  const isMainPage = pathName === "/music" || pathName === "/music/admin";

  // 메인 페이지일 때 사이트 로고를 누르면 최상단으로 이동
  const scrollToTop = () => {
    if (isMainPage) {
      window.scrollTo(0, 0);
      setCurrentTagKey("");
    }
  };

  return (
    <div className={styles["container"]}>
      {/* 햄버거 메뉴 */}
      <Hamburger />
      <div className={styles["nav-container"]}>
        <div className={styles["nav-wrapper"]}>
          {/* 사이트 제목 */}
          <Link
            className={styles["title"]}
            href={isAdminPage(pathName) ? "/music/admin" : "/music"}
            onClick={scrollToTop}
          >
            <nav>카버차트</nav>
          </Link>
        </div>
      </div>
      {/* 검색 아이콘 */}
      <Link
        href={toSearchPage(pathName)}
        onClick={() => {
          setCurrentTagKey("");
        }}
      >
        <nav className={styles["search-icon"]}></nav>
      </Link>
    </div>
  );
};
