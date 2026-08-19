import React from 'react'
import { useTranslation } from "react-i18next"

const Address = () => {
    const { t } = useTranslation()

    return (
        <div>
            <div className="address container my-5">
                <h1>{t("address.hoChiMinhCity")}</h1>

                <div className="row g-4">
                    <div className="col-md-4">
                        <h3>{t("address.headquarter")}: 112 Cao Thang, {t("address.district")} 3</h3>
                        <p>{t("address.hotline")}: 096.105.1014 – 077.886.1911</p>
                        <p>{t("address.address")}: {t("address.floor")} 5, Suri Building, 112 Cao Thang, {t("address.district")} 3, {t("address.hoChiMinhCity")}</p>
                    </div>

                    <div className="col-md-4">
                        <h3>459 Su Van Hanh, {t("address.district")} 10</h3>
                        <p>{t("address.hotline")}: 096.105.1014 – 077.886.1911</p>
                        <p>{t("address.address")}: {t("address.floor")} 2, WinHome Building, 459 Su Van Hanh, {t("address.district")} 10, {t("address.hoChiMinhCity")}</p>
                    </div>

                    <div className="col-md-4">
                        <h3>82 Ung Van Khiem, Binh Thanh {t("address.district")}</h3>
                        <p>{t("address.hotline")}: 096.105.1014 – 077.886.1911</p>
                        <p>{t("address.address")}: 82 Ung Van Khiem, Binh Thanh {t("address.district")}, {t("address.hoChiMinhCity")}</p>
                    </div>

                    <div className="col-md-4">
                        <h3>110 Street No.10, Park Hill City Land, Phan Van Tri, Go Vap {t("address.district")}</h3>
                        <p>{t("address.hotline")}: 096.105.1014 – 077.886.1911</p>
                        <p>{t("address.address")}: 110 Street No.10, Park Hill City Land, Phan Van Tri, Go Vap {t("address.district")}, {t("address.hoChiMinhCity")}</p>
                    </div>

                    <div className="col-md-4">
                        <h3>56 Le Canh Tuan, Tan Phu {t("address.district")}</h3>
                        <p>{t("address.hotline")}: 096.105.1014 – 077.886.1911</p>
                        <p>{t("address.address")}: 56 Le Canh Tuan, Tan Phu {t("address.district")}, {t("address.hoChiMinhCity")}</p>
                    </div>

                    <div className="col-md-4">
                        <h3>6C Street No.8, Linh Tay, Thu Duc {t("address.city")}</h3>
                        <p>{t("address.hotline")}: 096.105.1014 – 077.886.1911</p>
                        <p>{t("address.address")}: 6C Street No.8, Linh Tay {t("address.ward")}, Thu Duc {t("address.city")}, {t("address.hoChiMinhCity")}</p>
                    </div>
                </div>
            </div>

            <div className="address container my-5">
                <h1>{t("address.daNang")}</h1>

                <div className="row g-4">
                    <div className="col-md-4">
                        <h3>103 Nguyen Huu Dat, Hai Chau {t("address.district")}</h3>
                        <p>{t("address.hotline")}: 096.105.1014 – 077.886.1911</p>
                        <p>{t("address.address")}: 103 Nguyen Huu Dat, Hai Chau {t("address.district")}, {t("address.daNang")}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Address