import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next"

const sections = [
    ["web-program", "webProgram"],
    ["tester", "tester"],
    ["mobile-dev", "mobileDev"],
    ["data-analyst", "dataAnalyst"],
    ["ai-engineer", "aiEngineer"],
    ["devops", "devops"],
    ["data-science", "dataScience"],
    ["ai-work", "aiWork"],
    ["ai-office", "aiOffice"]
]
const Category = () => {
    const { t } = useTranslation()
    return (
        <div className="category-menu pt-2">
            <div className="container">
                <div className="category-nav">
                    <div className="category-links">
                        <Link to="/code-language">☰ [ {t("categories.codeLanguage")} ]</Link>
                        {sections.map(([name, label]) => (
                            <Link key={name} to={`/category-course/${name}`}>
                                {t(`categories.${label}`)}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="category">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h5>Python</h5>
                            <Link to="/ai-engineer">{t("categoryCourses.aiEngineer")}</Link>
                            <Link to="/data-ai-analyst">{t("categoryCourses.dataAiAnalyst")}</Link>
                            <Link to="/mlops-cloud">{t("categoryCourses.mlopsCloud")}</Link>
                            <Link to="/data-predict-analyst">{t("categoryCourses.dataPredictAnalyst")}</Link>
                            <Link to="/mastering-ai-engineer">{t("categoryCourses.masteringAiEngineer")}</Link>
                            <Link to="/mastering-data-engineer">{t("categoryCourses.masteringDataEngineer")}</Link>
                            <Link to="/machine-learning">{t("categoryCourses.machineLearning")}</Link>
                            <Link to="/sql-power-bi-etl-python">{t("categoryCourses.sqlPowerBiEtlPython")}</Link>
                        </div>
                        <div className="col">
                            <h5>JavaScript</h5>
                            <Link to="/full-stack-dev">{t("categoryCourses.fullStackDev")}</Link>
                            <Link to="/back-end-dev">{t("categoryCourses.backEndDev")}</Link>
                            <Link to="/front-end-dev">{t("categoryCourses.frontEndDev")}</Link>
                            <Link to="/cloud-engineer">{t("categoryCourses.cloudEngineer")}</Link>
                            <Link to="/dev-ops">{t("categoryCourses.devOps")}</Link>
                        </div>
                        <div className="col">
                            <h5>C# .Net Core</h5>
                            <Link to="/fullstack-web">{t("categoryCourses.fullstackWeb")}</Link>
                            <Link to="/code-architecture">{t("categoryCourses.codeArchitecture")}</Link>
                        </div>
                        <div className="col">
                            <h5>Java/Spring</h5>
                            <Link to="/bootcamp-java-back-end">{t("categoryCourses.bootcampJavaBackend")}</Link>
                        </div>
                        <div className="col">
                            <h5>Dart/Flutter</h5>
                            <Link to="/mobile-app-dev">{t("categoryCourses.mobileAppDev")}</Link>
                        </div>
                        <div className="col">
                            <h5>Golang</h5>
                            <Link to="/backend-golang">{t("categoryCourses.backendGolang")}</Link>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Category