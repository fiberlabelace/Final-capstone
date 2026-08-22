import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next"

const Information= ()=> {
    const { t } = useTranslation()
    return (
        <div className='information'>
            <div className='d-flex flex-column flex-md-row justify-content-between'>
                <div className='d-flex gap-3'>
                    <p>{t("information.refund")}</p>
                    <a>refund@cybersoft.global</a>
                    <p>{t("information.helpCenter")}</p>
                    <a>help@cybersoft.global</a>
                </div>
                <div className='d-flex gap-3 language'>
                    <h5>{t("information.site")}</h5>
                    <Link>Cybersoft Viet Nam</Link>
                    <Link>Cybersoft USA</Link>
                    <Link>Cybersoft Japan</Link>
                </div>
            </div>
            <div className="d-flex flex-column flex-md-row align-items-center gap-3 support">
                <a href="https://mail.google.com/" target="_blank" onClick={() => window.scrollTo(0, 0)}>
                    {t("information.contact")}
                </a>
                <Link to="/" onClick={() => window.scrollTo(0, 0)} className='report'>
                    {t("information.reportInfringement")}
                </Link>
                <img src='/copyright.png' style={{ maxHeight: "30px" }} />
                <div style={{ transform: "translateY(7px)" }}>
                    <div className='d-flex'>
                        <h5 className='mb-0'>CYBERSOFT</h5>
                        <p className='px-2 mb-0'>partners</p>
                    </div>
                    <p>{t("information.protectIP")}</p>
                </div>
            </div>
        </div>
    )
}

export default Information