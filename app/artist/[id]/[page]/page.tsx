import ArtistContent from "../../../components/artist/ArtistContent";
import { MusicLayout } from "@/app/components/@common/MusicLayout";
import { fetchArtistData } from "@/app/modules/api";
import { SITE_TITLE } from "@/app/modules/constants";
import { PageProps } from "@/app/modules/types";
import { Metadata } from "next";

export default async function Page({ params }: PageProps) {
  const artistId = params.id;
  const currentPage = params.page;

  try {
    const { artistData, artistDataCount } = await fetchArtistData(artistId, currentPage);

    return (
      <MusicLayout>
        <ArtistContent
          artistData={artistData}
          artistDataCount={artistDataCount}
          currentPage={currentPage}
        />
      </MusicLayout>
    );
  } catch (error) {
    console.error(error);
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const artistId = params.id;
  const currentPage = params.page;

  try {
    const { artistData } = await fetchArtistData(artistId, currentPage);
    const firstArtistData = artistData[0];

    if (!firstArtistData) {
      throw new Error("No artist data found");
    }

    const { artistImgUrl, artist, text } = firstArtistData;
    const title = artist;
    const currentUrl = `https://music.divdivdiv.com/artist/${artistId}/1`;
    const textPreview = text.length > 30 ? text.substring(0, 30) + "..." : text;

    return {
      title: title,
      description: textPreview,
      openGraph: {
        title: title,
        images: [artistImgUrl],
        url: currentUrl,
        type: "website",
        siteName: SITE_TITLE,
        description: textPreview,
      },
    };
  } catch (error) {
    throw new Error(`Failed to generate artist metadata for artist ID: ${artistId}`);
  }
}