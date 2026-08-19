import axios from "axios";

const API = "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc";
const api = axios.create({
    baseURL: API,
    headers: {
        TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MyIsIkhldEhhblN0cmluZyI6IjExLzEyLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc5Njk0NzIwMDAwMCIsIm5iZiI6MTc2Nzk3ODAwMCwiZXhwIjoxNzk3MDk0ODAwfQ.nooPjcX2NT2qTi3ew-Ov-Ki_PNodbk6OGwbQ3XdIUQg",
    },
});

export const layDanhSachKhoaHoc = () => {
    return api.get("/LayDanhSachKhoaHoc", {
        params: {
            MaNhom: "GP01",
        },
    })
    .then((res) => {
        console.log("SUCCESS:", res.data);
        return res;
    })
    .catch((err) => {
        console.log("STATUS:", err.response?.status);
        console.log("DATA:", err.response?.data);
        console.log("HEADERS:", err.response?.headers);
        throw err;
    });
};
