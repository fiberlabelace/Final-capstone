import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function AdminCourses() {
    const [courses, setCourses] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        const loadCourses = () => {
            const customCourses = JSON.parse(localStorage.getItem("customCourses")) || [];
            setCourses(customCourses);
        };

        loadCourses();

        window.addEventListener("customCoursesUpdated", loadCourses);

        return () => {
            window.removeEventListener("customCoursesUpdated", loadCourses);
        };
    }, []);

    return (
        <div className="container mb-5">
            <h1 className="my-4 pt-4">{t("adminCourses.title")}</h1>

            {courses.length > 0 ? (
                <>
                    <div className="row g-4">
                        {courses.slice(0, 6).map((course) => (
                            <div className="col-12 col-sm-6 col-lg-4" key={course.maKhoaHoc}>
                                <Link
                                    to={`/${course.biDanh}`}
                                    className="text-decoration-none text-reset"
                                >
                                    <div className="card">
                                        <img
                                            src={course.hinhAnh}
                                            className="card-img-top"
                                            alt={course.tenKhoaHoc}
                                            onError={(e) => {
                                                e.currentTarget.src = `https://picsum.photos/seed/${course.biDanh}/180/400`;
                                            }}
                                        />

                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {t("adminCourses.adminCourse")}
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
                                                            ? t("adminCourses.weeks", { count: course.soLopHoc })
                                                            : t("adminCourses.recentlyAdded")}
                                                    </span>
                                                </div>

                                                <span
                                                    className="fw-bold"
                                                    style={{ color: "#f5d061" }}
                                                >
                                                    {t("adminCourses.enroll")}
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
                            <Link to="/admin-courses" className="btn">
                                {t("adminCourses.viewMore")}
                            </Link>
                        </div>
                    )}
                </>
            ) : (
                <p className="text-secondary">
                    {t("adminCourses.noCourses")}
                </p>
            )}
        </div>
    );
}

export default AdminCourses;