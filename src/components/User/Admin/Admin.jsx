import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Header from "../../Home/Header/Menu.jsx";
import Footer from "../../Home/Footer/Footer.jsx";
import Add from "./Add";
import Remove from "./Remove";
import EditUser from "./EditUser";
import { useTranslation } from "react-i18next";

const API_URL = "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01";
const Admin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { t } = useTranslation();
    const [courses, setCourses] = useState([]);
    const [users, setUsers] = useState([]);
    const [activeSection, setActiveSection] = useState("add");
    useEffect(() => {
        const loadCourses = async () => {
            try {
                const res = await axios.get(API_URL, {
                    headers: {
                        TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MyIsIkhldEhhblN0cmluZyI6IjExLzEyLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc5Njk0NzIwMDAwMCIsIm5iZiI6MTc2Nzk3ODAwMCIsImV4cCI6MTc5NzA5NDgwMH0.nooPjcX2NT2qTi3ew-Ov-Ki_PNodbk6OGwbQ3XdIUQg"
                    }
                });
                const apiCourses = res.data || [];
                const customCourses = JSON.parse(localStorage.getItem("customCourses")) || [];
                const removedCourses = JSON.parse(localStorage.getItem("removedCourses")) || [];
                const visibleApiCourses = apiCourses.filter(
                    (course) => !removedCourses.includes(course.maKhoaHoc)
                );
                setCourses([...visibleApiCourses, ...customCourses]);
            }
            catch (err) {
                console.log("STATUS:", err.response?.status);
                console.log("DATA:", err.response?.data);
            }
        };
        const loadUsers = () => {
            const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
            setUsers(savedUsers);
        };
        loadCourses();
        loadUsers();
    }, []);
    if (!user || user.role !== "admin"){
        return <Navigate to="/" replace />;
    }
    return (
        <div>
            <Header />
            <div className="container py-5">
                <h1>
                    {t("admin.adminPanel")}
                </h1>
                <p>
                    {t("admin.welcome")}, {user.name}.
                </p>
                <div className="row g-4 mt-3">
                    <div className="col-md-4">
                        <button className={`w-100 border rounded p-4 text-start admin-section-btn ${activeSection === "add" ? "bg-dark text-white" : ""}`} onClick={() => setActiveSection("add")}>
                            <h4>
                                {t("admin.addCourses")}
                            </h4>
                            <p>
                                {t("admin.addCoursesDescription")}
                            </p>
                        </button>
                    </div>
                    <div className="col-md-4">
                        <button className={`w-100 border rounded p-4 text-start admin-section-btn ${activeSection === "remove" ? "bg-dark text-white" : ""}`} onClick={() => setActiveSection("remove")}>
                            <h4>
                                {t("admin.removeCourses")}
                            </h4>
                            <p>
                                {t("admin.removeCoursesDescription")}
                            </p>
                        </button>
                    </div>
                    <div className="col-md-4">
                        <button className={`w-100 border rounded p-4 text-start admin-section-btn ${activeSection === "users" ? "bg-dark text-white" : ""}`} onClick={() => setActiveSection("users")}>
                            <h4>
                                {t("admin.manageUsers")}
                            </h4>
                            <p>
                                {t("admin.manageUsersDescription")}
                            </p>
                        </button>
                    </div>
                </div>
                {activeSection === "add" && (
                    <Add courses={courses} setCourses={setCourses}/>
                )}
                {activeSection === "remove" && (
                    <Remove courses={courses} setCourses={setCourses}/>
                )}
                {activeSection === "users" && (
                    <EditUser users={users} setUsers={setUsers}/>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Admin;