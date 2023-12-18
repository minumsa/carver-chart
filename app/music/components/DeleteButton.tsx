import { deleteData } from "../modules/api";
import { AlbumInfo } from "../modules/data";
import styles from "../music.module.css";

interface DeleteButtonProps {
  data: AlbumInfo;
}

export const DeleteButton = ({ data }: DeleteButtonProps) => {
  return (
    <div
      className={styles["admin-button"]}
      onClick={async () => {
        deleteData(data.id);
      }}
    >
      삭제
    </div>
  );
};