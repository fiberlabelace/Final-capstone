import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Other() {
  const [courses, setCourses] = useState([]);
  const { t } = useTranslation();

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
        const otherCourses = res.data.filter(course => {
          const name = course.tenKhoaHoc?.toLowerCase() || "";
          return (
            !name.includes("python") &&
            !name.includes("java") &&
            !name.includes("javascript")
          );
        });

        setCourses(otherCourses);
      })
      .catch(err => {
        console.log(err.response?.data);
      });
  }, []);

  return (
    <div className="container mb-5">
      <h1 className="my-4 pt-4">
        {t("languagePages.other")}
      </h1>

      <div className="row g-4">
        {courses.slice(0, 6).map(course => (
          <div
            className="col-12 col-sm-6 col-lg-4"
            key={course.biDanh}
          >
            <Link
              to={`/${course.biDanh}`}
              className="text-decoration-none text-reset"
              style={{
                display: "block",
                height: "100%"
              }}
            >
              <div
                className="card"
                style={{
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
                    e.currentTarget.src = `https://picsum.photos/seed/${course.biDanh}/500/250`;
                  }}
                />

                <div className="card-body">
                  <h5 className="card-title">
                    {t("languagePages.otherShort")}
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
                          ? `${course.soLopHoc} ${t("categoryCourse.weeks")}`
                          : `${Math.floor(Math.random() * 13) + 4} ${t("categoryCourse.weeks")}`}
                      </span>
                    </div>

                    <span
                      className="fw-bold"
                      style={{
                        color: "#f5d061"
                      }}
                    >
                      {t("categoryCourse.enroll")}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {courses.length > 6 && (
        <div className="d-flex justify-content-end">
          <Link
            to="/other"
            className="btn d-flex justify-content-end"
          >
            {t("languagePages.viewMore")} →
          </Link>
        </div>
      )}
    </div>
  );
}

export default Other;