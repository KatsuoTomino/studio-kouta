export type Artwork = {
  id: string;
  titleJa: string;
  titleEn: string;
  date: string;
  commentJa: string;
  commentEn: string;
  imageUrl: string;
  imageKey?: string;
  width: number;
  height: number;
};

export type DisplayArtwork = {
  id: string;
  title: string;
  comment: string;
  date: string;
  imageUrl: string;
  imageKey?: string;
  width: number;
  height: number;
};
