import React from "react";
import { useTranslation } from "react-i18next";

const Remove = ({ courses, setCourses }) => {
    const { t } = useTranslation();

    const handleRemoveCourse = (course) => {
        const confirmDelete = window.confirm(
            t("admin.confirmRemoveCourse", { course: course.tenKhoaHoc })
        );
        if (!confirmDelete){
            return;
        }
        const customCourses = JSON.parse(localStorage.getItem("customCourses")) || [];
        const removedCourses = JSON.parse(localStorage.getItem("removedCourses")) || [];
        const isCustomCourse = course.maKhoaHoc?.toString().startsWith("CUSTOM-");
        if (isCustomCourse) {
            const updatedCustomCourses = customCourses.filter(
                (item) => item.maKhoaHoc !== course.maKhoaHoc
            );
            localStorage.setItem(
                "customCourses",
                JSON.stringify(updatedCustomCourses)
            );
            window.dispatchEvent(new Event("customCoursesUpdated"));
        }
        else {
            if(!removedCourses.includes(course.maKhoaHoc)) {
                removedCourses.push(course.maKhoaHoc);
            }
            localStorage.setItem(
                "removedCourses",
                JSON.stringify(removedCourses)
            );
        }
        setCourses((prev) =>
            prev.filter(
                (item) => item.maKhoaHoc !== course.maKhoaHoc
            )
        );
        alert(t("admin.courseRemoved"));
    };
    return (
        <div className="mt-5">
            <h3 className="mb-4">
                {t("admin.removeCourses")}
            </h3>
            <p className="text-secondary mb-4">
                {t("admin.removeCoursesDescriptionFull")}
            </p>
            <div className="row g-4">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <div className="col-md-6 col-lg-4" key={course.maKhoaHoc}>
                            <div className="border rounded p-3 h-100">
                                <img src={ course.hinhAnh || `https://picsum.photos/seed/${course.biDanh}/500/300`} alt={course.tenKhoaHoc} className="img-fluid rounded mb-3"
                                    onError={(e) => {
                                        e.currentTarget.src = `https://picsum.photos/seed/${course.biDanh}/500/300`;
                                    }}/>
                                <h5>{course.tenKhoaHoc}</h5>
                                <p className="text-secondary">
                                    {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc ||t("course.programming")}
                                </p>
                                <p className="mb-3">
                                    <strong>
                                        ${course.price || 0}
                                    </strong>
                                </p>
                                <button className="btn btn-danger w-100 edit-button" onClick={() => handleRemoveCourse(course)}>
                                    {t("admin.removeCourse")}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>{t("admin.noCoursesAvailable")}</p>
                )}
            </div>
        </div>
    );
};

export default Remove;