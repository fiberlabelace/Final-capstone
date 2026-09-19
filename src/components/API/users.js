import axios from "axios";
import { cybersoftApiHeaders } from "../../config/cybersoftApi";

const API = "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung";

const api = axios.create({
  baseURL: API,
  headers: cybersoftApiHeaders
});

const getAdminAccessToken = () => {
  const accessToken = import.meta.env.VITE_CYBERSOFT_ADMIN_ACCESS_TOKEN?.trim();

  if (!accessToken) {
    throw new Error(
      "Chưa cấu hình VITE_CYBERSOFT_ADMIN_ACCESS_TOKEN trong .env.local"
    );
  }

  return accessToken;
};

export const dangKy = data => {
  return api.post("/DangKy", data);
};

export const dangNhap = data => {
  return api.post("/DangNhap", data);
};

export const layDanhSachNguoiDung = (maNhom = "GP01") => {
  const accessToken = getAdminAccessToken();

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
  const accessToken = getAdminAccessToken();

  return api.delete("/XoaNguoiDung", {
    params: {
      TaiKhoan: taiKhoan
    },
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};