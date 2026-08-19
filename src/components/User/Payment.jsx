import React, { useEffect, useState } from "react";
import Header from "../Home/Header/Menu.jsx";
import Footer from "../Home/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Payment = () => {
    const { t } = useTranslation();
    const [cart, setCart] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);
    const total = cart.reduce(
        (sum, course) => sum + (course.price || 0),
        0
    );
    const handlePayment = (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            return;
        }
        const registeredCourses =
            JSON.parse(localStorage.getItem("registeredCourses")) || [];
        const updatedCourses = [
            ...registeredCourses,
            ...cart.filter(
                (course) =>
                    !registeredCourses.some(
                        (registeredCourse) =>
                            registeredCourse.biDanh === course.biDanh
                    )
            )
        ];
        localStorage.setItem(
            "registeredCourses",
            JSON.stringify(updatedCourses)
        );
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cartUpdated"));
        window.dispatchEvent(new Event("registeredUpdated"));
        alert(t("payment.paymentSuccessful"));
        navigate("/");
    };
    return (
        <div className="payment-page">
            <Header />
            <div className="container py-5">
                <h1 className="text-center mb-5">
                    {t("payment.payment")}
                </h1>
                {cart.length === 0 ? (
                    <div className="payment-empty text-center">
                        <i className="bi bi-cart-x"></i>
                        <h3>
                            {t("payment.cartEmpty")}
                        </h3>
                        <p>
                            {t("payment.addCourseBeforePayment")}
                        </p>
                        <Link to="/" className="payment-back-btn">
                            {t("payment.browseCourses")}
                        </Link>
                    </div>
                ) : (
                    <div className="row g-5">
                        <div className="col-lg-7">
                            <div className="payment-box">
                                <h3>
                                    {t("payment.paymentInformation")}
                                </h3>
                                <form onSubmit={handlePayment} autoComplete="on">
                                    <div className="payment-methods">
                                        <button type="button"
                                            className={`payment-method ${
                                                paymentMethod === "card"
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setPaymentMethod("card")
                                            }>
                                            <i className="bi bi-credit-card"></i>
                                            {t("payment.card")}
                                        </button>

                                        <button type="button"
                                            className={`payment-method ${
                                                paymentMethod === "paypal"
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setPaymentMethod("paypal")
                                            }>
                                            <i className="bi bi-wallet2"></i>
                                            PayPal
                                        </button>
                                    </div>
                                    {paymentMethod === "card" ? (
                                        <>
                                            <div className="payment-input-group">
                                                <label htmlFor="cardNumber">
                                                    {t("payment.cardNumber")}
                                                </label>
                                                <input id="cardNumber" type="text" name="cardNumber" autoComplete="cc-number" inputMode="numeric" placeholder="1234 5678 9012 3456" value={cardNumber}
                                                    onChange={(e) =>
                                                        setCardNumber(e.target.value)
                                                    }
                                                    required/>
                                            </div>

                                            <div className="payment-input-group">
                                                <label htmlFor="cardName">
                                                    {t("payment.cardholderName")}
                                                </label>
                                                <input id="cardName" type="text" name="cardName" autoComplete="cc-name" placeholder={t("payment.yourName")} value={cardName}
                                                    onChange={(e) =>
                                                        setCardName(e.target.value)
                                                    }
                                                    required/>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="payment-input-group">
                                                        <label htmlFor="expiry">
                                                            {t("payment.expiryDate")}
                                                        </label>
                                                        <input id="expiry" type="text" name="expiry" autoComplete="cc-exp" inputMode="numeric" placeholder="MM/YY" value={expiry}
                                                            onChange={(e) =>
                                                                setExpiry(e.target.value)
                                                            }
                                                            required/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="payment-input-group">
                                                        <label htmlFor="cvv">
                                                            CVV
                                                        </label>
                                                        <input id="cvv" type="text" name="cvv" autoComplete="cc-csc" inputMode="numeric" placeholder="123" value={cvv}
                                                            onChange={(e) =>
                                                                setCvv(e.target.value)
                                                            }
                                                            required/>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="paypal-box">
                                            <i className="bi bi-paypal"></i>
                                            <p>
                                                {t("payment.paypalRedirect")}
                                            </p>
                                        </div>
                                    )}
                                    <button type="submit" className="payment-submit-btn">
                                        {t("payment.pay")} ${total}
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="order-summary">
                                <h3>
                                    {t("payment.orderSummary")}
                                </h3>
                                <div className="payment-course-list">
                                    {cart.map((course) => (
                                        <div className="payment-course" key={course.biDanh}>
                                            <img src={course.hinhAnh} alt={course.tenKhoaHoc}
                                                onError={(e) => {
                                                    e.currentTarget.src = `https://picsum.photos/seed/${course.biDanh}/120/80`;
                                                }}/>
                                            <div>
                                                <h6>{course.tenKhoaHoc}</h6>
                                                <small>
                                                    {course.danhMucKhoaHoc
                                                        ?.tenDanhMucKhoaHoc ||
                                                        t("course.programming")}
                                                </small>
                                            </div>
                                            <strong>
                                                ${course.price || 0}
                                            </strong>
                                        </div>
                                    ))}
                                </div>
                                <hr />
                                <div className="summary-row">
                                    <span>
                                        {t("payment.courses")}
                                    </span>
                                    <span>{cart.length}</span>
                                </div>
                                <div className="summary-row">
                                    <span>
                                        {t("payment.subtotal")}
                                    </span>
                                    <span>${total}</span>
                                </div>
                                <div className="summary-row">
                                    <span>
                                        {t("payment.discount")}
                                    </span>
                                    <span>$0</span>
                                </div>
                                <hr />
                                <div className="summary-total">
                                    <span>
                                        {t("payment.total")}
                                    </span>
                                    <strong>${total}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Payment;