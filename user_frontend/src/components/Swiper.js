import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const AddSwiper = () => {
    return (
        <div style={{ backgroundColor: '#F5FFFA', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Swiper
                modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y, ]}
                spaceBetween={50}
                slidesPerView={1}
                navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next'
                }}
                pagination={{ clickable: true }}
                autoplay={{ 
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                }}
                loop
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
                }}
            >
                {/* #87CEFA */}
                {/* #87CEFA */}
                {/* #FFB6C1 */}
                {/* #FFB6C1 */}
                <div className="swiper-button-prev" style={{ color: 'black', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', userSelect: 'none' }} />
                <div className="swiper-button-next" style={{ color: 'black', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', userSelect: 'none' }} />
                <SwiperSlide>
                    <img src={require("../sleep.jpg")} alt="Image1" style={{ height: 700, width: '100%', userSelect: 'none' }} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={require("../donations.jpg")} alt="Image1" style={{ height: 700, width: '100%', userSelect: 'none' }} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={require("../live.jpg")} alt="Image1" style={{ height: 700, width: '100%', userSelect: 'none' }} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={require("../rest.jpg")} alt="Image1" style={{ height: 700, width: '100%', userSelect: 'none' }} /> 
                </SwiperSlide>
            </Swiper>
        </div>
  );
};

export default AddSwiper