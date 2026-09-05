'use client'
// Import Swiper React components
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type SliderType = {
    spaceBetween: number,
    slidesPerView: number,
    pageList: string[]
}
export default function Slider({ spaceBetween, slidesPerView, pageList }: SliderType) {
    return (
        <Swiper modules={[Navigation, Pagination]} navigation
            pagination={{ clickable: true }}
            loop={true}
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {pageList.map((src) => (
                <SwiperSlide key={src}>
                    <Image src={src} className='w-full h-80' alt="ghg" width={400} height={400} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};