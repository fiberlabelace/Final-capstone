import React from 'react'
import Information from './Information'
import Address from './Address'
import "bootstrap-icons/font/bootstrap-icons.css"
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next"

const Footer =() => {
    const { t, i18n} = useTranslation()
    return (
        <div className='footer'>
            <div className='container pt-5'>
                <div className='d-flex justify-content-between'>
                    <img src='/logo.png' className="mb-4" style={{ maxHeight: "50px" }} />
                    <div className='dropdown'>
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi bi-globe pe-1"></i>
                            {t("footer.language")}
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
                    </div>
                </div>
                <div className='d-flex gap-3 choice'>
                    <Link>{t("footer.notice")}</Link>
                    <Link>{t("footer.termsOfUse")}</Link>
                    <Link>{t("footer.privacyPolicy")}</Link>
                    <Link>{t("footer.faq")}</Link>
                    <Link>{t("footer.refund")}</Link>
                    <Link>{t("footer.cookiePolicy")}</Link>
                    <Link>{t("footer.changingCookieSettings")}</Link>
                </div>
                <hr></hr>
                <Information />
                <Address />
                <hr></hr>
                <div className='d-flex justify-content-between'>
                    <p>{t("footer.copyright")}</p>
                    <div className='d-flex gap-3'>
                        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                            <i className="bi bi-facebook"></i>
                        </a>
                        <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
                            <i className="bi bi-youtube"></i>
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                            <i className="bi bi-instagram"></i>
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                            <i className="bi bi-twitter"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer