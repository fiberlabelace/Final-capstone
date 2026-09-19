import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { dangNhap } from "../API/users";
const LogIn = () => {
  const {
    t
  } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async e => {
    e.preventDefault();
    const ADMIN_EMAIL = "admin@gmail.com";
    const ADMIN_PASSWORD = "admin";
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = {
        name: "Admin",
        email: ADMIN_EMAIL,
        role: "admin"
      };
      localStorage.setItem("user", JSON.stringify(adminUser));
      localStorage.removeItem("accessToken");
      window.dispatchEvent(new Event("userUpdated"));
      navigate("/");
      return;
    }
    try {
      const res = await dangNhap({
        taiKhoan: email,
        matKhau: password
      });
      const data = res.data;
      console.log("LOGIN DATA:", data);
      const user = {
        name: data.hoTen,
        email: data.email,
        role: data.maLoaiNguoiDung || "user",
        taiKhoan: data.taiKhoan,
        maNhom: data.maNhom,
        token: data.accessToken
      };
      localStorage.setItem("user", JSON.stringify(user));
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }
      window.dispatchEvent(new Event("userUpdated"));
      navigate("/");
    } catch (err) {
      console.log("LOGIN STATUS:", err.response?.status);
      console.log("LOGIN DATA:", err.response?.data);
      const errorData = err.response?.data;
      alert(errorData?.content || errorData?.message || errorData || t("login.incorrectCredentials"));
    }
  };
  return <div className="container py-5" style={{
    maxWidth: "500px"
  }}>
            <div className="border p-4">

                <h2 className="text-center mb-4">
                    {t("login.welcomeBack")}
                </h2>

                <form onSubmit={handleLogin}>

                    {}
                    <div className="mb-3">
                        <label className="form-label">
                            {t("login.email")}
                        </label>

                        <input type="email" className="form-control" placeholder={t("login.emailPlaceholder")} value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>

                    {}
                    <div className="mb-3">
                        <label className="form-label">
                            {t("login.password")}
                        </label>

                        <input type="password" className="form-control" placeholder={t("login.passwordPlaceholder")} value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>

                    <button type="submit" className="border btn btn-dark w-100">
                        {t("login.logIn")}
                    </button>

                </form>

                <hr />

                <p className="text-center mb-0">
                    {t("login.newUser")}{" "}

                    <Link to="/sign-up">
                        {t("login.signUp")}
                    </Link>
                </p>

            </div>

            <div className="text-center mt-3">

                <Link to="/" className="text-decoration-none text-white d-inline-flex align-items-center gap-1">
                    <i className="bi bi-house-fill"></i>

                    {t("login.backToHome")}
                </Link>

            </div>
        </div>;
};
export default LogIn;