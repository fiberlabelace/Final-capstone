import React from "react";
import Header from "../Home/Header/Menu.jsx";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Home/Footer/Footer";
import { useTranslation } from "react-i18next";

const TopMore = () => {
    const [courses, setCourses] = useState([]);
    const { t } = useTranslation();
    useEffect(() => {
        axios.get(
            "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01",
            {
                headers: {
                    TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MyIsIkhldEhhblN0cmluZyI6IjExLzEyLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc5Njk0NzIwMDAwMCIsIm5iZiI6MTc2Nzk3ODAwMCwiZXhwIjoxNzk3MDk0ODAwfQ.nooPjcX2NTq2Ti3ew-Ov-Ki_PNodbk6OGwbQ3XdIUQg",
                },
            }
        )
        .then((res) => {
            setCourses(res.data.slice(0, 10));
        })
        .catch((err) => {
            console.log("STATUS:", err.response?.status);
            console.log("DATA:", err.response?.data);
        });
    }, []);
    return (
        <div>
            <Header />
            <h1 className="text-center my-5">
                {t("topMore.title")}
            </h1>
            <div className="top-desktop container">
                <div className="row g-4">
                    {courses.map((course, index) => (
                        <div className="col-md-6" key={course.maKhoaHoc}>
                            <Link to={`/${course.biDanh}`} className="text-decoration-none">
                                <div className="card mx-auto m-5" style={{ maxWidth: "500px" }}>
                                    <div className="rank-number">
                                        {index + 1}
                                    </div>
                                    <img src={course.hinhAnh} className="card-img-top" alt={course.tenKhoaHoc}
                                        onError={(e) => {
                                            e.currentTarget.src = `https://picsum.photos/seed/${course.maKhoaHoc}/180/400`;
                                        }}/>
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc || t("topMore.programming")}
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
                                                        ? t("topMore.weeks", { count: course.soLopHoc })
                                                        : t("topMore.weeks", { count: Math.floor(Math.random() * 13) + 4 })}
                                                </span>
                                            </div>
                                            <p className="fw-bold text-decoration-none" style={{ color: "#f5d061" }}>
                                                {t("topMore.enroll")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className="top-mobile container p-4 text-white">
                <div className="top-mobile-list d-flex flex-column gap-4">
                    {courses.map((course, index) => (
                        <article className="top-mobile-card d-flex gap-3 gap-md-4 align-items-start" key={course.maKhoaHoc}>
                            <div className="top-mobile-rank">
                                {index + 1}
                            </div>
                            <div className="top-mobile-thumbnail position-relative flex-shrink-0">
                                <img src={course.hinhAnh} alt={course.tenKhoaHoc} className="img-fluid rounded-3"
                                    onError={(e) => {
                                        e.currentTarget.src = `https://picsum.photos/seed/${course.maKhoaHoc}/180/180`;
                                    }}/>
                            </div>
                            <div className="top-mobile-content d-flex flex-column gap-2">
                                <div className="tags-group d-flex flex-wrap gap-2">
                                    <span className="badge badge-dark">
                                        {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc || t("topMore.programming")}
                                    </span>
                                    <span className="badge badge-outlined">
                                        {course.soLopHoc
                                            ? t("topMore.weeks", { count: course.soLopHoc })
                                            : t("topMore.weeks", { count: Math.floor(Math.random() * 13) + 4 })}
                                    </span>
                                </div>
                                <h3 className="card-title h5 fw-bold mb-0">
                                    {course.tenKhoaHoc}
                                </h3>
                                <p className="card-author text-secondary mb-0">
                                    {course.nguoiTao?.hoTen || t("topMore.unknown")}
                                </p>
                                <Link to={`/detail/${course.maKhoaHoc}`} className="fw-bold text-decoration-none" style={{ color: "#f5d061" }}>
                                    {t("topMore.enroll")}
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TopMore;