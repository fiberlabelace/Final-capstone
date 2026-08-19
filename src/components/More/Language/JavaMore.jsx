import React, { useEffect, useState } from "react";
import Header from "../../Home/Header/Menu.jsx";
import Footer from "../../Home/Footer/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const JavaMore = () => {
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
            const allCourses = res.data;

            const javaKeywords = [
                "java",
                "spring",
                "spring boot",
                "java backend",
                "java back-end",
                "java web",
            ];

            const javaCourses = allCourses.filter((course) => {
                const courseName = course.tenKhoaHoc?.toLowerCase() || "";
                const description = course.moTa?.toLowerCase() || "";
                const category = course.danhMucKhoaHoc?.tenDanhMucKhoaHoc?.toLowerCase() || "";

                return javaKeywords.some((keyword) =>
                    courseName.includes(keyword) ||
                    description.includes(keyword) ||
                    category.includes(keyword)
                );
            });

            if (javaCourses.length > 0) {
                setCourses(javaCourses);
            } else {
                const randomCourses = [...allCourses]
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 6);

                setCourses(randomCourses);
            }
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
                {t("javaCourses.title")}
            </h1>

            <div className="container mb-5 pb-5">
                <div className="row g-4">
                    {courses.map((course) => (
                        <div className="col-md-6 col-lg-4" key={course.maKhoaHoc}>
                            <Link
                                to={`/${course.biDanh}`}
                                className="card h-100 text-decoration-none"
                            >
                                <img
                                    src={course.hinhAnh}
                                    className="card-img-top"
                                    alt={course.tenKhoaHoc}
                                    onError={(e) => {
                                        e.currentTarget.src = `https://picsum.photos/seed/${course.maKhoaHoc}/500/300`;
                                    }}
                                />

                                <div className="card-body">
                                    <h5 className="card-title">
                                        {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc || t("javaCourses.java")}
                                    </h5>

                                    <hr />

                                    <h3 className="card-title">
                                        {course.tenKhoaHoc}
                                    </h3>

                                    <p className="card-author text-secondary mb-0">
                                        {course.nguoiTao?.hoTen || t("javaCourses.unknown")}
                                    </p>
                                </div>

                                <div className="card-footer">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center gap-2 text-white small">
                                            <i className="bi bi-clock"></i>

                                            <span>
                                                {course.soLopHoc
                                                    ? t("javaCourses.weeks", { count: course.soLopHoc })
                                                    : t("javaCourses.weeks", { count: 12 })}
                                            </span>
                                        </div>

                                        <span
                                            className="fw-bold"
                                            style={{ color: "#f5d061" }}
                                        >
                                            {t("javaCourses.enroll")}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default JavaMore;