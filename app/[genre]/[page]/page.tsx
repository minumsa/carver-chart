import Error from "@/app/components/@common/Error";
import Content from "../../components/@common/Content";
import { MusicLayout } from "../../components/@common/MusicLayout";
import { fetchGenreData } from "../../modules/api";
import { PageProps } from "../../modules/types";

export default async function Page({ params }: PageProps): Promise<React.ReactElement> {
  const currentGenre = params.genre;
  const currentPage = params.page;

  try {
    const { genreData, genreDataCount } = await fetchGenreData(currentGenre, currentPage);

    return (
      <MusicLayout>
        <Content data={genreData} dataCount={genreDataCount} currentPage={currentPage} />
      </MusicLayout>
    );
  } catch (error) {
    return <Error error={error as Error} />;
  }
}
