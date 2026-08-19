import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from '../Home/Header/Menu.jsx'
import Footer from '../Home/Footer/Footer'

const categoryLanguages = {
    "ai-engineer": "Python",
    "data-ai-analyst": "Python",
    "mlops-cloud": "Python",
    "data-predict-analyst": "Python",
    "mastering-ai-engineer": "Python",
    "mastering-data-engineer": "Python",
    "machine-learning": "Python",
    "sql-power-bi-etl-python": "Python",
    "full-stack-dev": "JavaScript",
    "back-end-dev": "JavaScript",
    "front-end-dev": "JavaScript",
    "cloud-engineer": "JavaScript",
    "dev-ops": "JavaScript",
    "fullstack-web": "C# .Net Core",
    "code-architecture": "C# .Net Core",
    "bootcamp-java-back-end": "Java/Spring",
    "mobile-app-dev": "Dart/Flutter",
    "backend-golang": "Golang"
};

const Course = () => {
    const { courseName } = useParams();
    const { t } = useTranslation();
    const [course, setCourse] = useState(null);
    const [purchased, setPurchased] = useState(false);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        axios.get(
            "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01",
            {
                headers: {
                    TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MyIsIkhldEhhblN0cmluZyI6IjExLzEyLzIwMjYiLCJIZXREYW5UaW1lIjoiMTc5Njk0NzIwMDAwMCIsIm5iZiI6MTc2Nzk3ODAwMCwiZXhwIjoxNzk3MDk0ODAwfQ.nooPjcX2NT2qTi3ew-Ov-Ki_PNodbk6OGwbQ3XdIUQg",
                },
            }
        )
        .then((res) => {
            const courses = res.data;

            const foundCourse = courses.find(
                (item) => item.biDanh === courseName
            );

            if (foundCourse) {
                setCourse(foundCourse);
            } else {
                setCourse({
                    biDanh: courseName,
                    tenKhoaHoc: courseName
                        .split("-")
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" "),
                    hinhAnh: `https://picsum.photos/seed/${courseName}/800/500`,
                    moTa: t("course.noDescription"),
                    luotXem: 0,
                    soLuongHocVien: 0
                });
            }
        })
        .catch((err) => {
            console.log("STATUS:", err.response?.status);
            console.log("DATA:", err.response?.data);
        });
    }, [courseName, t]);

    useEffect(() => {
        if (!course) {
            return;
        }

        const prices = JSON.parse(localStorage.getItem("coursePrices")) || {};

        let coursePrice = prices[course.biDanh];

        if (!coursePrice) {
            coursePrice = Math.floor(Math.random() * 81) + 20;
            prices[course.biDanh] = coursePrice;

            localStorage.setItem(
                "coursePrices",
                JSON.stringify(prices)
            );
        }

        setPrice(coursePrice);

        const checkCourseStatus = () => {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const registeredCourses = JSON.parse(localStorage.getItem("registeredCourses")) || [];

            const alreadyInCart = cart.some(
                (item) => item.biDanh === course.biDanh
            );

            const alreadyRegistered = registeredCourses.some(
                (item) => item.biDanh === course.biDanh
            );

            setPurchased(alreadyInCart || alreadyRegistered);
        };

        checkCourseStatus();

        window.addEventListener("cartUpdated", checkCourseStatus);
        window.addEventListener("registeredUpdated", checkCourseStatus);

        return () => {
            window.removeEventListener("cartUpdated", checkCourseStatus);
            window.removeEventListener("registeredUpdated", checkCourseStatus);
        };
    }, [course]);

    const purchaseCourse = () => {
        if (!course || purchased) {
            return;
        }

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const registeredCourses = JSON.parse(localStorage.getItem("registeredCourses")) || [];

        const alreadyInCart = cart.some(
            (item) => item.biDanh === course.biDanh
        );

        const alreadyRegistered = registeredCourses.some(
            (item) => item.biDanh === course.biDanh
        );

        if (alreadyInCart || alreadyRegistered) {
            setPurchased(true);
            return;
        }

        const courseWithPrice = {
            ...course,
            price: price
        };

        const updatedCart = [...cart, courseWithPrice];

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );

        setPurchased(true);

        window.dispatchEvent(
            new Event("cartUpdated")
        );
    };

    if (!course) {
        return (
            <div>
                <Header />

                <div className="container my-5 text-center">
                    <h2>{t("common.loading")}</h2>
                </div>

                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header />

            <div className="course-page container my-5">
                <div className="row g-5 align-items-center">

                    <div className="col-lg-6">
                        <img
                            src={course.hinhAnh}
                            className="course-image img-fluid rounded-4"
                            alt={course.tenKhoaHoc}
                            onError={(e) => {
                                e.currentTarget.src =
                                    `https://picsum.photos/seed/${course.biDanh}/800/500`;
                            }}
                        />
                    </div>

                    <div className="col-lg-6">

                        <span className="course-category">
                            {categoryLanguages[courseName] ||
                                course.danhMucKhoaHoc?.tenDanhMucKhoaHoc ||
                                t("course.programming")}
                        </span>

                        <h1 className="course-title mt-3">
                            {course.tenKhoaHoc}
                        </h1>

                        <p className="course-description mt-4">
                            {course.moTa?.replace(/<[^>]*>/g, "") ||
                                t("course.noDescription")}
                        </p>

                        <div className="course-info d-flex flex-wrap gap-4 mt-4">

                            <div>
                                <i className="bi bi-eye me-2"></i>
                                {course.luotXem || 0} {t("course.views")}
                            </div>

                            <div>
                                <i className="bi bi-people me-2"></i>
                                {course.soLuongHocVien || 0} {t("course.students")}
                            </div>

                            <div>
                                <i className="bi bi-calendar3 me-2"></i>
                                {course.ngayTao || t("course.recently")}
                            </div>

                        </div>

                        <div className="course-instructor mt-4">
                            <small>{t("course.instructor")}</small>

                            <h5>
                                {course.nguoiTao?.hoTen || t("course.unknown")}
                            </h5>
                        </div>

                        <button
                            className={`course-purchase-btn mt-4 ${purchased ? "purchased" : ""}`}
                            onClick={purchaseCourse}
                            disabled={purchased}
                        >
                            <i
                                className={`bi ${purchased ? "bi-check-lg" : "bi-cart-plus"} me-2`}
                            ></i>

                            {purchased
                                ? t("course.alreadyPurchased")
                                : `${t("course.purchaseCourse")} - $ ${price}`}
                        </button>

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Course