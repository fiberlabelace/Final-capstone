import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Category from './Category'
import { useTranslation } from "react-i18next";

const Menu = () => {
    const [cartNotification, setCartNotification] = useState(0);
    const [cart, setCart] = useState([]);
    const [registeredCourses, setRegisteredCourses] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const { t, i18n } = useTranslation();
    useEffect(() => {
        const loadCart = () => {
            const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
            setCart(savedCart);
            setCartNotification(savedCart.length);
        };
        const loadRegisteredCourses = () => {
            const savedRegisteredCourses = JSON.parse(localStorage.getItem("registeredCourses")) || [];
            setRegisteredCourses(savedRegisteredCourses);
        };
        const loadUser = () => {
            const savedUser = JSON.parse(localStorage.getItem("user")) || null;
            setUser(savedUser);
        };
        const handleCartUpdated = () => {
            loadCart();
        };
        const handleRegisteredUpdated = () => {
            loadRegisteredCourses();
        };
        const handleUserUpdated = () => {
            loadUser();
        };

        loadCart();
        loadRegisteredCourses();
        loadUser();
        window.addEventListener("cartUpdated", handleCartUpdated);
        window.addEventListener("registeredUpdated", handleRegisteredUpdated);
        window.addEventListener("userUpdated", handleUserUpdated);
        return () => {
            window.removeEventListener("cartUpdated", handleCartUpdated);
            window.removeEventListener("registeredUpdated", handleRegisteredUpdated);
            window.removeEventListener("userUpdated", handleUserUpdated);
        };
    }, []);

    const removeFromCart = (biDanh) => {
        const newCart = cart.filter((course) => course.biDanh !== biDanh);
        setCart(newCart);
        setCartNotification(newCart.length);
        localStorage.setItem("cart", JSON.stringify(newCart));
        window.dispatchEvent(new Event("cartUpdated"));
    };
    const deleteAll = () => {
        setCart([]);
        setCartNotification(0);
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cartUpdated"));
    };
    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        window.dispatchEvent(new Event("userUpdated"));
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <Link to="/">
                        <img className="me-4" src="/logo.png" style={{ maxHeight: "50px" }} />
                    </Link>
                    <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label={t("header.toggleNavigation")}>
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                        <div className="position-relative d-flex align-items-center pe-5" style={{ width: "clamp(400px, 25vw, 400px)" }}>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const query = searchQuery.trim();
                                    if (query) {
                                        navigate(`/search?query=${encodeURIComponent(query)}`);
                                    }
                                }}
                                className="position-relative d-flex align-items-center pe-5"
                                style={{ width: "clamp(400px, 25vw, 400px)" }}>
                                <i className="bi bi-search position-absolute start-0 ms-3 text-secondary"></i>
                                <input type="search" className="form-control rounded-pill bg-light border-0 ps-5 py-1 shadow-none" placeholder={t("header.search")}
                                    aria-label={t("header.search")} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ color: "#6c6c6c" }}/>
                            </form>
                        </div>
                        <ul className="navbar-nav ms-lg-auto mb-2 mb-lg-0 gap-2 text-center">
                            <li className="nav-item">
                                <button type="button" className="nav-link position-relative" data-bs-toggle="offcanvas" data-bs-target="#cartCanvas" aria-controls="cartCanvas">
                                    <i className="bi bi-cart3 pe-1"></i>
                                    {t("header.cart")}
                                    {cartNotification > 0 && (
                                        <span className="cart-notification">
                                            {cartNotification}
                                        </span>
                                    )}
                                </button>
                            </li>
                            {user ? (
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {t("header.hello")}, {user.name}
                                    </a>
                                    <ul className="dropdown-menu">
                                        {user.role === "admin" && (
                                            <li>
                                                <Link className="dropdown-item" to="/admin">
                                                    {t("header.adminPanel")}
                                                </Link>
                                            </li>
                                        )}
                                        <li>
                                            <button className="dropdown-item" onClick={handleLogout}>
                                                {t("header.logOut")}
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/sign-up">
                                        {t("header.signUp")}
                                    </Link>
                                </li>
                            )}

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-globe pe-1"></i>
                                    {t("header.language")}
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <button className="dropdown-item" onClick={() => i18n.changeLanguage("en")}>
                                            🇬🇧 English
                                        </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" onClick={() => i18n.changeLanguage("vi")}>
                                            🇻🇳 Vietnamese
                                        </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" onClick={() => i18n.changeLanguage("ja")}>
                                            🇯🇵 Japanese
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="cartCanvas" aria-labelledby="cartCanvasLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="cartCanvasLabel">
                        {t("cart.shoppingCart")}
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label={t("header.close")}></button>
                </div>
                <div className="offcanvas-body">
                    <div className="cart-list d-flex flex-column gap-3">
                        {cart.length > 0 ? (
                            <>
                                {cart.map((course) => (
                                    <div key={course.biDanh}>
                                        <div className="cart-item d-flex justify-content-between align-items-center">
                                            <div className="cart-item-content">
                                                <h6>{course.tenKhoaHoc}</h6>
                                                <small>
                                                    {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc || t("course.programming")}
                                                </small>
                                            </div>
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(course.biDanh)}>
                                                {t("cart.delete")}
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <Link to="/payment" className="btn payment-btn">
                                    {t("cart.payment")}
                                </Link>
                                <button className="btn btn-danger mt-2" onClick={deleteAll}>
                                    {t("cart.deleteAll")}
                                </button>
                            </>
                        ) : (
                            <p className="text-secondary">
                                {t("cart.noCoursesWaiting")}
                            </p>
                        )}
                        <hr />
                        <h5 className="mt-2">{t("cart.myCourses")}</h5>
                        {registeredCourses.length > 0 ? (
                            registeredCourses.map((course) => (
                                <div key={course.biDanh}>
                                    <Link to={`/${course.biDanh}`} className="text-decoration-none text-dark">
                                        <div className="cart-item">
                                            <h6>{course.tenKhoaHoc}</h6>
                                            <small>
                                                {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc || t("course.programming")}
                                            </small>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p className="text-secondary mt-3">
                                {t("cart.noEnrolledCourses")}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <Category />
        </div>
    )
}
export default Menu