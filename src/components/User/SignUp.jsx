import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function SignUp() {
    const { t } = useTranslation();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agree, setAgree] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert(t("signup.passwordMismatch"));
            return;
        }

        if (!agree) {
            alert(t("signup.agreeRequired"));
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const emailExists = users.some(
            (user) => user.email.toLowerCase() === email.toLowerCase()
        );

        if (emailExists) {
            alert(t("signup.emailExists"));
            return;
        }

        if (email.toLowerCase() === "admin@gmail.com") {
            alert(t("signup.emailReserved"));
            return;
        }

        const newUser = {
            name: fullName,
            email: email,
            password: password,
            role: "user"
        };

        users.push(newUser);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        alert(t("signup.accountCreated"));

        navigate("/log-in");
    };

    return (
        <div className="container py-5" style={{ maxWidth: "500px" }}>
            <div className="border p-4">
                <h2 className="text-center mb-4">
                    {t("signup.createAccount")}
                </h2>

                <form onSubmit={handleSignUp}>
                    <div className="mb-3">
                        <label className="form-label">
                            {t("signup.fullName")}
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder={t("signup.fullNamePlaceholder")}
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            {t("signup.email")}
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder={t("signup.emailPlaceholder")}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            {t("signup.password")}
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder={t("signup.passwordPlaceholder")}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            {t("signup.confirmPassword")}
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder={t("signup.confirmPasswordPlaceholder")}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-check mb-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="agree"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                        />

                        <label
                            className="form-check-label"
                            htmlFor="agree"
                        >
                            {t("signup.agreeTerms")}
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="border btn btn-dark w-100"
                    >
                        {t("signup.signUp")}
                    </button>
                </form>

                <hr />

                <p className="text-center mb-0">
                    {t("signup.alreadyHaveAccount")}{" "}
                    <Link to="/log-in">
                        {t("signup.logIn")}
                    </Link>
                </p>
            </div>

            <div className="text-center mt-3">
                <Link
                    to="/"
                    className="text-decoration-none text-white d-inline-flex align-items-center gap-1"
                >
                    <i className="bi bi-house-fill"></i>
                    {t("signup.backToHome")}
                </Link>
            </div>
        </div>
    );
}

export default SignUp;