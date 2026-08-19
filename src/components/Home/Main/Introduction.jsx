import React from "react";
import { useTranslation } from "react-i18next";

const Introduction = () => {
    const { t } = useTranslation();

    return (
        <div className="introduction">
            <video className="bg-vid" autoPlay loop muted>
                <source src="./background-video.mp4" type="video/mp4" />
            </video>

            <div className="container text-center quote">
                <h1>{t("introduction.title")}</h1>

                <h3>
                    “{t("introduction.description")}”
                </h3>

                <h4>{t("introduction.ceo")}</h4>
            </div>

            <div className="d-flex justify-content-between container statistic">
                <img src="./public/map.png" />

                <div className="text-center">
                    <h1>7</h1>
                    <h3>{t("introduction.center")}</h3>

                    <h1>5170</h1>
                    <h3>{t("introduction.students")}</h3>

                    <h1>65</h1>
                    <h3>{t("introduction.collaborators")}</h3>
                </div>
            </div>
        </div>
    );
};

export default Introduction;