import { createRoot } from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/global.scss';
import {BrowserRouter} from "react-router-dom";
import ScrollTop from "./components/Effect/ScrollTop";
import i18next from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import en from "./components/API/English.json";
import vi from "./components/API/Vietnamese.json";
import ja from "./components/API/Japanese.json";

i18next
    .use(initReactI18next)
    .init({
        lng: "en",
        fallbackLng: "en",
        resources:{
            en: { translation: en },
            vi: { translation: vi },
            ja: { translation: ja }
        },
        interpolation:{
            escapeValue: false
        }
    });

createRoot(document.getElementById("root")).render(
    <I18nextProvider i18n={i18next}>
        <BrowserRouter>
            <ScrollTop />
            <App />
        </BrowserRouter>
    </I18nextProvider>
);