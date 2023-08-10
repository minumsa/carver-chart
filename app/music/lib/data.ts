// FIXME: api는 다른 파일로 따로 빼기

export interface ContentsType {
  "": string;
  pop: string;
  "k-pop": string;
  "j-pop": string;
  rock: string;
  alternative: string;
  disco: string;
  electronic: string;
  jazz: string;
  soul: string;
  folk: string;
  country: string;
  classical: string;
  soundtrack: string;
  [key: string]: string;
}

export const contents: ContentsType = {
  "": "divdivdiv",
  pop: "팝",
  "k-pop": "케이팝",
  "j-pop": "제이팝",
  rock: "락",
  alternative: "얼터너티브",
  disco: "디스코",
  electronic: "일렉트로닉",
  jazz: "재즈",
  soul: "알앤비/소울",
  folk: "포크",
  country: "컨트리",
  classical: "클래식",
  soundtrack: "사운드트랙",
};

export interface AlbumInfo {
  id: string;
  imgUrl: string;
  artist: string;
  album: string;
  label: string;
  releaseDate: string;
  genre: string;
  link: string;
  text: string;
  uploadDate: string;
  duration: number;
  tracks: number;
}

export interface PageProps {
  params: {
    genre: string;
  };
}

export interface UpdateInfo {
  albumId: string;
  genre: string;
  link: string;
  text: string;
}

export type MethodType = "작성일" | "발매일";
export type CriteriaType = "오름차순" | "내림차순";

export const album = {
  width: 300,
  height: 300,
  mobile: {
    width: 250,
    height: 250,
  },
};

export const activeStyle = {
  color: "#949494",
  // textDecoration: "underline",
  // fontWeight: "500",
};

export async function fetchData(pathName: string) {
  try {
    const response = await fetch("/api/music", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to upload music data");
    }

    let data = await response.json();

    if (pathName === "admin") pathName = "";
    if (pathName.includes("admin")) pathName = pathName.split("admin/").join("");
    if (pathName.length > 20) {
      data = data.filter((item: { id: string }) => item.id === pathName)[0];
    } else if (pathName !== "") {
      data = data.filter((item: { genre: string }) => item.genre === pathName);
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function uploadData(albumData: AlbumInfo, password: string) {
  if (albumData !== null) {
    try {
      const response = await fetch("/api/music", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: albumData,
          password: password,
        }),
      });

      if (response.status === 401) {
        alert("관리자 비밀번호가 틀렸습니다.");
      } else if (response.status === 409) {
        alert("이미 존재하는 데이터입니다.");
      } else if (!response.ok) {
        throw new Error("데이터 업로드에 실패했습니다.");
      } else {
        alert("데이터가 성공적으로 저장되었습니다.");
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error: ", error);
    }
  }
}

export const updateData = async (id: string, data: Partial<AlbumInfo>, password: string) => {
  if (data !== null) {
    try {
      const response = await fetch("/api/music", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ albumId: id, data: data, password: password }),
      });

      if (response.status === 401) {
        alert("관리자 비밀번호가 틀렸습니다.");
      } else if (response.status === 404) {
        alert("존재하지 않는 앨범입니다.");
      } else if (!response.ok) {
        throw new Error("데이터 수정에 실패했습니다.");
      } else {
        alert("데이터가 성공적으로 수정되었습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  }
};

const fetchSpotifyAccessToken = async () => {
  try {
    const url = "https://accounts.spotify.com/api/token";
    const clientId = "9ba8de463724427689b855dfcabca1b1";
    const clientSecret = "7cfb4b90f97a4b1a8f02f2fe6d2d42bc";
    const basicToken = btoa(`${clientId}:${clientSecret}`);
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basicToken}`,
    };
    const data = "grant_type=client_credentials";

    const accessTokenResponse = await fetch(url, {
      method: "POST",
      headers,
      body: data,
    });

    if (!accessTokenResponse.ok) {
      console.error("Error: Access token fetch failed");
    }

    const accessTokenData = await accessTokenResponse.json();
    return accessTokenData.access_token;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchSpotify = async ({ albumId, genre, link, text }: UpdateInfo) => {
  if (!albumId || !genre || !link || !text) {
    alert("모든 항목을 채워주세요.");
    return;
  }

  const item = {
    albumId: albumId,
    genre: genre,
    link: link,
    text: text,
    uploadDate: Date(),
  };

  try {
    const accessToken = await fetchSpotifyAccessToken();
    if (!accessToken) {
      // throw new Error("Access token is not available");
      console.error("Error: Access token is not available");
    }

    const url = `https://api.spotify.com/v1/albums/${item.albumId}`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const dataResponse = await fetch(url, { headers });

    if (!dataResponse.ok) {
      // throw new Error("music fetch failed");
      console.error("Error: music fetch failed");
    }

    const data = await dataResponse.json();

    const fetchedData: AlbumInfo = {
      id: data.id,
      imgUrl: data.images[0].url,
      artist: data.artists[0].name,
      album: data.name,
      label: data.label,
      releaseDate: data.release_date,
      text: item.text,
      genre: item.genre,
      link: item.link,
      uploadDate: item.uploadDate,
      tracks: data.tracks.items.length,
      duration: Math.floor(
        data.tracks.items
          .map((data: any) => data.duration_ms)
          .reduce((a: number, b: number) => a + b) / 1000
      ),
    };

    return fetchedData;
  } catch (error) {
    console.error(error);
  }
};

export const deleteData = async (id: string) => {
  const userPassword = prompt("관리자 비밀번호를 입력해주세요.");

  try {
    const response = await fetch("/api/music", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, password: userPassword }),
    });

    if (response.status === 401) {
      alert("관리자 비밀번호가 틀렸습니다.");
    } else if (response.status === 404) {
      alert("존재하지 않는 앨범입니다.");
    } else if (!response.ok) {
      throw new Error("Failed to upload music data");
    } else {
      alert("데이터가 성공적으로 삭제되었습니다.");
    }
  } catch (error) {
    console.error(error);
  }
};

export const filteredPathName = (pathName: string) => {
  const lowercasedPathName = pathName.toLowerCase();

  // TODO: break가 있고 없고의 차이는?
  switch (lowercasedPathName) {
    case "all":
      return "";
    default:
      return lowercasedPathName;
  }
};

export const sortItems = {
  method: {
    ko: ["작성일", "발매일", "아티스트", "앨범"],
    en: ["UPLOAD", "RELEASE", "ARTIST", "ALBUM"],
  },
  criteria: {
    ko: ["오름차순", "내림차순"],
    en: ["ASC", "DESC"],
  },
};
