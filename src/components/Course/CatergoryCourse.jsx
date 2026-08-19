import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../Home/Header/Menu.jsx'
import Footer from '../Home/Footer/Footer'
import axios from "axios"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

const categoryNames = {
    "code-language": "codeLanguage",
    "web-program": "webProgram",
    "tester": "tester",
    "mobile-dev": "mobileDev",
    "data-analyst": "dataAnalyst",
    "ai-engineer": "aiEngineer",
    "devops": "devops",
    "data-science": "dataScience",
    "ai-work": "aiWork",
    "ai-office": "aiOffice"
}

const categoryKeywords = {
    "code-language": ["programming", "code", "language"],
    "web-program": ["web", "frontend", "backend", "fullstack"],
    "tester": ["test", "testing", "tester", "qa"],
    "mobile-dev": ["mobile", "android", "ios", "flutter"],
    "data-analyst": ["data analyst", "data analysis", "power bi"],
    "ai-engineer": ["ai", "artificial intelligence", "machine learning", "deep learning"],
    "devops": ["devops", "dev ops", "cloud"],
    "data-science": ["data science", "machine learning", "statistics"],
    "ai-work": ["ai", "artificial intelligence"],
    "ai-office": ["ai office", "office", "productivity"]
}

const CategoryCourse =()=> {
    const { categoryName } = useParams()
    const [courses, setCourses] = useState([])
    const { t } = useTranslation()
    const name = t(`categories.${categoryNames[categoryName] || categoryName}`)

    useEffect(() => {
        axios.get(
            "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01",
            {
                headers: {
                    TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MyIsIkhldEhhblN0cmluZyI6IjExLzEyLzIwMjYiLCJIZXRFYW5UaW1lIjoiMTc5Njk0NzIwMDAwMCIsIm5iZiI6MTc2Nzk3ODAwMCwiZXhwIjoxNzk3MDk0ODAwfQ.nooPjcX2NT2qTi3ew-Ov-Ki_PNodbk6OGwbQ3XdIUQg",
                },
            }
        )
        .then((res) => {
            const allCourses = res.data
            const keywords = categoryKeywords[categoryName] || []
            const filteredCourses = allCourses.filter((course) => {
                const courseName = course.tenKhoaHoc?.toLowerCase() || ""
                const description = course.moTa?.toLowerCase() || ""
                const category = course.danhMucKhoaHoc?.tenDanhMucKhoaHoc?.toLowerCase() || ""
                return keywords.some((keyword) =>
                    courseName.includes(keyword) ||
                    description.includes(keyword) ||
                    category.includes(keyword)
                )
            })

            if(filteredCourses.length > 0) {
                setCourses(filteredCourses.slice(0, 6))
            }
            else{
                const randomCourses = [...allCourses]
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 6)
                setCourses(randomCourses)
            }
        })
        .catch((err) => {
            console.log("STATUS:", err.response?.status)
            console.log("DATA:", err.response?.data)
        })
    }, [categoryName])

    return (
        <div>
            <Header />
            <h1 className="text-center my-5">
                {t("categoryCourse.courseAbout", { name })}
            </h1>
            <div className="category-course container">
                <div className="row g-4">
                    {courses.map((course) => (
                        <div className="col-md-6 col-lg-4" key={course.maKhoaHoc}>
                            <Link to={`/${course.biDanh}`} className="text-decoration-none">
                                <div className="card h-100">
                                    <img src={course.hinhAnh} className="card-img-top" alt={course.tenKhoaHoc}
                                        onError={(e) => {
                                            e.currentTarget.src = `https://picsum.photos/seed/${course.maKhoaHoc}/500/300`
                                        }}/>
                                    <div className="card-body">
                                        <h5 className="card-title"> {course.tenKhoaHoc}</h5>
                                        <p className="card-text">
                                            {course.moTa ?.replace(/<[^>]*>/g, "").slice(0, 120) || t("categoryCourse.noDescription")}
                                        </p>
                                    </div>
                                    <div className="card-footer">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <small>
                                                <i className="bi bi-clock me-2"></i>
                                                {course.soLopHoc ? `${course.soLopHoc} ${t("categoryCourse.weeks")}`
                                                    :`${Math.floor(Math.random() * 13) + 4} ${t("categoryCourse.weeks")}`
                                                }
                                            </small>
                                            <span className="fw-bold" style={{ color: "#f5d061" }}>
                                                {t("categoryCourse.enroll")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CategoryCourse