import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Recently() {
    const prev1 = useRef(null);
    const next1 = useRef(null);
    const [courses, setCourses] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        axios.get(
            "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01",
            {
                headers: {
                    TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MyIsIkhldEhhblN0cmluZyI6IjExLzEyLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc5Njk0NzIwMDAwMCIsIm5iZiI6MTc2Nzk3ODAwMCwiZXhwIjoxNzk3MDk0ODAwfQ.nooPjcX2NT2qTi3ew-Ov-Ki_PNodbk6OGwbQ3XdIUQg",
                },
            }
        )
        .then((res) => {
            setCourses(res.data);
        })
        .catch((err) => {
            console.log("STATUS:", err.response?.status);
            console.log("DATA:", err.response?.data);
        });
    }, []);

    return (
        <div className="container">
            <div className="d-flex justify-content-between">
                <h1 className="pb-3">{t("recently.title")}</h1>

                <div>
                    <button ref={prev1} className="btn btn-outline-dark me-2 prev1">
                        ←
                    </button>

                    <button ref={next1} className="btn btn-outline-dark next1">
                        →
                    </button>
                </div>
            </div>

            <Swiper
                modules={[Navigation]}
                navigation={{ prevEl: ".prev1", nextEl: ".next1" }}
                spaceBetween={50}
                slidesPerView={5}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    576: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    992: {
                        slidesPerView: 5,
                        spaceBetween: 50
                    }
                }}
            >
                {courses.map((course) => (
                    <SwiperSlide key={course.maKhoaHoc}>
                        <Link
                            to={`/${course.biDanh}`}
                            className="mx-auto m-5 text-decoration-none"
                            style={{ maxWidth: "500px" }}
                        >
                            <div className="card">
                                <img
                                    src={course.hinhAnh}
                                    className="card-img-top"
                                    alt={course.tenKhoaHoc}
                                    onError={(e) => {
                                        e.currentTarget.src = "https://picsum.photos/180/400";
                                    }}
                                />

                                <div className="card-body">
                                    <h5 className="card-title">
                                        {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc || t("recently.programming")}
                                    </h5>

                                    <hr />

                                    <h3 className="card-title">
                                        {course.tenKhoaHoc}
                                    </h3>
                                </div>

                                <div className="card-footer">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center gap-2 text-white small">
                                            <i className="bi bi-clock"></i>

                                            <span>
                                                {course.soLopHoc
                                                    ? t("recently.weeks", { count: course.soLopHoc })
                                                    : t("recently.weeks", { count: Math.floor(Math.random() * 13) + 4 })}
                                            </span>
                                        </div>

                                        <Link
                                            to={`/detail/${course.maKhoaHoc}`}
                                            className="fw-bold text-decoration-none"
                                            style={{ color: "#f5d061" }}
                                        >
                                            {t("recently.enroll")}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="d-flex justify-content-end">
                <Link to="/recently" className="btn d-flex justify-content-end">
                    {t("recently.viewMore")}
                </Link>
            </div>
        </div>
    );
}

export default Recently;