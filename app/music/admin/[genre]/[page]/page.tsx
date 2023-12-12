"use client";

import { usePathname } from "next/navigation";
import { PageProps } from "@/app/music/modules/data";
import { MusicLayout } from "@/app/music/components/MusicLayout";
import Content from "@/app/music/components/Content";

export default function Page({ params }: PageProps) {
  const currentGenre = params.genre;
  const currentPage = Number(params.page);
  const fullPathName = usePathname();

  return (
    <MusicLayout>
      <Content pathName={currentGenre} fullPathName={fullPathName} currentPage={currentPage} />
    </MusicLayout>
  );
}
