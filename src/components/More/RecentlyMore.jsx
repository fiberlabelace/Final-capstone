import React from "react";
import Header from "../Home/Header/Menu.jsx";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Home/Footer/Footer";
import { useTranslation } from "react-i18next";

const RecentlyMore = () => {
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
        const coursesWithWeeks = res.data.map(course => ({
          ...course,
          randomWeeks: Math.floor(Math.random() * 13) + 4
        }));

        setCourses(coursesWithWeeks);
      })
      .catch(err => {
        console.log("STATUS:", err.response?.status);
        console.log("DATA:", err.response?.data);
      });
  }, []);

  const convertDate = date => {
    const [day, month, year] = date.split("/");
    return new Date(year, month - 1, day);
  };

  const newest = () => {
    setCourses(
      [...courses].sort(
        (a, b) => convertDate(b.ngayTao) - convertDate(a.ngayTao)
      )
    );
    setCurrentPage(1);
  };

  const oldest = () => {
    setCourses(
      [...courses].sort(
        (a, b) => convertDate(a.ngayTao) - convertDate(b.ngayTao)
      )
    );
    setCurrentPage(1);
  };


  return (
    <div>
      <Header />

      <h1 className="text-center my-5">
        {t("recentlyMore.title")}
      </h1>

      <div className="sort">
        <button onClick={newest}>
          {t("recentlyMore.newest")}
        </button>

        <button onClick={oldest}>
          {t("recentlyMore.oldest")}
        </button>
      </div>

      <div className="recent-desktop container">
        <div className="row g-4">
          {currentCourses.map(course => (
            <div className="col-md-3" key={course.maKhoaHoc}>
              <Link
                to={`/${course.biDanh}`}
                className="card mx-auto m-5 text-decoration-none"
                style={{
                  maxWidth: "500px",
                  height: "450px"
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
                      t("recentlyMore.programming")}
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
                          ? t("recentlyMore.weeks", {
                              count: course.soLopHoc
                            })
                          : t("recentlyMore.weeks", {
                              count: course.randomWeeks
                            })}
                      </span>
                    </div>

                    <p
                      className="fw-bold text-decoration-none"
                      style={{
                        color: "#f5d061"
                      }}
                    >
                      {t("recentlyMore.enroll")}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {totalPages > 1 && <div className="d-flex justify-content-center gap-2 mt-3 mb-5">
          {Array.from({ length: Math.min(totalPages, 10) }, (_, index) => <button key={index + 1} onClick={() => setCurrentPage(index + 1)} className={`btn ${currentPage === index + 1 ? "btn-warning text-dark" : "btn-outline-warning"}`}>
            {index + 1}
          </button>)}
        </div>}
      </div>

      <div className="recent-mobile container p-4 text-white">
        <div className="recent-mobile-list d-flex flex-column gap-4">
          {currentCourses.map(course => (
            <article
              className="recent-mobile-card d-flex gap-3 gap-md-4 align-items-start"
              key={course.maKhoaHoc}
            >
              <div className="recent-mobile-thumbnail position-relative flex-shrink-0">
                <img
                  src={course.hinhAnh}
                  alt={course.tenKhoaHoc}
                  className="img-fluid rounded-3"
                  onError={e => {
                    e.currentTarget.src = `https://picsum.photos/seed/${course.maKhoaHoc}/180/180`;
                  }}
                />
              </div>

              <div className="recent-mobile-content d-flex flex-column gap-2">
                <div className="tags-group d-flex flex-wrap gap-2">
                  <span className="badge badge-dark">
                    {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc ||
                      t("recentlyMore.programming")}
                  </span>

                  <span className="badge badge-outlined">
                    {course.soLopHoc
                      ? t("recentlyMore.weeks", {
                          count: course.soLopHoc
                        })
                      : t("recentlyMore.weeks", {
                          count: course.randomWeeks
                        })}
                  </span>
                </div>

                <h3 className="card-title h5 fw-bold mb-0">
                  {course.tenKhoaHoc}
                </h3>

                <p className="card-author text-secondary mb-0">
                  {course.nguoiTao?.hoTen || t("recentlyMore.unknown")}
                </p>
              </div>
            </article>
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

export default RecentlyMore;