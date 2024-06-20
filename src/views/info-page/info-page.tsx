import { FC } from "react";
import { Header } from "../../layout/header";

import styles from "./styles.module.scss";
import ImageUploader from "../../components/image-uploader";
import { Editable } from "../../components/editable";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
export const InfoPage: FC<any> = ({ tabs, role }) => {
    return (
        <div className={styles.info}>
            <div className={styles.info_wrapper}>
                <Header tabs={tabs} />
                <div className={styles.info_content}>
                    <div className={styles.info_head}>
                        <ImageUploader className={styles.info_image} />
                        <Editable
                            initialValue="Fox Night"
                            type="text"
                            editable={role === "hr"}
                            className={styles.info_title}
                        />
                    </div>
                    <div className={styles.info_slider}>
                        <Swiper
                            modules={[FreeMode]}
                            slidesPerView={"auto"}
                            spaceBetween={20}
                            className={styles.info_swiper}
                            freeMode={{
                                enabled: true,
                            }}
                        >
                            <SwiperSlide className={styles.info_item}>
                                <ImageUploader className={styles.info_slide} />
                            </SwiperSlide>
                            <SwiperSlide className={styles.info_item}>
                                <ImageUploader className={styles.info_slide} />
                            </SwiperSlide>
                            <SwiperSlide className={styles.info_item}>
                                <ImageUploader className={styles.info_slide} />
                            </SwiperSlide>
                            <SwiperSlide className={styles.info_item}>
                                <ImageUploader className={styles.info_slide} />
                            </SwiperSlide>
                            <SwiperSlide className={styles.info_item}>
                                <ImageUploader className={styles.info_slide} />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};
