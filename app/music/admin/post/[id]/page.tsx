import { Post } from "@/app/music/components/post/Post";
import { MusicLayout } from "@/app/music/components/@common/MusicLayout";
import { Metadata } from "next";
import { PageProps } from "@/app/music/modules/types";
import { fetchPostData } from "@/app/music/modules/api";

export default async function Page({ params }: PageProps) {
  const currentId = params.id;

  try {
    const postData = await fetchPostData(currentId);

    return (
      <MusicLayout>
        <Post postData={postData} />
      </MusicLayout>
    );
  } catch (error) {
    console.error(error);
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const currentId = params.id;

  try {
    const postData = await fetchPostData(currentId);
    const { imgUrl, artist, album, text } = postData;
    const title = `${artist} - ${album}`;
    const textPreview = text.length > 30 ? text.substring(0, 30) + "..." : text;
    const currentUrl = `https://divdivdiv.com/music/post/${currentId}`;

    return {
      title: title,
      description: textPreview,
      openGraph: {
        title: title,
        images: [imgUrl],
        description: textPreview,
        url: currentUrl,
        type: "website",
        siteName: "divdivdiv",
      },
    };
  } catch (error) {
    throw new Error(`Failed to generate post metadata for post ID: ${currentId}`);
  }
}
