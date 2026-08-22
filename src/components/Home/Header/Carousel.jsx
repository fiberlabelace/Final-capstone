import React from 'react'
import { useTranslation } from "react-i18next"

const Carousel = () => {
    const { t } = useTranslation()
    return (
        <div>
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="3000">
                        <img className="d-block w-100" alt="..." src="https://picsum.photos/160/40" />
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img className="d-block w-100" alt="..." src="https://picsum.photos/160/40" />
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img className="d-block w-100" alt="..." src="https://picsum.photos/160/40" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">{t("carousel.previous")}</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">{t("carousel.next")}</span>
                </button>
            </div>
        </div>
    )
}

export default Carousel