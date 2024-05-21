import { useEffect, useRef, useState } from "react";
import styles from "./UploadUpdate.module.css";
import React from "react";
import {
  NewDataForUpdate,
  fetchAlbumById,
  fetchSpotify,
  searchSpotify,
  updateData,
  uploadData,
} from "../../modules/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Rate from "rc-rate";
import "rc-rate/assets/index.css";
import { SearchData, SpotifyAlbumData } from "../../modules/types";
import { GENRES, DEFAULT_TAGS, GROUP_TAGS } from "../../modules/constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { AlbumSearchModal } from "./AlbumSearchModal";

interface UpdateProps {
  currentId: string;
}

interface Video {
  title: string;
  url: string;
}

export default function UploadUpdate({ currentId }: UpdateProps) {
  const isUpdatePage = currentId.length > 0;
  const [newAlbumId, setNewAlbumId] = useState("");
  const [artist, setArtist] = useState("");
  const [artistId, setArtistId] = useState("");
  const [genre, setGenre] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [albumReleaseDate, setAlbumReleaseDate] = useState<string>("");
  const [uploadDate, setUploadDate] = useState(new Date());
  const [videoCount, setVideoCount] = useState(1);
  const [videos, setVideos] = useState<Video[]>([{ title: "", url: "" }]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchData, setSearchData] = useState<SearchData[]>();
  const [isTyping, setIsTyping] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentTagKeys, setCurrentTagKeys] = useState<string[]>([]);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [newTagKey, setNewTagKey] = useState("");
  const [blurHash, setBlurHash] = useState("");
  const updatePageExclusive = { display: isUpdatePage ? undefined : "none" };
  const { register, handleSubmit, setValue, getValues, watch } = useForm({
    defaultValues: {
      albumId: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const { albumId } = data;
    const filteredText = text.replace(/\[\d+\]/g, "");
    const newSpotifyAlbumData: SpotifyAlbumData | undefined = await fetchSpotify(newAlbumId);

    if (newSpotifyAlbumData) {
      const newData: NewDataForUpdate = {
        newSpotifyAlbumData,
        originalAlbumId: albumId,
        genre,
        link,
        text: filteredText,
        uploadDate,
        score,
        videos,
        tagKeys: currentTagKeys,
        blurHash,
      };

      try {
        const apiMethod = isUpdatePage ? updateData : uploadData;
        await apiMethod({ newData, password });
        toast.success(isUpdatePage ? "수정 완료 😻" : "게시글 작성 완료 😻");
      } catch (error) {
        console.error(`${isUpdatePage ? "updateData" : "uploadData"} 호출에 실패했습니다:`, error);
        toast.error(`${isUpdatePage ? "수정 실패 😿" : "게시글 작성 실패 😿"}`);
      }
    }
  });

  useEffect(() => {
    async function getData() {
      const fetchData = await fetchAlbumById(currentId);
      const {
        id,
        artist,
        artistId,
        genre,
        link,
        text,
        uploadDate,
        score,
        videos,
        tagKeys,
        album,
        releaseDate,
        blurHash,
      } = fetchData;
      setValue("albumId", id);
      setNewAlbumId(id);
      setArtist(artist);
      setArtistId(artistId);
      setGenre(genre);
      setLink(link);
      setText(text);
      setScore(score);
      setUploadDate(new Date(uploadDate));
      setSearchKeyword(album);
      setCurrentTagKeys(tagKeys);
      setAlbumReleaseDate(new Date(releaseDate).toString());
      setBlurHash(blurHash);

      const hasVideo = videos.length > 0;

      if (hasVideo) {
        setVideos(videos);
        setVideoCount(videos.length);
      }
    }

    if (isUpdatePage) getData();
  }, [currentId]);

  const handleSearch = async () => {
    const result = await searchSpotify(searchKeyword);
    setSearchData(result);
  };

  useEffect(() => {
    const isSearching = isTyping && searchKeyword;
    if (isSearching) {
      const typingTimer = setTimeout(() => {
        handleSearch();
      }, 1000);

      return () => clearTimeout(typingTimer);
    }
  }, [searchKeyword, isTyping]);

  const handleClickSearchResult = (data: SearchData) => {
    const { name, id, artists } = data;
    setArtist(artists[0].name);
    setNewAlbumId(id);
    setSearchKeyword(name);
    setSearchData(undefined);
    setIsTyping(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isClickedOutsideModal =
        modalRef.current && !modalRef.current.contains(event.target as Node);
      if (isClickedOutsideModal) {
        setIsTyping(false);
        setShowTagsModal(false);
        setNewTagKey("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const deleteTagItem = (selectedKey: string) => {
    setCurrentTagKeys((prevTagKeys) =>
      prevTagKeys.filter((prevTagKey) => prevTagKey !== selectedKey),
    );
  };

  const addTagItem = (selectedKey: string) => {
    setCurrentTagKeys((prevTagKeys) => [...prevTagKeys, selectedKey]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isExisingTag = currentTagKeys.includes(newTagKey);

    if (e.key === "Enter") {
      if (!isExisingTag) setCurrentTagKeys((prevTagKeys) => [...prevTagKeys, newTagKey]);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className={styles["container"]}
      style={showTagsModal ? { marginBottom: "150px" } : undefined}
    >
      <div className={styles["page-title"]}>{`${isUpdatePage ? "수정" : "업로드"}`} 페이지</div>

      {/* 장르 */}
      <div className={styles["block-container"]}>
        <div className={styles["block-title"]}>장르</div>
        <div className={styles["select-container"]}>
          <select
            className={styles["small-input"]}
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value);
            }}
          >
            <option value="">--장르를 선택해주세요--</option>
            {Object.entries(GENRES).map(([key, value]) => {
              return (
                <option value={key} key={key}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* 애플뮤직 링크 */}
      <div className={styles["block-container"]}>
        <div className={styles["block-title"]}>링크(Apple Music)</div>
        <input
          className={styles["input"]}
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
      </div>

      {/* 앨범 제목 */}
      <div className={styles["block-container"]}>
        <div className={styles["block-title"]}>앨범 제목</div>
        <div style={{ position: "relative" }}>
          <input
            className={styles["input"]}
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
              setIsTyping(true);
            }}
            placeholder="검색어를 입력해주세요"
          />
          {searchData && (
            <AlbumSearchModal searchData={searchData} onSelect={handleClickSearchResult} />
          )}
        </div>
      </div>

      {/* 앨범 ID */}
      <div className={styles["block-container"]} style={updatePageExclusive}>
        <div className={styles["block-title"]}>앨범 ID(Spotify)</div>
        <div className={styles["input"]}>{newAlbumId}</div>
      </div>

      {/* 발매일 */}
      <div className={styles["block-container"]} style={updatePageExclusive}>
        <div className={styles["block-title"]}>발매일</div>
        <div className={styles["input"]}>{albumReleaseDate}</div>
      </div>

      {/* 아티스트 ID */}
      <div className={styles["block-container"]} style={updatePageExclusive}>
        <div className={styles["block-title"]}>아티스트 ID(Spotify)</div>
        <input
          className={styles["input"]}
          value={artistId}
          onChange={(e) => {
            setArtistId(e.target.value);
          }}
        />
      </div>

      {/* BlurHash String */}
      <div className={styles["block-container"]}>
        <div className={styles["block-title"]}>BlurHash String</div>
        <input
          className={styles["input"]}
          value={blurHash}
          onChange={(e) => {
            setBlurHash(e.target.value);
          }}
        />
      </div>

      {/* 별점 */}
      <div className={styles["block-container"]}>
        <div className={styles["block-title"]}>별점</div>
        <Rate
          defaultValue={3}
          value={score}
          count={5}
          allowHalf={true}
          onChange={(value: number) => {
            setScore(value);
          }}
          className={styles["rc-rate"]}
        />
      </div>

      {/* 글 */}
      <div className={styles["block-container"]}>
        <div className={styles["block-title"]}>글</div>
        <textarea
          className={`${styles["input"]} ${styles["input-text"]}`}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>

      {/* 비디오 링크 */}
      {new Array(videoCount).fill(null).map((_, index) => {
        const copiedVideos = [...videos];
        const videoNumber = index + 1;
        const isFirstVideo = index === 0;
        return (
          <div key={index} className={styles["block-container"]}>
            <div className={styles["block-title"]}>
              {isFirstVideo ? (
                <>
                  <a
                    href={`https://www.youtube.com/results?search_query=${artist} ${searchKeyword} MV 자막`}
                    target="_blank"
                  >
                    <div>{`영상 제목 ${videoNumber}`}</div>
                  </a>
                  <div className={styles["video-button-container"]}>
                    <div
                      className={styles["video-button"]}
                      onClick={() => {
                        setVideoCount((prev) => prev + 1);
                        setVideos([...videos, { title: "", url: "" }]);
                      }}
                    >
                      +
                    </div>
                  </div>
                  <div className={styles["video-button-container"]}>
                    <div
                      className={styles["video-button"]}
                      onClick={() => {
                        setVideoCount((prev) => prev - 1);
                        const copiedVideos = [...videos];
                        copiedVideos.splice(index, 1);
                        setVideos(copiedVideos);
                      }}
                    >
                      −
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>{`영상 제목 ${videoNumber}`}</div>
                  <div className={styles["video-button-container"]}>
                    <div
                      className={styles["video-button"]}
                      onClick={() => {
                        setVideoCount((prev) => prev - 1);
                        const copiedVideos = [...videos];
                        copiedVideos.splice(index, 1);
                        setVideos(copiedVideos);
                      }}
                    >
                      −
                    </div>
                  </div>
                </>
              )}
            </div>
            <input
              className={`${styles["input"]} ${styles["input-link"]}`}
              value={videos[index].title}
              onChange={(e) => {
                copiedVideos[index] = { ...copiedVideos[index], title: e.target.value };
                setVideos(copiedVideos);
              }}
            />
            <div
              className={`${styles["block-title"]} ${styles["video-link-title"]}`}
            >{`영상 링크 ${videoNumber}`}</div>
            <input
              className={`${styles["input"]} ${styles["input-link"]}`}
              value={videos[index].url}
              onChange={(e) => {
                copiedVideos[index] = { ...copiedVideos[index], url: e.target.value };
                setVideos(copiedVideos);
              }}
            />
          </div>
        );
      })}

      {/* 태그 */}
      <div ref={modalRef} className={styles["block-container"]}>
        <div className={styles["block-title"]}>태그</div>
        <div className={styles["tag-list-container"]}>
          {currentTagKeys.map((key, index) => {
            return (
              <div
                className={styles["tag-item"]}
                key={index}
                onClick={() => {
                  deleteTagItem(key);
                }}
              >
                <span>{DEFAULT_TAGS[key]}</span>
                <button className={styles["tag-delete-button"]} aria-label="Delete tag">
                  ×
                </button>
              </div>
            );
          })}
          {showTagsModal && (
            <div className={styles["tag-modal-container"]}>
              <div className={styles["tag-modal"]}>
                <div className={styles["tag-item-container"]}>
                  {/* 태그 종류 출력 */}
                  {Object.keys(GROUP_TAGS).map((tagTheme, index) => {
                    const isNormalTag = tagTheme !== "모두보기";
                    return (
                      isNormalTag && (
                        <React.Fragment key={index}>
                          <div className={styles["tag-block-title"]}>{tagTheme}</div>
                          <div className={styles["tag-block-item-container"]} key={index}>
                            {/* 해당 종류의 태그 출력 */}
                            {Object.keys(GROUP_TAGS[tagTheme]).map((tag) => {
                              const isExistingTag = currentTagKeys.includes(tag);
                              return (
                                !isExistingTag && (
                                  <div
                                    className={styles["tag-item"]}
                                    key={tag}
                                    onClick={() => {
                                      addTagItem(tag);
                                    }}
                                  >
                                    {GROUP_TAGS[tagTheme][tag]}
                                    <button
                                      className={styles["tag-delete-button"]}
                                      aria-label="Add tag"
                                    >
                                      +
                                    </button>
                                  </div>
                                )
                              );
                            })}
                          </div>
                        </React.Fragment>
                      )
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          <input
            value={newTagKey}
            className={styles["tag-item-input"]}
            placeholder="태그 생성"
            onClick={() => {
              setShowTagsModal(true);
            }}
            onChange={(e) => {
              const tmp = e.target.value;
              if (tmp.startsWith("#")) {
                setNewTagKey(tmp);
              } else {
                setNewTagKey("#" + tmp);
              }
            }}
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>

      {/* 작성일 */}
      <div className={styles["block-container"]}>
        <div className={styles["block-title"]}>작성일</div>
        <DatePicker
          selected={uploadDate}
          onChange={(date) => date && setUploadDate(date)}
          dateFormat={"yyyy/MM/dd"}
          className={`${styles["date-input"]} ${styles["input"]}`}
        />
      </div>

      {/* 관리자 비밀번호 */}
      <div className={styles["block-container"]}>
        <div className={styles["block-title"]}>관리자 비밀번호</div>
        <input
          className={styles["small-input"]}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      {/* 제출 버튼 */}
      <div className={styles["submit-container"]}>
        <div className={`${styles["button"]} ${styles["submit"]}`}>제출하기</div>
      </div>
    </form>
  );
}
