import React, { useMemo } from 'react';
import { Navigation, Pagination, Scrollbar, A11y, EffectCards } from 'swiper';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Image as ImageType } from 'app/features/movies/types';
import { getBackdropUrl, getLogoUrl, getPosterUrl } from 'app/misc/imgHelpers';

interface ImageSwiperProps {
  images: ImageType[];
  type: 'backdrop' | 'poster' | 'logo';
}

const ImageSwiper: React.FC<ImageSwiperProps> = ({ images, type }) => {
  const imgs = useMemo(() => {
    if (type === 'backdrop') {
      return images.map((img) => getBackdropUrl(img.file_path, 'w1280'));
    }
    if (type === 'logo') return images.map((img) => getLogoUrl(img.file_path, 'w500'));
    if (type === 'poster') return images.map((img) => getPosterUrl(img.file_path, 'w780'));

    return [];
  }, [images, type]);

  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y, EffectCards]}
      effect="cards"
      spaceBetween={20}
      slidesPerView={3}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}>
      {imgs.map((img) => (
        <SwiperSlide key={img}>
          <Image src={img} alt={''} width={'100%'} height={100} className="rounded" layout="responsive" objectFit="cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;
