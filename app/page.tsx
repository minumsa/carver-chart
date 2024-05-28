import Error from "./components/@common/Error";
import { MusicLayout } from "./components/@common/MusicLayout";
import { Grid } from "./components/main/Grid";
import { fetchInitialAlbumData } from "./modules/api";

export default async function Page() {
  try {
    const { albumData, totalScrollCount } = await fetchInitialAlbumData();

    return (
      <MusicLayout>
        <Grid initialData={albumData} totalScrollCount={totalScrollCount} />
      </MusicLayout>
    );
  } catch (error) {
    return <Error error={error as Error} />;
  }
}
