export type SwiperInstance = {
  realIndex?: number;
  activeIndex?: number;
  slideTo?: (index: number) => void;
  destroy?: (deleteInstance?: boolean, cleanStyles?: boolean) => void;
  autoplay?: {
    start?: () => void;
    stop?: () => void;
  };
  on?: (event: string, callback: () => void) => void;
};

declare global {
  interface Window {
    Swiper?: new (
      element: string | Element | HTMLElement,
      options?: Record<string, unknown>
    ) => SwiperInstance;
  }
}

export {};
