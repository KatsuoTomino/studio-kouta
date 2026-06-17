export type HeroSlide = {
  id: string;
  alt: string;
  imageUrl: string;
};

export type HeroSlideRecord = HeroSlide & {
  imageKey: string;
  sortOrder: number;
};
