import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SUB_PER_PAGE_COUNT } from "../../../modules/constants";
import styles from "./PageNumbers.module.css";

interface PageNumbersProps {
  currentPage: number;
  totalDataLength: number;
}

export const PageNumbers = ({ currentPage, totalDataLength }: PageNumbersProps) => {
  const router = useRouter();
  const [totalPage, setTotalPage] = useState(1);
  const pageNumbers = Array.from({ length: totalPage }, (_, i) => i + 1);
  const fullPathName = usePathname();
  const pathNameWithoutPageNumber = fullPathName.replace(/\/\d+$/, "");
  const [maxPageNumber, setMaxPageNumber] = useState<number>(5);

  useEffect(() => {
    setMaxPageNumber(Math.ceil(currentPage / SUB_PER_PAGE_COUNT) * SUB_PER_PAGE_COUNT);
  }, [currentPage]);

  useEffect(() => {
    if (totalDataLength) setTotalPage(Math.max(1, Math.ceil(totalDataLength / 5)));
  }, [totalDataLength]);

  const handlePageClick = (pageNumber: number) => {
    router.push(`${pathNameWithoutPageNumber}/${pageNumber}`);
  };

  const goToPreviousPage = () => {
    if (maxPageNumber > 5) {
      const prevPageBlock = maxPageNumber - 5;
      handlePageClick(prevPageBlock);
    }
  };

  const goToNextPage = () => {
    const nextPageBlock = maxPageNumber + 1;
    handlePageClick(nextPageBlock);
  };

  return (
    <footer className={styles["page-container"]}>
      {currentPage > 5 && (
        <div className={styles["page"]} onClick={goToPreviousPage}>
          〈
        </div>
      )}
      {pageNumbers.map((page, index) => {
        const minPageNumber = maxPageNumber - SUB_PER_PAGE_COUNT + 1;
        const pageNumber = index + 1;
        const isPageNumberInRange = pageNumber >= minPageNumber && pageNumber <= maxPageNumber;
        const isCurrentPageEqualPageNumber = currentPage == pageNumber;
        if (isPageNumberInRange) {
          return (
            <div
              key={index}
              className={styles["page"]}
              onClick={() => {
                router.push(`${pathNameWithoutPageNumber}/${pageNumber}`);
              }}
              style={isCurrentPageEqualPageNumber ? { color: "#cfcfcf" } : undefined}
            >
              {page}
            </div>
          );
        } else {
          return null;
        }
      })}
      {totalPage - maxPageNumber > 0 && (
        <div className={styles["page"]} onClick={goToNextPage}>
          〉
        </div>
      )}
    </footer>
  );
};
