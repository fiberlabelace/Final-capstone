import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Add = ({ courses, setCourses }) => {
    const [courseName, setCourseName] = useState("");
    const [courseSlug, setCourseSlug] = useState("");
    const [courseImage, setCourseImage] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [courseCategory, setCourseCategory] = useState("");
    const [coursePrice, setCoursePrice] = useState("");
    const { t } = useTranslation();

    const handleAddCourse = (e) => {
        e.preventDefault();

        if (!courseName.trim() || !courseSlug.trim()) {
            alert(t("admin.courseNameSlugRequired"));
            return;
        }

        const customCourses = JSON.parse(localStorage.getItem("customCourses")) || [];
        const removedCourses = JSON.parse(localStorage.getItem("removedCourses")) || [];

        const alreadyExists = courses.some(
            (course) => course.biDanh === courseSlug
        );

        if (alreadyExists) {
            alert(t("admin.slugExists"));
            return;
        }

        const newCourse = {
            maKhoaHoc: `CUSTOM-${Date.now()}`,
            biDanh: courseSlug,
            tenKhoaHoc: courseName,
            hinhAnh: courseImage || `https://picsum.photos/seed/${courseSlug}/800/500`,
            moTa: courseDescription || "No description available.",
            danhMucKhoaHoc: {
                tenDanhMucKhoaHoc: courseCategory || "Programming"
            },
            price: Number(coursePrice) || 50,
            luotXem: 0,
            soLuongHocVien: 0,
            ngayTao: new Date().toLocaleDateString()
        };

        const updatedCourses = [...customCourses, newCourse];

        localStorage.setItem(
            "customCourses",
            JSON.stringify(updatedCourses)
        );

        const cleanedRemovedCourses = removedCourses.filter(
            (id) => id !== newCourse.maKhoaHoc
        );

        localStorage.setItem(
            "removedCourses",
            JSON.stringify(cleanedRemovedCourses)
        );

        setCourses((prev) => [...prev, newCourse]);

        window.dispatchEvent(new Event("customCoursesUpdated"));

        setCourseName("");
        setCourseSlug("");
        setCourseImage("");
        setCourseDescription("");
        setCourseCategory("");
        setCoursePrice("");

        alert(t("admin.courseAdded"));
    };

    return (
        <div className="border rounded p-4 mt-5">
            <h3 className="mb-4">
                {t("admin.addNewCourse")}
            </h3>

            <form onSubmit={handleAddCourse}>
                <div className="mb-3">
                    <label className="form-label">
                        {t("admin.courseName")}
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        placeholder={t("admin.courseNamePlaceholder")}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        {t("admin.courseSlug")}
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={courseSlug}
                        onChange={(e) => setCourseSlug(e.target.value)}
                        placeholder={t("admin.courseSlugPlaceholder")}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        {t("admin.imageUrl")}
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={courseImage}
                        onChange={(e) => setCourseImage(e.target.value)}
                        placeholder={t("admin.imageUrlPlaceholder")}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        {t("admin.category")}
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={courseCategory}
                        onChange={(e) => setCourseCategory(e.target.value)}
                        placeholder={t("admin.categoryPlaceholder")}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        {t("admin.description")}
                    </label>

                    <textarea
                        className="form-control"
                        rows="4"
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                        placeholder={t("admin.descriptionPlaceholder")}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        {t("admin.price")}
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        min="1"
                        value={coursePrice}
                        onChange={(e) => setCoursePrice(e.target.value)}
                        placeholder={t("admin.pricePlaceholder")}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-dark"
                >
                    {t("admin.addCourse")}
                </button>
            </form>
        </div>
    );
};

export default Add;