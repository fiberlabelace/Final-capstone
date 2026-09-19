import axios from "axios";
import { cybersoftApiHeaders } from "../../config/cybersoftApi";
const API = "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung";
const api = axios.create({
  baseURL: API,
  headers: cybersoftApiHeaders
});
export const dangKy = data => {
  return api.post("/DangKy", data);
};
export const dangNhap = data => {
  return api.post("/DangNhap", data);
};
export const layDanhSachNguoiDung = (maNhom = "GP01") => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Không tìm thấy accessToken. Vui lòng đăng nhập bằng tài khoản CyberSoft.");
  }
  return api.get("/LayDanhSachNguoiDung", {
    params: {
      MaNhom: maNhom
    },
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};
export const xoaNguoiDung = taiKhoan => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Không tìm thấy accessToken. Vui lòng đăng nhập bằng tài khoản CyberSoft.");
  }
  return api.delete("/XoaNguoiDung", {
    params: {
      TaiKhoan: taiKhoan
    },
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};