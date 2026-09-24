import React, { useEffect, useState } from "react";
import Header from "../../Home/Header/Menu.jsx";
import Footer from "../../Home/Footer/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PythonMore = () => {
  const [courses, setCourses] = useState([]);
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;
  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const currentCourses = courses.slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage);

  useEffect(() => {
    axios
      .get(
        "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01",
        {
          headers: {
            TokenCybersoft: import.meta.env.VITE_CYBERSOFT_TOKEN
          }
        }
      )
      .then(res => {
        const allCourses = res.data;

        const pythonKeywords = [
          "python",
          "django",
          "flask",
          "fastapi",
          "pandas",
          "numpy",
          "machine learning",
          "deep learning",
          "data science",
          "data analyst",
          "ai engineer"
        ];

        const pythonCourses = allCourses.filter(course => {
          const courseName = course.tenKhoaHoc?.toLowerCase() || "";
          const description = course.moTa?.toLowerCase() || "";
          const category =
            course.danhMucKhoaHoc?.tenDanhMucKhoaHoc?.toLowerCase() || "";

          return pythonKeywords.some(
            keyword =>
              courseName.includes(keyword) ||
              description.includes(keyword) ||
              category.includes(keyword)
          );
        });

        if (pythonCourses.length > 0) {
          setCourses(pythonCourses);
        } else {
          const randomCourses = [...allCourses]
            .sort(() => Math.random() - 0.5)
            .slice(0, 6);

          setCourses(randomCourses);
        }
      })
      .catch(err => {
        console.log("STATUS:", err.response?.status);
        console.log("DATA:", err.response?.data);
      });
  }, []);

  return (
    <div>
      <Header />

      <h1 className="text-center my-5">
        {t("pythonCourses.title")}
      </h1>

      <div className="container mb-5 pb-5">
        <div className="row g-4">
          {currentCourses.map(course => (
            <div
              className="col-md-6 col-lg-4"
              key={course.maKhoaHoc}
            >
              <Link
                to={`/${course.biDanh}`}
                className="card text-decoration-none"
                style={{
                  height: "450px",
                  display: "block"
                }}
              >
                <img
                  src={course.hinhAnh}
                  className="card-img-top"
                  alt={course.tenKhoaHoc}
                  style={{
                    height: "250px",
                    objectFit: "cover"
                  }}
                  onError={e => {
                    e.currentTarget.src = `https://picsum.photos/seed/${course.maKhoaHoc}/500/250`;
                  }}
                />

                <div className="card-body">
                  <h5 className="card-title">
                    {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc ||
                      t("pythonCourses.python")}
                  </h5>

                  <hr />

                  <h3 className="card-title">
                    {course.tenKhoaHoc}
                  </h3>

                  <p className="card-author text-secondary mb-0">
                    {course.nguoiTao?.hoTen ||
                      t("pythonCourses.unknown")}
                  </p>
                </div>

                <div className="card-footer">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2 text-white small">
                      <i className="bi bi-clock"></i>

                      <span>
                        {course.soLopHoc
                          ? t("pythonCourses.weeks", {
                              count: course.soLopHoc
                            })
                          : t("pythonCourses.weeks", {
                              count: 12
                            })}
                      </span>
                    </div>

                    <span
                      className="fw-bold"
                      style={{
                        color: "#f5d061"
                      }}
                    >
                      {t("pythonCourses.enroll")}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {totalPages > 1 && <div className="d-flex justify-content-center gap-2 mt-5">
          {Array.from({ length: totalPages }, (_, index) => <button key={index + 1} onClick={() => setCurrentPage(index + 1)} className={`btn ${currentPage === index + 1 ? "btn-warning text-dark" : "btn-outline-warning"}`}>
            {index + 1}
          </button>)}
        </div>}
      </div>

      <Footer />
    </div>
  );
};

export default PythonMore;