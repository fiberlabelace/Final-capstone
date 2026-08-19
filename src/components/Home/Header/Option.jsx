import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Option = () => {
    const [courses, setCourses] = useState([]);
    const { t } = useTranslation();
    const shortcutNames = [
        ["backend", "backend"],
        ["web-design", "webDesign"],
        ["mobile-dev", "mobileDev"],
        ["frontend", "frontend"],
        ["full-stack", "fullStack"],
        ["programming-thinking", "programmingThinking"],
    ];
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
            setCourses(res.data);
        })
        .catch((err) => {
            console.log(err.response?.status);
            console.log(err.response?.data);
        });
    }, []);
    return (
        <div className="option container my-5">
            <ul className="d-flex justify-content-md-between justify-content-start gap-2 flex-wrap container">
                {shortcutNames.map(([slug, name], index) => (
                    <Link to={`/category-course/${slug}`} className="shortcut-item text-decoration-none text-white text-center flex-shrink-0" key={slug}>
                        <div className="shortcut-icon mb-2 overflow-hidden"
                            style={{
                                width: "55px",
                                height: "55px",
                            }}>
                            <img src={courses[index]?.hinhAnh || `https://picsum.photos/seed/${index}/180/180`} alt={t(`shortcuts.${name}`)}
                                className="w-100 h-100 object-fit-cover rounded-4"
                                onError={(e) => {
                                    e.currentTarget.src = `https://picsum.photos/seed/${index}/180/180`;
                                }}/>
                        </div>
                        <span className="small d-block text-nowrap bg-dark">
                            {t(`shortcuts.${name}`)}
                        </span>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default Option;