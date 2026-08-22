import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../Home/Header/Menu.jsx";
import Footer from "../Home/Footer/Footer";
import { useTranslation } from "react-i18next";

const Search = () => {
    const {t} = useTranslation();
    const normalizeText = (text) => {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s]/g, "")
            .replace(/\s+/g, "")
            .trim();
    };
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";
    const [courses, setCourses] = useState([]);
    const [relatedCourses, setRelatedCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadCourses = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01",
                    {
                        headers: {
                            TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MyIsIkhldEhhblN0cmluZyI6IjExLzEyLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc5Njk0NzIwMDAwMCIsIm5iZiI6MTc2Nzk3ODAwMCwiZXhwIjoxNzk3MDk0ODAwfQ.nooPjcX2NT2qTi3ew-Ov-Ki_PNodbk6OGwbQ3XdIUQg"
                        }
                    }
                );
                const allCourses = res.data || [];
                const searchText = normalizeText(query);
                const filteredCourses = allCourses.filter((course) => {
                    const courseName = normalizeText(course.tenKhoaHoc || "");
                    const description = normalizeText(
                        course.moTa?.replace(/<[^>]*>/g, "") || ""
                    );
                    const category = normalizeText(
                        course.danhMucKhoaHoc?.tenDanhMucKhoaHoc || ""
                    );
                    return (
                        courseName.includes(searchText) ||
                        description.includes(searchText) ||
                        category.includes(searchText)
                    );
                });
                const randomCourses = [...allCourses]
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 6);
                setRelatedCourses(randomCourses);
                if (!searchText) {
                    setCourses([]);
                    return;
                }
                setCourses(filteredCourses);
            }
            catch (err) {
                console.log("STATUS:", err.response?.status);
                console.log("DATA:", err.response?.data);
                setCourses([]);
                setRelatedCourses([]);
            }
            finally {
                setLoading(false);
            }
        };
        loadCourses();
    }, [query]);
    return (
        <div>
            <Header />
            <div className="container my-5">
                {loading ? (
                    <div className="text-center py-5">
                        <h3>{t("search.loading")}</h3>
                    </div>
                ) : query.trim() && courses.length > 0 ? (
                    <>
                        <h1 className="mb-4">
                            {t("search.resultsFor", { query })}
                        </h1>
                        <h3 className="mb-4">
                            {t("search.coursesFound", {
                                count: courses.length
                            })}
                        </h3>
                        <div className="row g-4">
                            {courses.map((course) => (
                                <div className="col-md-6 col-lg-4" key={course.maKhoaHoc}>
                                    <Link to={`/${course.biDanh}`} className="text-decoration-none">
                                        <div className="card h-100">
                                            <img src={course.hinhAnh} className="card-img-top" alt={course.tenKhoaHoc}
                                                onError={(e) => {
                                                    e.currentTarget.src = `https://picsum.photos/seed/${course.biDanh}/500/300`;
                                                }}/>
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    {course.tenKhoaHoc}
                                                </h5>
                                                <p className="card-text">
                                                    {course.moTa
                                                        ?.replace(/<[^>]*>/g, "")
                                                        .slice(0, 120) ||
                                                        t("course.noDescription")}
                                                </p>
                                            </div>
                                            <div className="card-footer">
                                                <span className="fw-bold" style={{color: "#f5d061"}}>
                                                    {t("search.enroll")}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        {query.trim() && (
                            <div className="text-center py-5">
                                <i className="bi bi-search" style={{fontSize: "60px", color: "#FFC400"}}></i>
                                <h2 className="mt-4">
                                    {t("search.noCoursesFound")}
                                </h2>
                                <p className="text-secondary">
                                    {t("search.noCoursesMatching",{query})}
                                </p>
                            </div>
                        )}
                        {!query.trim() && (
                            <h1 className="text-center mb-5">
                                {t("search.interestedCourses")}
                            </h1>
                        )}
                        {relatedCourses.length > 0 && (
                            <>
                                {query.trim() && (
                                    <h2 className="text-center mb-4">
                                        {t("search.relatedCourses")}
                                    </h2>
                                )}
                                <div className="row g-4">
                                    {relatedCourses.map((course) => (
                                        <div className="col-md-6 col-lg-4"  key={course.maKhoaHoc}>
                                            <Link to={`/${course.biDanh}`} className="text-decoration-none">
                                                <div className="card h-100">
                                                    <img src={course.hinhAnh} className="card-img-top" alt={course.tenKhoaHoc}
                                                        onError={(e) => {
                                                            e.currentTarget.src = `https://picsum.photos/seed/${course.biDanh}/500/300`;
                                                        }}/>
                                                    <div className="card-body">
                                                        <h5 className="card-title">
                                                            {course.tenKhoaHoc}
                                                        </h5>
                                                        <p className="card-text">
                                                            {course.moTa
                                                                ?.replace(/<[^>]*>/g, "")
                                                                .slice(0, 120) ||
                                                                t("course.noDescription")}
                                                        </p>
                                                    </div>
                                                    <div className="card-footer">
                                                        <span className="fw-bold" style={{color: "#f5d061"}}>
                                                            {t("search.enroll")}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Search;